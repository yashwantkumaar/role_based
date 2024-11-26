import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../components/Popup";

const ChooseUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, currentRole } = useSelector(
    (state) => state.user
  );

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      navigate("/Adminlogin");
    } else if (user === "Student") {
      navigate("/Studentlogin");
    } else if (user === "Teacher") {
      navigate("/Teacherlogin");
    }
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "Student") {
        navigate("/Student/dashboard");
      } else if (currentRole === "Teacher") {
        navigate("/Teacher/dashboard");
      }
    } else if (status === "error") {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);
  return (
    <StyledContainer>
      <StyledContainer sx={{ mb: 2, textAlign: "center" }}>
      <StyledTypography variant="h1" gutterBottom style={{ fontSize: 48, fontWeight: 600, marginBottom: 40 }}>
      Presence Tracker
        </StyledTypography>
      </StyledContainer>
      <CenteredContent>
        <StyledCircle onClick={() => navigateHandler("Admin")}>
          <StyledTypography>Admin</StyledTypography>
        </StyledCircle>
        <ContentRow>
          <StyledCircle onClick={() => navigateHandler("Teacher")}>
            <StyledTypography>Teacher</StyledTypography>
          </StyledCircle>
          <StyledCircle onClick={() => navigateHandler("Student")}>
            <StyledTypography>Student</StyledTypography>
          </StyledCircle>
        </ContentRow>
      </CenteredContent>
      {loader && (
        <Backdrop>
          <CircularProgress />
          <p>Please Wait</p>
        </Backdrop>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const StyledCircle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  padding: 20px;
  text-align: center;
  background-color: #ffffff;
  color: #333;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;

const StyledTypography = styled.h2`
  margin: 0;
  color: #333;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CircularProgress = styled.div`
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
