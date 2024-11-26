import React from "react";
import styled from "styled-components";
import { Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <>
      <ProfileCard>
        <ProfileCardContent>
          <ProfileText>Name: {currentUser.name}</ProfileText>
          <ProfileText>RollNo: {currentUser.rollNum}</ProfileText>
          <ProfileText>Class: {sclassName.sclassName}</ProfileText>
          <ProfileText>School: {studentSchool.schoolName}</ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </>
  );
};

export default StudentProfile;

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  height: 250px; 
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