import React, { useEffect, useState } from "react";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    fetch("/user/profile")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.userFname);
        setLastName(data.userLname);
        setUserEmail(data.email);
        setHeight(data.h);
        setWeight(data.w);
        setGoal(data.g);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch("/user/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          userEmail,
          height,
          weight,
          goal,
        }),
      });

      if (response.ok) {
        setUpdateStatus("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setUpdateStatus("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateStatus("Error updating profile. Please try again.");
    }
    setTimeout(() => {
      setUpdateStatus("");
    }, 3000);
  };

  return (
    <div className="profile-container">
      <h3>User Profile</h3>
      {updateStatus && (
        <div
          className={`status-message ${
            updateStatus.includes("Error") ? "error" : "success"
          }`}
        >
          {updateStatus}
        </div>
      )}
      <div className="profile-field">
        <strong>First Name: </strong>
        {isEditing ? (
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        ) : (
          firstName
        )}
      </div>
      <div className="profile-field">
        <strong>Last Name: </strong>
        {isEditing ? (
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        ) : (
          lastName
        )}
      </div>
      <div className="profile-field">
        <strong>Email: </strong>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        ) : (
          userEmail
        )}
      </div>
      <div className="profile-field">
        <strong>Height: </strong>
        {isEditing ? (
          <input
            type="text"
            name="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        ) : (
          height
        )}
      </div>
      <div className="profile-field">
        <strong>Weight: </strong>
        {isEditing ? (
          <input
            type="text"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        ) : (
          weight
        )}
      </div>

      <div className="profile-field">
        <strong>Goal: </strong>
        {isEditing ? (
          <input
            type="text"
            name="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        ) : (
          goal
        )}
      </div>

      <div className="edit-button">
        {isEditing ? (
          <button className="user-btn" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button className="user-btn" onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
