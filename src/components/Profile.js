import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
    
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser)
  if (!currentUser) {
    return <Link to="/login" />;
  }
  return (
    <div>
      <header>
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};
export default Profile;