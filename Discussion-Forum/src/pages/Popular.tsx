import Navigation from "../components/Navigation"
import { Link } from "react-router-dom"
import { questions,Question } from "../assets/questionCard/QuestionData"
import QuestionCard from "../components/QuestionCard"
import Left from "../components/Left"


const Popular = () => {
    const popularQuestions = questions.filter((question:Question) => question.isPopular === true);
    const count:number = popularQuestions.length;
  return (
    <div>
      <Navigation />
      <div className="flex h-screen">
        {/* The left side of the landing page */}
        <Left/>
        {/* The right side of the landing page */}
        <div className="min-h-screen w-full sm:w-4/5 bg-[#1a1a1a] rounded-2xl ml-1 mr-1 p-4 overflow-y-auto scrollbar-thin scroll scrollbar-track-black ">
        <h1 className="text-3xl font-bold text-red-600 pl-4">Popular Posts ({count} results found)</h1>
          {popularQuestions.map((question) => (
            <Link to={`/question/${question.id}`} key={question.id}>
              <QuestionCard data={question} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Popular
