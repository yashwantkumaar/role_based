import React from "react";
import styled from "styled-components";
import { Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <ProfileCard>
        <ProfileCardContent>
          <ProfileText>Name: {currentUser.name}</ProfileText>
          <ProfileText>Email: {currentUser.email}</ProfileText>
          <ProfileText>School: {currentUser.schoolName}</ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </>
  );
};

export default AdminProfile;

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  height: 200px; 
  border-radius: 10px;
  transition: box-shadow 0.3s;
  

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
`;
const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
`;

const ProfileText = styled(Typography)`
  && {
    margin: 10px;
    line-height: 1.5;
  }
`;