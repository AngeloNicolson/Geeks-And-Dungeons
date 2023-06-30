import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Profile.module.css";
import Navigation from "../../Navigation/Navigation";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      {isAuthenticated && (
        <div className={styles.profileContainer}>
          <img
            className={styles.profilePicture}
            src={user.picture}
            alt="Profile"
          />
          <h2 className={styles.profileName}>{user.name}</h2>
          <p className={styles.profileEmail}>{user.email}</p>
        </div>
      )}
    </>
  );
};

export default Profile;
