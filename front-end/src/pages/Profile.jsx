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

  // Improved Styles
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

  const inputFocusStyle = {
    borderColor: "#007bff",
    backgroundColor: "#fff",
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

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
    transform: "scale(1.05)",
  };

  const statusMessageStyle = {
    marginBottom: "20px",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "600",
    color: "#fff",
  };

  const successStyle = {
    backgroundColor: "#28a745",
  };

  const errorStyle = {
    backgroundColor: "#dc3545",
  };

  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>User Profile</h3>
      {updateStatus && (
        <div
          style={{
            ...statusMessageStyle,
            ...(updateStatus.includes("Error") ? errorStyle : successStyle),
          }}
        >
          {updateStatus}
        </div>
      )}

      <div style={profileFieldStyle}>
        <label htmlFor="firstName" style={labelStyle}>
          First Name:
        </label>
        {isEditing ? (
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style = { ...inputStyle, ...inputFocusStyle })
            }
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
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style = { ...inputStyle, ...inputFocusStyle })
            }
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
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style = { ...inputStyle, ...inputFocusStyle })
            }
          />
        ) : (
          <span>{userEmail}</span>
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
            name="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style = { ...inputStyle, ...inputFocusStyle })
            }
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
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style = { ...inputStyle, ...inputFocusStyle })
            }
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
            name="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style = { ...inputStyle, ...inputFocusStyle })
            }
          />
        ) : (
          <span>{goal}</span>
        )}
      </div>

      <div>
        {isEditing ? (
          <button
            style={buttonStyle}
            onClick={handleSaveClick}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = buttonStyle.backgroundColor)
            }
          >
            Save
          </button>
        ) : (
          <button
            style={buttonStyle}
            onClick={handleEditClick}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = buttonStyle.backgroundColor)
            }
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;