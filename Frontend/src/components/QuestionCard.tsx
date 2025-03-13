import { Question } from "../assets/questionCard/QuestionData";
import image from '../assets/avatar.jpg'
interface QuesitonCardProps {
    data: Question;
}
const QuestionCard:React.FC<QuesitonCardProps> = ({data}) => {
  const{
    title,
    description,
    user
  } = data;
  return (
    <div className="bg-[#292727] p-4 rounded-xl m-4"> 
      <div>
        <div className="flex items-center gap-2">
          <img src={image} alt="user" className="w-15 h-15 bg-cover rounded-full" />
          <span className="text-white font-bold">{user}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-red-600 text-xl font-bold ">
            {title}
          </span>
          <p className="text-white">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
