import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { mainQuestionState } from "../states/state";
import CategoryCard from "../components/CategoryCard";
import Left from "../components/Left";
import { useRecoilState } from "recoil";

const Categories: React.FC = () => {
  const [questions] = useRecoilState(mainQuestionState);
  
  // Extract all categories and flatten them into a single array
  const allCategories = questions.flatMap((question) => question.category);
  
  // Get unique categories
  const uniqueCategories = Array.from(new Set(allCategories));

  return (
    <div>
      <Navigation />
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <Left />

        {/* Right Content */}
        <div className="min-h-screen w-full sm:w-4/5 bg-[#1a1a1a] rounded-2xl ml-1 mr-1 p-4 overflow-y-auto scrollbar-thin scrollbar-track-black">
          <div className="flex flex-col gap-8 pl-10 pt-5">
            <h1 className="text-3xl font-bold text-white">
              All Categories ({uniqueCategories.length} categories found)
            </h1>
            <div className="flex flex-wrap gap-3">
              {uniqueCategories.map((category, index) => (
                <Link to={`/categories/${category}`} key={index}>
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
