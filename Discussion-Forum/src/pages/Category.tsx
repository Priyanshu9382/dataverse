import Navigation from "../components/Navigation";
import React from "react";
import { Link } from "react-router-dom";
import {  Question } from "../assets/questionCard/QuestionData";
import { mainQuestionState } from "../states/state";
import { useRecoilState } from "recoil";
import QuestionCard from "../components/QuestionCard";
import { useParams } from "react-router-dom";
import Left from "../components/Left";
const Categories: React.FC = () => {
  const [questions] = useRecoilState(mainQuestionState);
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const filteredQuestions: Question[] = questions.filter(
    (question: Question) =>
      question.category.trim().toLowerCase() === id?.trim().toLowerCase()
  );
  console.log(filteredQuestions);

  const count: number = filteredQuestions.length;

  return (
    <div>
      <Navigation />
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <Left/>

        {/* Right Content */}
        <div className="min-h-screen w-4/5 bg-[#1a1a1a] rounded-2xl ml-1 mr-1 p-5 overflow-y-auto scrollbar-thin scrollbar-track-black">
          <h1 className="text-3xl font-bold pl-5 text-gray-200">
            {" "}
            ({count} results found)
          </h1>
          {filteredQuestions.map((question: Question) => (
            <Link to={`/question/${question.id}`}>
              <QuestionCard key={question.id} data={question} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
