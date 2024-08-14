import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { genAI } from "../../gemini-config";
import Confetti from 'react-confetti';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Quiz(props) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleBackQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(`Create 5 multiple-choice questions about ${props.topic} for a ${props.class} grader. Each question should have 4 options and one correct answer. Return the questions in JSON format with fields 'question', 'options', and 'correctAnswer'.`);
        const response = await result.response;
        const text = await response.text();
        console.log("Raw response from Gemini:", text);

        // Clean and parse the response into JSON
        const cleanedText = text
          .replace(/```json/gi, '')  // Remove markdown code block indicators
          .replace(/```/g, '')       // Remove closing markdown code block indicator
          .replace(/(\r\n|\n|\r)/gm, '') // Remove any line breaks
          .replace(/\\"/g, '')       // Remove double quotes inside strings
          .trim();                   // Trim any extra whitespace

        let jsonData;
        try {
          jsonData = JSON.parse(cleanedText);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          console.error("Cleaned JSON string:", cleanedText);
          setLoading(false);
          return;
        }
        
        console.log("Parsed JSON:", jsonData);

        // Set the fetched questions
        setQuestions(jsonData || []);  // Ensure we set questions array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from Gemini:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [props.topic, props.class]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const current = questions[currentQuestion];
    const correctIndex = Number(current.correctAnswer); // Ensure correctAnswer is a number
    const correctOption = current.options[correctIndex];
    const trimmedSelectedOption = selectedOption?.trim();
    console.log(current.correctAnswer)
    if (trimmedSelectedOption === current.correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  if (loading) {
    return <div><Skeleton height={40} width={150} style={{ backgroundColor: '#cce0ff', borderRadius: '5px' }} /></div>
  }

  if (!questions.length) {
    return <div>No questions available. Please try again later.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-20">
      {quizComplete ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-2xl">Your Score: {score}/{questions.length}</p>
          {score === questions.length && <Confetti className='w-full' />}
        </div>
      ) : (
        <Card className="w-full max-w-3xl mb-20 bg-white shadow-md rounded-lg p-6">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">{questions[currentQuestion]?.question}</h2>
            <ul>
              {questions[currentQuestion]?.options.map((option, index) => (
                <li
                  key={index}
                  className={`p-2 rounded-md cursor-pointer ${selectedOption === option ? 'bg-blue-200' : 'bg-gray-100'}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBackQuestion}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-all"
                disabled={currentQuestion === 0}
              >
                Back
              </button>
              <button
                onClick={handleNextQuestion}
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-all"
                disabled={!selectedOption}
              >
                Next
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Quiz;
