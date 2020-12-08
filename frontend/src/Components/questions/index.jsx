import React from "react";
import { useHistory } from "react-router";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { setAnswers, setQuestionId } from "../../Data/answers";
import { getQuestions } from "../../Data/questions";
import { getAnswersOfQuestion } from "../../Services/answer";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "4vw",
    padding: "2vw",
    width: "60vw",
  },
  hr: {
    width: "95%",
  },
  button: {
    textAlign: "center",
  },
  title: {
    cursor: "pointer",
  },
}));

export const Questions = () => {
  const classes = useStyles();
  const questions = getQuestions();
  const history = useHistory();

  const handleClick = async (questionId) => {
    setQuestionId(questionId);
    await setAnswers(await getAnswersOfQuestion());
    history.push("/answer/get");
  };

  const submit = (questionId) => {
    setQuestionId(questionId);
    history.push("/answer/post");
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={question.id}>
          <div className={classes.container}>
            <h1
              className={classes.title}
              onClick={() => handleClick(question.id)}
            >
              {index + 1}. {question.title}
            </h1>
            <p>{question.content}</p>
            <div className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => submit(question.id)}
              >
                Post Answer
              </Button>
            </div>
          </div>
          <hr className={classes.hr} />
        </div>
      ))}
    </div>
  );
};
