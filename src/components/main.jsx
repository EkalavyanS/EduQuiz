import { useState } from "react";
import Flashcard from "./Flashcard/Flashcard";
import Quiz from "./Quiz/Quiz";

export default function Main() {
  const [topic, setTopic] = useState("");
  const [className, setClassName] = useState("");

  const [colorScheme, setColorScheme] = useState({
    background: "whitesmoke",
    text: "#1f2937",
    accent: "gray",
  });
  const [flashShow, setFlashShow] = useState(false);
  const [quizShow, setQuizShow] = useState(false);

  const handleGenerateFlashcards = (e) => {
    e.preventDefault();
    setFlashShow(true);
    setQuizShow(false); // Ensure quiz is hidden when flashcards are shown
  };

  const handleGenerateQuiz = (e) => {
    e.preventDefault();
    setQuizShow(true);
    setFlashShow(false); // Ensure flashcards are hidden when quiz is shown
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 text-gray-800 font-[Inter,sans-serif]"
    >
      <main className="w-full max-w-4xl px-6 py-12 bg-white rounded-lg shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-blue-600">Card & Quiz Generator</h1>
          <p className="text-lg text-gray-600">Create and customize flashcards for your topics and classes.</p>
        </div>
        <div className="bg-gray-50 shadow-md rounded-lg p-8 mb-8">
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-md shadow-sm focus:border-[#6366f1] focus:ring-[#6366f1] text-lg p-3"
                placeholder="Topic"
                required
              />
            </div>
            <div>
              <input
                type="number"
                id="class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-md shadow-sm focus:border-[#6366f1] focus:ring-[#6366f1] text-lg p-3"
                placeholder="Class"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                onClick={handleGenerateFlashcards}
                className="bg-[#6366f1] text-white rounded-md py-3 px-4 hover:bg-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 text-lg"
              >
                Generate Flashcards
              </button>
              <button
                onClick={handleGenerateQuiz}
                className="bg-[#6366f1] text-white rounded-md py-3 px-4 hover:bg-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 text-lg"
              >
                Generate Quiz
              </button>
            </div>
          </form>
        </div>
      </main>
      {flashShow ? <Flashcard topic={topic} class={className} /> : null}
      {quizShow ? <Quiz topic={topic} class={className} /> : null}
    </div>
  );
}
