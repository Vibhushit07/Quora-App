import React, { useState } from "react";
import { useHistory } from "react-router";

import { Button } from "@material-ui/core";
import { Edit, DeleteForever } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { DialogBox } from "../../dialogBox";
import { setDialogBox } from "../../../Data/dialogBox";
import { getAnswers, getQuestionId } from "../../../Data/answers";
import { getQuestionById } from "../../../Data/questions";
import { getAnswersOfQuestion, deleteAnswer } from "../../../Services/answer";
import { getError, setError } from "../../../Data/error";
import { Error } from "../../error";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    padding: "2vw 0 0 3vw",
  },
  padding: {
    padding: "0 0 0 2vw",
  },
  button: {
    marginLeft: "80%",
  },
  margin: {
    marginLeft: "7px",
  },
  hr: {
    marginBottom: "5vh",
  },
  btn: {
    cursor: "pointer",
  },
  btns: {
    color: "#ffffff",
    backgroundColor: "#000000",
  },
}));

export const AnswersOfQuestion = () => {
  const question = getQuestionById();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [answerId, setAnswerId] = useState("");
  const [answers, setAnswers] = useState(getAnswers());

  const handleClick = (id) => {
    setDialogBox(
      "Delete Question",
      "Do you want to delete this question",
      "Yes",
      "No"
    );
    setAnswerId(id);
    setOpen(true);
  };

  const handleAccept = async () => {
    setOpen(false);
    setDialogBox();
    const resp = await deleteAnswer(answerId);
    if (resp.code !== undefined) {
      setError(resp);
    }
    setAnswers(await getAnswersOfQuestion());
  };

  const handleReject = () => {
    setOpen(false);
    setDialogBox();
  };

  return (
    <div className={classes.container}>
      <div className={classes.padding}>
        <h3>{question[0].title}</h3>
        <p>{question[0].content}</p>
      </div>
      <hr className={classes.hr} />
      {answers.length === 0 ? (
        <h2>No answers have been posted for this question.</h2>
      ) : (
        answers.map((answer, index) => (
          <div key={answer.id}>
            <div className={classes.button + " " + classes.padding}>
              <span
                className={classes.margin + " " + classes.btn}
                title="Edit"
                onClick={() => history.push("/answer/edit/" + answer.id)}
              >
                <Edit />
              </span>
              <span
                className={classes.margin + " " + classes.btn}
                onClick={() => handleClick(answer.id)}
              >
                <DeleteForever />
              </span>
              <Button
                title="Post Answer"
                variant="contained"
                className={
                  classes.margin + " " + classes.btn + " " + classes.btns
                }
                disableElevation
                onClick={() => history.push("/answer/post")}
              >
                Post Answer
              </Button>
            </div>
            <p className={classes.padding}>
              {index + 1}. {answer.answerContent}
            </p>
            <hr className={classes.hr} />
          </div>
        ))
      )}
      {getError().code !== "" ? <Error /> : <div />}
      <DialogBox open={open} accept={handleAccept} reject={handleReject} />
    </div>
  );
};
