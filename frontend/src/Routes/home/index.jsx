import React from "react";
import { Redirect } from "react-router";
import { Questions } from "../../Components/questions";
import { getHeader } from "../../Data/userData";

export const Home = () => {
  return getHeader().authorization === "" ? (
    <Redirect to="/login" />
  ) : (
    <div></div>
  );
};
