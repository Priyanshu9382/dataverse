import { atom } from "recoil";
import { Question, questions, user } from "../assets/questionCard/QuestionData";

// ✅ Search input state
export const inputState = atom<string>({
  key: "inputState",
  default: "",
});

// ✅ Search term state
export const searchTermState = atom<string>({
  key: "searchTermState",
  default: "",
});

// ✅ Stores all questions
export const questionState = atom<Question[]>({
  key: "questionState",
  default: [],
});

// ✅ Stores main question set (initially loaded questions)
export const mainQuestionState = atom<Question[]>({
  key: "mainQuestionState",
  default: questions,
});

// ✅ Menu state (used for showing/hiding mobile menu)
export const isMenuClicked = atom<boolean>({
  key: "isMenuClicked",
  default: false, // Initially, menu is closed
});


export const userState = atom<user>({
  key: "userState",
  default: {
    id: "",
    about: "",
    createdAt: new Date(),
    email: '',
    fullname: '',
    profileImg: "http://res.cloudinary.com/ds3dwvbbq/image/upload/v1743239679/kccekdnrtzgnqv0i8qrf.jpg",
    questions: [],
    refreshToken: "",
    updatedAt: new Date()
  },
})
