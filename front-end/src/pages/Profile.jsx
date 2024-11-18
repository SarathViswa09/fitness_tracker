import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobnum, setUserMobnum] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("/user/profile")
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.userFname);
        setLastName(data.userLname);
        setUserEmail(data.email);
        setUserMobnum(data.mobnum);
        setHeight(data.h);
        setWeight(data.w);
        setGoal(data.g);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

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
          userMobnum,
          height,
          weight,
          goal,
        }),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!", {
          position: "top-right",
        });
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.", {
        position: "top-right",
      });
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "700px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
    lineHeight: "1.6",
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#333",
    marginBottom: "30px",
    textAlign: "center",
  };

  const profileFieldStyle = {
    marginBottom: "20px",
    width: "100%",
    fontSize: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#333",
    marginRight: "15px",
    minWidth: "120px",
  };

  const inputStyle = {
    padding: "10px 15px",
    fontSize: "1rem",
    width: "70%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#f5f5f5",
    transition: "border-color 0.3s",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 25px",
    fontSize: "1.1rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
  };

  return (
    <div style={containerStyle}>
      {/* Toast Container for Notifications */}
      <ToastContainer />

      <h3 style={headingStyle}>User Profile</h3>

      <div style={profileFieldStyle}>
        <label htmlFor="firstName" style={labelStyle}>
          First Name:
        </label>
        {isEditing ? (
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
          />
        ) : (
          <span>{firstName}</span>
        )}
      </div>

      <div style={profileFieldStyle}>
        <label htmlFor="lastName" style={labelStyle}>
          Last Name:
        </label>
        {isEditing ? (
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
          />
        ) : (
          <span>{lastName}</span>
        )}
      </div>

      <div style={profileFieldStyle}>
        <label htmlFor="userEmail" style={labelStyle}>
          Email:
        </label>
        {isEditing ? (
          <input
            id="userEmail"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            style={inputStyle}
          />
        ) : (
          <span>{userEmail}</span>
        )}
      </div>

      <div style={profileFieldStyle}>
        <label htmlFor="userMobnum" style={labelStyle}>
          Mobile Number:
        </label>
        {isEditing ? (
          <input
            id="userMobnum"
            type="text"
            value={userMobnum}
            onChange={(e) => setUserMobnum(e.target.value)}
            style={inputStyle}
          />
        ) : (
          <span>{userMobnum}</span>
        )}
      </div>

      <div style={profileFieldStyle}>
        <label htmlFor="height" style={labelStyle}>
          Height:
        </label>
        {isEditing ? (
          <input
            id="height"
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={inputStyle}
          />
        ) : (
          <span>{height}</span>
        )}
      </div>

      <div style={profileFieldStyle}>
        <label htmlFor="weight" style={labelStyle}>
          Weight:
        </label>
        {isEditing ? (
          <input
            id="weight"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={inputStyle}
          />
        ) : (
          <span>{weight}</span>
        )}
      </div>

      <div style={profileFieldStyle}>
        <label htmlFor="goal" style={labelStyle}>
          Goal:
        </label>
        {isEditing ? (
          <input
            id="goal"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            style={inputStyle}
          />
        ) : (
          <span>{goal}</span>
        )}
      </div>

      <div>
        {isEditing ? (
          <button style={buttonStyle} onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button style={buttonStyle} onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
