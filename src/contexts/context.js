import { createContext } from "react";
let data = {
    database:{},
}
const QuizAppContext = createContext(data);

export default QuizAppContext;