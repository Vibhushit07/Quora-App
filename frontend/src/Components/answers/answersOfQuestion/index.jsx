import React, { useState } from "react";
import { useHistory } from "react-router";

import { Edit, DeleteForever } from "@material-ui/icons";

import { DialogBox } from "../../dialogBox";
import { setDialogBox } from "../../../Data/dialogBox";
import { getAnswers } from "../../../Data/answers";
import { getQuestionById } from "../../../Data/questions";
import { getAnswersOfQuestion, deleteAnswer } from "../../../Services/answer";
import { getError, setError } from "../../../Data/error";
import { Error } from "../../error";

export const AnswersOfQuestion = () => {
  const question = getQuestionById();
  const history = useHistory();

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
    <div>
      <div>
        <h3>{question[0].title}</h3>
        <p>{question[0].content}</p>
      </div>
      {answers.map((answer) => (
        <div key={answer.id}>
          <span onClick={() => history.push("/answer/edit/" + answer.id)}>
            <Edit />
          </span>
          <span onClick={() => handleClick(answer.id)}>
            <DeleteForever />
          </span>
          <p>{answer.answerContent}</p>
        </div>
      ))}
      {getError().code !== "" ? <Error /> : <div />}
      <DialogBox open={open} accept={handleAccept} reject={handleReject} />
    </div>
  );
};
