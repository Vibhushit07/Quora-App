import React from "react";
import { getUserData } from "../../Data/userData";

export const Profile = () => {
  const userData = getUserData();
  return (
    <div>
      <li>First Name: {userData.firstName}</li>
      <li>Last Name: {userData.lastName}</li>
      <li>Email: {userData.emailAddress}</li>
      <li>Username: {userData.userName}</li>
      <li>Date Of Birth: {userData.dob}</li>
      <li>Contact Number: {userData.contactNumber}</li>
      <li>Country: {userData.country}</li>
      <li>About Me: {userData.aboutMe}</li>
    </div>
  );
};
