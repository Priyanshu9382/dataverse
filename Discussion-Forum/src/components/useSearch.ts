import { useState, useEffect } from "react";
import { Question } from "../assets/questionCard/QuestionData";
import { mainQuestionState } from "../states/state";
import { useRecoilValue } from "recoil";
const useSearch = (searchTerm: string) => {
    const questions: Question[] = useRecoilValue(mainQuestionState);
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
    useEffect(() => {
        if (!searchTerm)
            setFilteredQuestions([]);
    }, [searchTerm]);

    useEffect(() => {
        if (searchTerm.trim() === " ") {
            setFilteredQuestions(questions);
        } else {
            // Filter events based on searchTerm
            setFilteredQuestions(
                questions.filter((question:Question) =>
                    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    question.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    question.category.map((cat) => cat.toLowerCase()).includes(searchTerm.toLowerCase())
                )
            );
            // and set filteredEvents
        }
    }, [questions, searchTerm]);
    return filteredQuestions;


}

export default useSearch;