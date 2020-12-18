import React from "react";
import { useHistory } from "react-router-dom";

import { Edit, DeleteForever } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { DialogBox } from "../../Components/dialogBox";
import { setDialogBox } from "../../Data/dialogBox";
import { deleteQuestion, getUserQuestions } from "../../Services/question";
import { getUserQuestion, setUserQuestion } from "../../Data/questions";
import { setAnswers, setQuestionId } from "../../Data/answers";
import { getAnswersOfQuestion } from "../../Services/answer";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "4vw",
    padding: "2vw",
    width: "90%",
  },
  hr: {
    width: "95%",
  },
  title: {
    cursor: "pointer",
  },
}));

export const UserQuestions = () => {
  const [open, setOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState(getUserQuestion());
  const history = useHistory();
  const classes = useStyles();
  const [questionId, setQuestionId] = React.useState("");

  const displayAnswers = async (questionId) => {
    setQuestionId(questionId);
    await setAnswers(await getAnswersOfQuestion());
    history.push("/answer/get");
  };

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
    <div className={classes.container}>
      {questions.length === 0 ? (
        <h2>You have not posted any questions</h2>
      ) : (
        questions.map((question, index) => (
          <div>
            <span onClick={() => history.push("/question/edit/" + question.id)}>
              <Edit />
            </span>
            <span onClick={() => handleClick(question.id)}>
              <DeleteForever />
            </span>
            <h1
              className={classes.title}
              onClick={() => displayAnswers(question.id)}
              title="View Answers"
            >
              {index + 1}. {question.title}
            </h1>
            <p>{question.content}</p>
            <hr className={classes.hr} />
          </div>
        ))
      )}
      <DialogBox open={open} accept={handleAccept} reject={handleReject} />
    </div>
  );
};
