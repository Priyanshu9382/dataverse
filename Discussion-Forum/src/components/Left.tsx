import { Link,useNavigate } from "react-router-dom";
import { Home, Layers, Flame } from "lucide-react";
import React, { useState } from "react";
import { Question } from "../assets/questionCard/QuestionData";
import { useRecoilState } from "recoil";
import { isMenuClicked, mainQuestionState } from "../states/state";

const Left = () => {
  const [question, setQuestion] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>('');
  const [questionsList, setQuestionsList] = useRecoilState(mainQuestionState);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isClicked, ] = useRecoilState(isMenuClicked);
  const navigate = useNavigate();
  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !description.trim() || !category.trim()) {
      setIsEmpty(true);
      navigate('/')
      return;
    }; // Prevent empty submissions

    // Create a new question object
    const newQuestion: Question = {
      id: questionsList.length + 1, // Generate a unique ID
      title: question,
      description: description, // You can enhance this
      user: 'GuestUser', // Default user
      category: category.split(',').map(cat => cat.trim()), // Split and trim categories
      isPopular: false,
      timestamp: new Date(),
      answers: [],
    };
    setQuestionsList([newQuestion, ...questionsList]);
    setQuestion(""); // Clear form fields
    setDescription("");
    setCategory("");
  };
  return (
    <div className={`h-full w-4/5 sm:w-1/5 ${isClicked? '':'-translate-x-96 '} absolute sm:static sm:translate-x-0 bg-[#1a1a1a] rounded-2xl ml-1 p-4 flex flex-col gap-1 `}>
      <Link to={"/"}>
        <div className="h-10 hover:bg-[#121212] flex items-center gap-2 pl-2 rounded-xl cursor-pointer">
          <Home size={20} color="white" />
          <span className="text-white cursor-pointer font-thin">Home</span>
        </div>
      </Link>
      <Link to={"/categories"}>
        <div className="h-10 hover:bg-[#121212] flex items-center gap-2 pl-2 rounded-xl cursor-pointer font-thin">
          <Layers size={20} color="white" />
          <span className="text-white cursor-pointer">Categories</span>
        </div>
      </Link>
      <Link to={"/popular"}>
        <div className="h-10 hover:bg-[#121212] flex items-center gap-2 pl-2 rounded-xl cursor-pointer">
          <Flame size={20} color="white" />
          <span className="text-white cursor-pointer font-thin">Popular</span>
        </div>
      </Link>
      <form
        onSubmit={handleQuestionSubmit}
        className="flex flex-col gap-2 mt-4"
      >
        <h1 className="text-xl text-red-600">Add Your Question</h1>
        <p className={`${isEmpty? '':'hidden'} text-red-700`}>*All fields are mandatory</p>
        <label htmlFor="question" className="text-white pl-2">
          Question Title
        </label>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask the Question..."
          className="bg-[#121212] text-white p-4 w-11/12 rounded-xl  resize-none"
        ></input>
        <label htmlFor="question" className="text-white pl-2">
          Question Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the question..."
          className="bg-[#121212] text-white p-4 w-11/12 rounded-xl h-48 resize-none"
        ></textarea>
        <label htmlFor="question" className="text-white pl-2">
          Question Label <br /> <span className="text-[12px]">Separate the labels using comma(,)</span>
        </label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Put the category here..."
          className="bg-[#121212] text-white p-4 w-11/12 rounded-xl  resize-none"
        ></input>
        <button
          type="submit"
          className="bg-red-600 w-11/12 text-white p-2 rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Left;
