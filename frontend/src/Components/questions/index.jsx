import React from "react";
import { useHistory } from "react-router";

import { Button } from "@material-ui/core";

import { setAnswers, setQuestionId } from "../../Data/answers";
import { getQuestions } from "../../Data/questions";
import { getAnswersOfQuestion } from "../../Services/answer";

export const Questions = () => {
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
          <h1 onClick={() => handleClick(question.id)}>
            {index + 1}. {question.title}
          </h1>
          <p>{question.content}</p>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => submit(question.id)}
          >
            Post Answer
          </Button>
        </div>
      ))}
    </div>
  );
};
