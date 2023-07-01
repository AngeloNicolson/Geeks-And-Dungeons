import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../../Api";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  useEffect(() => {
    const checkUsername = async () => {
      const userProfile = await api.getUserProfile(user.sub);

      console.log("User profile:", userProfile);
      try {
      } catch (error) {
        console.error("Error retrieving user profile:", error);
      }
    };

    if (isAuthenticated) {
      checkUsername();
    }
  }, [isAuthenticated, user.sub]);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.updateUserProfile(user.sub, username);
      setIsUsernameSet(true);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Handle the case where the user is not authenticated
    return (
      <div>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  if (isUsernameSet) {
    // Handle the case where the username is already set
    return (
      <div>
        <img src={user.picture} alt="Profile" />
        <h2 className={styles.profileText}>{user.name}</h2>
        <p className={styles.profileText}>{user.email}</p>
        <p className={styles.profileText}>Username: {username}</p>
      </div>
    );
  }

  // Render the form to set the username
  return (
    <div>
      <img src={user.picture} alt="Profile" />
      <h2 className={styles.profileText}>{user.name}</h2>
      <p className={styles.profileText}>{user.email}</p>
      <form onSubmit={handleUsernameSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">Set Username</button>
      </form>
    </div>
  );
};

export default Profile;
