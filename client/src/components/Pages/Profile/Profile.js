import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../../Api";
import styles from "./Profile.module.css";
import Navigation from "../../Navigation/Navigation";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storeUsername = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently();
          const userProfile = await api.getUserProfile(user.sub, accessToken);

          if (
            userProfile &&
            userProfile.length > 0 &&
            userProfile[0].username
          ) {
            setUsername(userProfile[0].username);
          } else {
            await api.updateUserProfile(user.sub, user.nickname, accessToken);
            setUsername(user.nickname);
          }
        }
      } catch (error) {
        console.error("Error storing/fetching profile:", error);
      }
    };

    if (!isLoading) {
      storeUsername();
    }
  }, [
    isAuthenticated,
    isLoading,
    user.sub,
    user.nickname,
    getAccessTokenSilently,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Handle the case where the user is not authenticated
    return (
      <div className={styles.profileContainer}>
        <Navigation />
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const displayName = username || user.nickname;

  return (
    <div className={styles.profileContainer}>
      <Navigation />
      <h1 className={styles.profileTitle}>Profile</h1>
      <img src={user.picture} alt="Profile" />
      <h2 className={styles.profileText}>User Name: {displayName}</h2>
      <p className={styles.profileText}>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
