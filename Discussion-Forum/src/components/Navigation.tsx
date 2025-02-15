import { Link } from "react-router-dom";
import React,{  useEffect } from "react";
import { useRecoilState } from "recoil";
import { inputState, searchTermState, questionState, isMenuClicked } from "../states/state";
import useSearch from "./useSearch";
import { useNavigate } from "react-router-dom";
import { Menu,X } from "lucide-react";
const Navigation = () => {
  const [input, setInput] = useRecoilState(inputState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [, setFilteredEvents] = useRecoilState(questionState);
  const [isClicked, setIsClicked] = useRecoilState(isMenuClicked);
  const navigate = useNavigate();

  // Get search results
  const results = useSearch(searchTerm);

  // Update input value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // It set the searchTerm when the user presses Enter and then only the user is redirected to the browse page
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setSearchTerm(input);
      navigate(`/browse/${input}`);
    }
    if (e.key === "Enter" && input.trim() === "") {
      navigate("/");
    }
  };
  const handleClick = () => {
    setIsClicked(!isClicked);
  }
  console.log(isClicked);
  // Update Recoil state when results change
  useEffect(() => {
    setFilteredEvents(results);
  }, [results, setFilteredEvents]);

  return (
    <div className="flex justify-between gap-4 items-center p-4 bg-transparent  text-white">
      {/* The logo of the website */}
      <div className="text-left">
        <span className="text-left hidden sm:inline sm:text-2xl text-red-600 cursor-pointer">
          <Link to={"/"} className="font-bold">
            DataVerse
          </Link>
        </span>
        <span className={`sm:hidden ${!isClicked?'':'hidden'} text-2xl text-red-600 cursor-pointer`}>
            <Menu onClick={handleClick} size={30} color="white" />
        </span>
        <span className={`sm:hidden ${isClicked?'':'hidden'} text-2xl text-red-600 cursor-pointer`}>
            <X onClick={handleClick} size={30} color="white" />
        </span>
      </div>

      {/* The search bar */}
      <input
        type="text"
        placeholder="Search any topic"
        value={input}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className=" w-1/2 h-10 border-red-600 p-4 bg-[#4e4a4a] border-0 hover:border-2 rounded-4xl "
      />

      {/* The login and signup buttons */}
      <div className="btns flex gap-2 justify-end sm:w-2xs ">
        <Link to={"/login"}>
          <button className="bg-red-600 w-12 sm:w-24 h-8 sm:h-10 rounded-full text-xs sm:text-base text-white font-bold cursor-pointer">
            Login
          </button>
        </Link>
        <Link to={"/signup"}>
          <button className="bg-[#292727] text-white w-12 sm:w-24 h-8 sm:h-10 text-xs sm:text-base rounded-full font-bold cursor-pointer">
            SignUp
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
