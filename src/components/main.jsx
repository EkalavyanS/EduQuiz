import { useState } from "react"
import Flashcard from "./Flashcard/Flashcard"

export default function main() {
  const [topic, setTopic] = useState("")
  const [className, setClassName] = useState("")
  const [flashcards, setFlashcards] = useState([])
  const [fontFamily, setFontFamily] = useState("Inter, sans-serif")
  const [colorScheme, setColorScheme] = useState({
    background: "whitesmoke",
    text: "#1f2937",
    accent: "gray",
  })
  return (
    (<div
      className=" flex flex-col items-center justify-center min-h-screen bg-[#f9fafb] text-[#1f2937] font-[Inter,sans-serif]"
      style={{ backgroundColor: colorScheme.background, color: colorScheme.text }}>
      <main className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Card and Quiz Generator</h1>
          <p className="text-gray-500">Create and customize flashcards for your topics and classes.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="topic" className="block mb-2 font-black text-lg">
                Topic:-
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-md shadow-sm focus:border-[#6366f1] focus:ring-[#6366f1] text-lg p-3"
                placeholder="Enter the topic"
                required />
            </div>
            <div>
              <label htmlFor="class" className="block mb-2 font-black text-lg">
                Class:-
              </label>
              <input
                type="number"
                id="class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-md shadow-sm focus:border-[#6366f1] focus:ring-[#6366f1] text-lg p-3"
                placeholder="Enter your class"
                required />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-[#6366f1] text-white rounded-md py-3 px-4 hover:bg-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 text-lg">
                Generate Flashcards
              </button>
              <button
                className="bg-[#6366f1] text-white rounded-md py-3 px-4 hover:bg-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 text-lg">
                Generate Quiz
              </button>
            </div>
          </form>
        </div>
      </main>
      <Flashcard />
    </div>)
  );
}
