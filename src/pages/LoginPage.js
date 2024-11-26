import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userRelated/userHandle";
import Popup from "../components/Popup";
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role === "Student") {
      const rollNum = event.target.rollNumber.value;
      const studentName = event.target.studentName.value;
      const password = event.target.password.value;

      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!studentName) setStudentNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      const fields = { rollNum, studentName, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;

      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }

      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "rollNumber") setRollNumberError(false);
    if (name === "studentName") setStudentNameError(false);
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
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        p: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {role} Login
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
        {role === "Student" && (
          <>
            <FormControl fullWidth margin="normal" error={rollNumberError}>
              <TextField
                name="rollNumber"
                type="number"
                label="Roll Number"
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
              />
              {rollNumberError && (
                <FormHelperText>Roll Number is required</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal" error={studentNameError}>
              <TextField
                name="studentName"
                type="text"
                label="Student Name"
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
              />
              {studentNameError && (
                <FormHelperText>Name is required</FormHelperText>
              )}
            </FormControl>
          </>
        )}
        {role !== "Student" && (
          <FormControl fullWidth margin="normal" error={emailError}>
            <TextField
              name="email"
              type="email"
              label="Email"
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            {emailError && <FormHelperText>Email is required</FormHelperText>}
          </FormControl>
        )}
        <FormControl fullWidth margin="normal" error={passwordError}>
          <TextField
            name="password"
            type={toggle ? "text" : "password"}
            label="Password"
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setToggle(!toggle)} edge="end">
                    {toggle ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {passwordError && (
            <FormHelperText>Password is required</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loader}
          sx={{ mt: 2 }}
        >
          {loader ? "Loading..." : "Login"}
        </Button>
        {role === "Admin" && (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/Adminregister">Sign up</Link>
          </Typography>
        )}
      </form>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </Box>
  );
};

export default LoginPage;
