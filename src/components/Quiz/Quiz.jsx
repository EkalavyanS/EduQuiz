import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { genAI } from "../../gemini-config";
import Confetti from 'react-confetti';

function Quiz(props) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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
    if (selectedOption === questions[currentQuestion].options[questions[currentQuestion].correctAnswer]) {
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
    return <div>Loading quiz...</div>;
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
          {score === questions.length && <Confetti />}
        </div>
      ) : (
        <Card className="w-full max-w-3xl mb-20 bg-white shadow-md rounded-lg p-6">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">{questions[currentQuestion]?.question}</h2>
            <ul>
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index} className={`p-2 rounded-md cursor-pointer ${selectedOption === option ? 'bg-blue-200' : 'bg-gray-100'}`} onClick={() => handleOptionClick(option)}>
                  {option}
                </li>
              ))}
            </ul>
            <button
              onClick={handleNextQuestion}
              className="mt-6 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-all">
              Next
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Quiz;
