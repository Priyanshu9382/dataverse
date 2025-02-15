import Navigation from "../components/Navigation";
import Left from "../components/Left";
import QuestionCard from "../components/QuestionCard";
import { mainQuestionState } from "../states/state";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
const Landing = () => {

  const [questionsList,] = useRecoilState(mainQuestionState);
      
  
  return (
    <div>
      <Navigation />
      {/* The main content of the landing page */}
      <div className="flex h-screen">
        {/* The left side of the landing page */}
        <Left/>
        
        {/* The right side of the landing page */}
        <div className="min-h-screen w-full sm:w-4/5 bg-[#1a1a1a] rounded-2xl ml-1 mr-1 overflow-y-auto scrollbar-thin scroll scrollbar-track-black ">
          {questionsList.map((question) => (
            <Link to={`/question/${question.id}`} key={question.id}>
              <QuestionCard data={question} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
