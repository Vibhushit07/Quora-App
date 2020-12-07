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
      const response = postQuestion(question);
      if (response.code !== undefined) {
        setError(response);
      } else {
        setQuestions(await getAllQuestions());
        setUserQuestion(await getUserQuestions());
        history.push("/");
      }
    } else {
      const response = editQuestion(props.match.params.id, question);
      if (response.code !== undefined) {
        setError(response);
      } else {
        setUserQuestion(await getUserQuestions());
        history.push("/user/questions");
      }
    }
  };

  return (
    <div className={classes.container}>
      <Title setData={setData} />
      <br /> <br />
      <Content setData={setData} />
      <br /> <br />
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={submit}
      >
        Post Question
      </Button>
      {getError().code !== "" ? <Error /> : <div></div>}
    </div>
  );
};
