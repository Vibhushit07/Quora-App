import React, { useState } from "react";
import { useHistory } from "react-router";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Title } from "../../Components/title";
import { Content } from "../../Components/content";
import {
  editQuestion,
  getAllQuestions,
  postQuestion,
  getUserQuestions,
} from "../../Services/question";
import { setUserQuestion, setQuestions } from "../../Data/questions";
import { getError, setError } from "../../Data/error";
import { Error } from "../../Components/error";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  button: {
    color: "#ffffff",
    backgroundColor: "#000000",
  },
}));

export const PostQuestion = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [question, setQuestion] = useState({
    title: "",
    content: "",
  });

  const setData = (prop, value) => {
    setQuestion({ ...question, [prop]: value });
  };

  const submit = async () => {
    if (props.match.params.operation === "post") {
      const response = await postQuestion(question);
      if (response.code !== undefined) {
        setError(response);
      } else {
        await setQuestions(await getAllQuestions());
        await setUserQuestion(await getUserQuestions());
        history.push("/");
      }
    } else {
      const response = await editQuestion(props.match.params.id, question);
      if (response.code !== undefined) {
        setError(response);
      } else {
        setUserQuestion(await getUserQuestions());
        history.push("/user/question");
      }
    }
  };

  return (
    <div className={classes.container}>
      <Title setData={setData} />
      <br /> <br />
      <Content
        setData={setData}
        label={{ initial: "Description of Title", final: "Question" }}
      />
      <br /> <br />
      <Button
        variant="contained"
        className={classes.button}
        disableElevation
        onClick={submit}
      >
        Post Question
      </Button>
      {getError().code !== "" ? <Error /> : <div></div>}
    </div>
  );
};
