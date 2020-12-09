import React, { useState } from "react";
import { useHistory } from "react-router";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { getQuestionById } from "../../../Data/questions";
import { editAnswer, postAnswer } from "../../../Services/answer";
import { Content } from "../../content";
import { getError, setError } from "../../../Data/error";
import { Error } from "../../error";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  questions: {
    width: "90%",
    padding: "2vw 0 0 3vw",
  },
  button: {
    color: "#ffffff",
    backgroundColor: "#000000",
  },
}));

export const PostAnswer = (props) => {
  const classes = useStyles();
  const [answer, setAnswer] = useState({
    content: "",
  });

  const history = useHistory();

  const question = getQuestionById();

  const setAns = (prop, value) => {
    setAnswer({ ...answer, [prop]: value });
  };

  const submit = async () => {
    if (props.operation === "post") {
      const resp = await postAnswer(answer);
      if (resp.code !== undefined) {
        setError(resp);
      } else {
        history.push("/");
      }
    } else {
      const resp = await editAnswer(props.answerId, answer);
      if (resp.code !== undefined) {
        setError(resp);
        history.push("/answer/edit/" + props.answerId);
      } else {
        history.push("/answers/get");
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.questions}>
        <h1>{question[0].title}</h1>
        <p>{question[0].content}</p>
      </div>
      <Content setData={setAns} label={{ initial: "Answer" }} />
      <br /> <br />
      <Button
        variant="contained"
        className={classes.button}
        disableElevation
        onClick={submit}
      >
        Post Answer
      </Button>
      {getError().code !== "" ? <Error /> : <div></div>}
    </div>
  );
};
