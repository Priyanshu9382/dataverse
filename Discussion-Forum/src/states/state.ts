import { atom } from "recoil";
import {Question,questions} from "../assets/questionCard/QuestionData";

export const inputState = atom<string>({
    key: "inputState",
    default: "",
});
export const searchTermState = atom<string>({
    key: "searchTermState",
    default: "",
});
export const questionState = atom<Question[]>({
    key: "questionState",
    default: [],
})

export const mainQuestionState = atom<Question[]>({
    key: "mainQuestionState",
    default: questions,
})
