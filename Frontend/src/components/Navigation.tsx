import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  inputState,
  searchTermState,
  questionState,
  isMenuClicked,
  userState,
} from "../states/state";
import useSearch from "./useSearch";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Question, user } from "../assets/questionCard/QuestionData";

const Navigation = () => {
  const [input, setInput] = useRecoilState<string>(inputState);
  const [searchTerm, setSearchTerm] = useRecoilState<string>(searchTermState);
  const [, setFilteredEvents] = useRecoilState<Question[]>(questionState);
  const [isClicked, setIsClicked] = useRecoilState<boolean>(isMenuClicked);
  const [isLogoClicked, setIsLogoClicked] = useState<boolean>(false);
  const user = useRecoilValue<user>(userState);
  console.log(user);

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
  };
  const handleLogoClick =() =>{
    setIsLogoClicked(!isLogoClicked)
  }
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
        <span
          className={`sm:hidden ${
            !isClicked ? "" : "hidden"
          } text-2xl text-red-600 cursor-pointer`}
        >
          <Menu onClick={handleClick} size={30} color="white" />
        </span>
        <span
          className={`sm:hidden ${
            isClicked ? "" : "hidden"
          } text-2xl text-red-600 cursor-pointer`}
        >
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
      {user ? (
        <div className="flex gap-2 justify-end sm:w-2xs">
          <img
            src={user.profileImg}
            onClick={handleLogoClick}
            alt="LogoImg"
            className="h-12 w-12 rounded-full mr-5"
          />
          <div className={`bg-black   absolute top-16 rounded-xl opacity-75 p-5 ${isLogoClicked? "": "hidden"} `}>
            <ul className={`flex flex-col gap-2`}>
              <Link to={'/user/profile'}>
              <li>Your Profile</li>
              </Link>
              <Link to={'/settings'}>
              <li>Settings</li>
              </Link>
              <Link to={'/user/logout'}>
              <li>Logout</li>
              </Link>
            </ul>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Navigation;
