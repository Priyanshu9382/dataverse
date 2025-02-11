import { useRecoilValue, useSetRecoilState } from "recoil";
import { questionState, inputState, searchTermState } from "../states/state";
import QuestionCard from "../components/QuestionCard";
import Navigation from '../components/Navigation';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Question } from "../assets/questionCard/QuestionData";
import Left from "../components/Left";
const Browse: React.FC = () => {
  const questions: Question[] = useRecoilValue(questionState);
  const input: string = useRecoilValue(inputState);
  const searchTerm: string = useRecoilValue(searchTermState);
  const navigate = useNavigate();
  // To clear the search bar input when needed
  const setInput = useSetRecoilState(inputState);
  const count: number = questions.length;

  // Redirect to the home page and clear the search bar if searchTerm is empty
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setInput("");
      navigate("/");
    }
  }, [searchTerm, navigate, setInput]);

  return (
    <Link to={`/browse/${input}`}>
      <div className="flex flex-col h-screen">
        <Navigation />
        <div className="flex ">
            {/* The left side of the landing page */}
        <Left/>
        {/* The right side of the landing page */}
        <div className="min-h-screen w-4/5 bg-[#1a1a1a] p-5 rounded-2xl ml-1 mr-1 overflow-y-auto scrollbar-thin scroll scrollbar-track-black ">
        <div className="mt-3">
          <div>
            <h2 className="font-bold text-gray-500 pl-5 text-xl">
              {count} {count === 1 ? "discussion" : "discussions"} found
            </h2>
          </div>
          <div className="flex w-full pb-3 ">
            {questions.map((question) => (
              <Link to={`/question/${question.id}`}>
              <QuestionCard key={question.id} data={question} />
            </Link>
            ))}
          </div>
        </div>
        </div>
        </div>
      </div>
    </Link>
  );
};

export default Browse;
