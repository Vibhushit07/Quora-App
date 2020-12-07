import React from "react";
import { useHistory } from "react-router-dom";

import { Edit, DeleteForever } from "@material-ui/icons";

import { DialogBox } from "../../Components/dialogBox";
import { setDialogBox } from "../../Data/dialogBox";
import { deleteQuestion, getUserQuestions } from "../../Services/question";
import { getUserQuestion, setUserQuestion } from "../../Data/questions";

export const UserQuestions = () => {
  const [open, setOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState(getUserQuestion());
  const history = useHistory();
  const [questionId, setQuestionId] = React.useState("");

  const handleClick = (id) => {
    console.log("delete");
    console.log(id);
    setDialogBox(
      "Delete Question",
      "Do you want to delete this question",
      "Yes",
      "No"
    );
    setQuestionId(id);
    setOpen(true);
  };

  const handleAccept = async () => {
    setOpen(false);
    setDialogBox();
    deleteQuestion(questionId);
    setUserQuestion(await getUserQuestions());
    setQuestions(getUserQuestion());
  };

  const handleReject = () => {
    setOpen(false);
    setDialogBox();
  };

  return (
    <div>
      {questions.map((question) => (
        <div>
          <span onClick={() => history.push("/question/edit/" + question.id)}>
            <Edit />
          </span>
          <span onClick={() => handleClick(question.id)}>
            <DeleteForever />
          </span>
          <h1>{question.title}</h1>
          <p>{question.content}</p>
        </div>
      ))}
      <DialogBox open={open} accept={handleAccept} reject={handleReject} />
    </div>
  );
};
