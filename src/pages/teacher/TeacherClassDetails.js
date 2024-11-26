import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { Paper, Box, Typography, Button, Grid } from "@mui/material";
import { BlackButton, BlueButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import styled from "styled-components";

const TeacherClassDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sclassStudents, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);
  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    if (classID) {
      dispatch(getClassStudents(classID));
    }
  }, [dispatch, classID]);

  if (error) {
    console.log(error);
  }

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    name: student.name,
    rollNum: student.rollNum,
    id: student._id,
  }));

  const StudentsButtonHaver = ({ row }) => {
    const handleAttendance = () => {
      navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
    };

    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Teacher/class/student/" + row.id)}
        >
          View
        </BlueButton>
        <BlackButton variant="contained" onClick={handleAttendance}>
          Take Attendance
        </BlackButton>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Class Details
          </Typography>
          {getresponse ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              No Students Found
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledPaper>
                  <Typography variant="h5" align="center" gutterBottom>
                    Students List
                  </Typography>
                  {Array.isArray(sclassStudents) &&
                    sclassStudents.length > 0 && (
                      <TableTemplate
                        buttonHaver={StudentsButtonHaver}
                        columns={studentColumns}
                        rows={studentRows}
                      />
                    )}
                </StyledPaper>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default TeacherClassDetails;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin: 0 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
