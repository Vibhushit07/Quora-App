import React from "react";

import { AnswersOfQuestion } from "../../Components/answers/answersOfQuestion";
import { PostAnswer } from "../../Components/answers/postAnswer";

export const Answer = (props) => {
  if (props.match.params.operation === "post") {
    return <PostAnswer operation={"post"} />;
  } else if (props.match.params.operation === "edit") {
    return <PostAnswer operation={"edit"} answerId={props.match.params.id} />;
  } else {
    return <AnswersOfQuestion />;
  }
};
