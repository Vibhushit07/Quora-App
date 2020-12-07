import React from "react";
import { Redirect } from "react-router";
import { getHeader } from "../../Data/userData";

export const Home = () => {
  return getHeader().authorization === "" ? (
    <Redirect to="/login" />
  ) : (
    <div>Home</div>
  );
};
