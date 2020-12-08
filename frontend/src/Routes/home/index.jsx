import React from "react";
import { Redirect } from "react-router";

import { getHeader } from "../../Data/userData";
import { Questions } from "../../Components/questions";

export const Home = () => {
  return getHeader().authorization === "" ? (
    <Redirect to="/user/login" />
  ) : (
    <Questions />
  );
};
