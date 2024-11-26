import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Table,
  TableBody,
  TableHead,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import { useNavigate, useParams } from "react-router-dom";
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from "../../components/attendanceCalculator";
import { BlackButton, PurpleButton } from "../../components/buttonStyles";
import { StyledTableCell, StyledTableRow } from "../../components/styles";

// Define StyledButton to match the design from ViewStdAttendance
const StyledButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
  &:hover {
    background-color: #0056b3;
  }
`;

const TeacherViewStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser, userDetails, response, loading, error } = useSelector(
    (state) => state.user
  );

  const address = "Student";
  const studentID = params.id;
  const teachSubject = currentUser.teachSubject?.subName;
  const teachSubjectID = currentUser.teachSubject?._id;

  const [sclassName, setSclassName] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [openStates, setOpenStates] = useState({});

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (userDetails) {
      setSclassName(userDetails.sclassName || "");
      setStudentSchool(userDetails.school || "");
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: "Present", value: overallAttendancePercentage },
    { name: "Absent", value: overallAbsentPercentage },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ProfileCard>
            <ProfileCardContent>
              <ProfileText>Name: {userDetails.name}</ProfileText>
              <ProfileText>RollNo: {userDetails.rollNum}</ProfileText>
              <ProfileText>Class: {sclassName.sclassName}</ProfileText>
              <ProfileText>School: {studentSchool.schoolName}</ProfileText>
            </ProfileCardContent>
          </ProfileCard>
          <StyledPaper>
            <Typography variant="h4" align="center" gutterBottom>
              Attendance
            </Typography>
            {subjectAttendance &&
              Array.isArray(subjectAttendance) &&
              subjectAttendance.length > 0 && (
                <>
                  {Object.entries(
                    groupAttendanceBySubject(subjectAttendance)
                  ).map(
                    (
                      [subName, { present, allData, subId, sessions }],
                      index
                    ) => {
                      if (subName === teachSubject) {
                        const subjectAttendancePercentage =
                          calculateSubjectAttendancePercentage(
                            present,
                            sessions
                          );

                        return (
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <Table key={index}>
                                <TableHead>
                                  <StyledTableRow>
                                    <StyledTableCell>Subject</StyledTableCell>
                                    <StyledTableCell>Present</StyledTableCell>
                                    <StyledTableCell>
                                      Total Sessions
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      Attendance Percentage
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      Actions
                                    </StyledTableCell>
                                  </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                  <StyledTableRow>
                                    <StyledTableCell>{subName}</StyledTableCell>
                                    <StyledTableCell>{present}</StyledTableCell>
                                    <StyledTableCell>
                                      {sessions}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {subjectAttendancePercentage}%
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <StyledButton
                                        onClick={() => handleOpen(subId)}
                                      >
                                        {openStates[subId] ? (
                                          <KeyboardArrowUp />
                                        ) : (
                                          <KeyboardArrowDown />
                                        )}
                                        Details
                                      </StyledButton>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                  <StyledTableRow>
                                    <StyledTableCell
                                      style={{
                                        paddingBottom: 0,
                                        paddingTop: 0,
                                      }}
                                      colSpan={6}
                                    >
                                      <Collapse
                                        in={openStates[subId]}
                                        timeout="auto"
                                        unmountOnExit
                                      >
                                        <Box sx={{ margin: 1 }}>
                                          <Typography variant="h6" gutterBottom>
                                            Attendance Details
                                          </Typography>
                                          <Table
                                            size="small"
                                            aria-label="purchases"
                                          >
                                            <TableHead>
                                              <StyledTableRow>
                                                <StyledTableCell>
                                                  Date
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                  Status
                                                </StyledTableCell>
                                              </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                              {allData.map((data, index) => {
                                                const date = new Date(
                                                  data.date
                                                );
                                                const dateString =
                                                  date.toString() !==
                                                  "Invalid Date"
                                                    ? date
                                                        .toISOString()
                                                        .substring(0, 10)
                                                    : "Invalid Date";
                                                return (
                                                  <StyledTableRow key={index}>
                                                    <StyledTableCell
                                                      component="th"
                                                      scope="row"
                                                    >
                                                      {dateString}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                      {data.status}
                                                    </StyledTableCell>
                                                  </StyledTableRow>
                                                );
                                              })}
                                            </TableBody>
                                          </Table>
                                        </Box>
                                      </Collapse>
                                    </StyledTableCell>
                                  </StyledTableRow>
                                </TableBody>
                              </Table>
                            </Grid>
                          </Grid>
                        );
                      } else {
                        return null;
                      }
                    }
                  )}
                  <div>
                    Overall Attendance Percentage:{" "}
                    {overallAttendancePercentage.toFixed(2)}%
                  </div>
                </>
              )}
            <br />
            <br />
            <BlackButton
              onClick={() =>
                navigate(
                  `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
                )
              }
            >
              Add Attendance
            </BlackButton>
          </StyledPaper>
        </div>
      )}
    </>
  );
};

export default TeacherViewStudent;

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  border-radius: 10px;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled(Typography)`
  margin: 10px;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin: 0 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledLoading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #6c757d;
`;
