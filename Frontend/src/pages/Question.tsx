import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
import { mainQuestionState } from "../states/state";
import Navigation from "../components/Navigation";
import { Circle, Trash } from "lucide-react";
import image from "../assets/avatar.jpg";
import Left from "../components/Left";
import { useRecoilState } from "recoil";
export default function QuestionPage() {
  const [questions, setQuestion] = useRecoilState(mainQuestionState);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [, setAnotherAnswer] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const question = questions.find((q) => q.id === Number(id));
  const navigate = useNavigate();

  if (!question) {
    return <div className="text-center text-red-500">Question not found</div>;
  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setAnotherAnswer(false);
    setInput("");
  };
  const handleClick = () => {
    setHasSubmitted(false);
    setAnotherAnswer(true);
  };
  const handleDelete = () => {
    const filteredQuestions = questions.filter((q) => q.id !== Number(id));
    setHasSubmitted(false);
    setAnotherAnswer(false);
    setQuestion(filteredQuestions);
    navigate("/");
  };
  return (
    <div>
      <Navigation />
      <div className="flex h-screen">
        {/* The left side of the landing page */}
        <Left />
        {/* The right side of the landing page */}
        <div className="min-h-screen w-full sm:w-4/5 bg-[#1a1a1a] rounded-2xl ml-1 mr-1 p-4 flex flex-col gap-2 overflow-y-auto scrollbar-thin scroll scrollbar-track-black ">
          <div className="flex gap-3 items-center">
            <img src={image} alt="user" className="w-15 h-15 rounded-full" />
            <span className="text-white text-lg font-bold">
              {question.user}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-red-500">{question.title}</h1>
          <p className="text-gray-300 mt-2">{question.description}</p>
          <span className="text-white inline">{(question.category.length > 1)? 'Categories:':'Category:'}</span>
          <div className="flex gap-3">
          {question.category.map((cat, index) => (
            <p key={index} className="text-gray-300 rounded-3xl bg-[#2b2a2a] w-max p-2 mt-1">
              {cat}
            </p>
          ))}
          </div>
          <div className="ml-3 bg-[#2b2a2a] p-3 rounded-xl mt-3 overflow-y-scroll  pl-4  ">
            <h2 className="text-xl font-semibold mt-4 text-red-500">
              Answers:
            </h2>
            {question.answers.length > 0 ? (
              question.answers.map((answer) => (
                <div key={answer.id} className=" p-3 rounded mt-3">
                  <p className="font-semibold text-white flex items-center gap-2 ">
                    <Circle size={10} fill="white" className="inline" />
                    {answer.user}:
                  </p>
                  <p className="text-gray-200">{answer.text}</p>
                  <h3 className="text-md font-semibold mt-2 text-red-300">
                    Comments:
                  </h3>
                  {answer.comments.length > 0 ? (
                    answer.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="ml-4 mt-2 text-sm p-2 rounded"
                      >
                        <p className="font-semibold text-white flex items-center gap-2">
                          <Circle size={6} className="inline" /> {comment.user}:
                        </p>
                        <p className="text-gray-300">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No comments yet</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400">No answers yet</p>
            )}
          </div>
          <form action="" className={`pr-3 ${hasSubmitted ? "hidden" : ""}`}>
            <textarea
              className={`w-full h-32 bg-[#2b2a2a] text-white p-2 rounded-xl mt-3 ml-3 pl-2 `}
              placeholder="Add your answer here"
              value={input}
              onChange={handleChange}
            ></textarea>
            <div className="flex justify-between items-center ml-3">
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-red-600 w-24 h-10 rounded-full text-white font-bold cursor-pointer hover:bg-red-700"
              >
                Answer
              </button>
              <button 
                onClick={handleDelete}
                className="bg-red-600 w-24 h-10 rounded-full text-white font-bold cursor-pointer hover:bg-red-700 flex justify-center items-center"
              >
                <Trash size={20} color="white" />
              </button>
            </div>
          </form>
          <div>
            {hasSubmitted && (
              <div className="text-red-600 text-lg mt-3">
                <p>Your answer has been submitted!!</p>
                <button
                  onClick={handleClick}
                  className="bg-red-600 w-44 h-12 rounded-full text-white font-bold cursor-pointer hover:bg-red-700"
                >
                  Answer Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
