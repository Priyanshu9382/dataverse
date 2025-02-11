import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { mainQuestionState } from "../states/state";
import CategoryCard from "../components/CategoryCard";
import Left from "../components/Left";
import { useRecoilState } from "recoil";

const Categories: React.FC = () => {
  const [questions] = useRecoilState(mainQuestionState);
  const uniqueCategories = Array.from(
    new Set(questions.map((question) => question.category))
  );
  const count: number = uniqueCategories.length;

  return (
    <div>
      <Navigation />
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <Left />

        {/* Right Content */}
        <div className="min-h-screen w-4/5 bg-[#1a1a1a] rounded-2xl ml-1 mr-1 p-4 overflow-y-auto scrollbar-thin scrollbar-track-black">
          <div className="flex flex-col gap-8 pl-10 pt-5">
            <h1 className="text-3xl font-bold text-white">
              All Categories ({count} categories found)
            </h1>
            <div className="flex flex-wrap gap-3">
              {uniqueCategories.map((category, index) => (
                <Link
                  to={`/categories/${category}`}
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4"
                >
                  <CategoryCard category={category} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
