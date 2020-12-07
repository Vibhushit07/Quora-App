import React from "react";
import { getError } from "../../Data/error";

export const Error = () => {
  console.log(getError());
  return (
    <div>
      <h2>{getError().code}</h2>
      <h2>{getError().message}</h2>
    </div>
  );
};