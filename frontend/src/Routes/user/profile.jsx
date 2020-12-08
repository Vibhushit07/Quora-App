import React from "react";
import { getUserData } from "../../Data/userData";

export const Profile = () => {
  const userData = getUserData();
  return (
    <div>
      <li>First Name: {userData.first_name}</li>
      <li>Last Name: {userData.last_name}</li>
      <li>Email: {userData.email_address}</li>
      <li>Username: {userData.user_name}</li>
      <li>Date Of Birth: {userData.dob}</li>
      <li>Contact Number: {userData.contact_number}</li>
      <li>Country: {userData.country}</li>
      <li>About Me: {userData.aboutMe}</li>
    </div>
  );
};
