import React, { useEffect, useState } from "react";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    fetch("/user/profile")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.userFname);
        setLastName(data.userLname);
        setUserEmail(data.email);
        setHeight(data.h);
        setWeight(data.w);
      })
      .catch((error) => console.error("Error fetching username:", error));
  }, []);

  return <>
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-field">
        <strong>First Name:</strong> {firstName}
      </div>
      <div className="profile-field">
        <strong>Last Name:</strong> {lastName}
      </div>
      <div className="profile-field">
        <strong>Email:</strong> {userEmail}
      </div>
      <div className="profile-field">
        <strong>Height:</strong> {height} cm
      </div>
      <div className="profile-field">
        <strong>Weight:</strong> {weight} kg
      </div>
    </div>
  </>;
};


export default Profile;
