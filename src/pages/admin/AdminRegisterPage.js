import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/userRelated/userHandle";
import Popup from "../../components/Popup";
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

const AdminRegisterPage = () => {
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
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.adminName.value;
    const schoolName = event.target.schoolName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !schoolName || !email || !password) {
      if (!name) setAdminNameError(true);
      if (!schoolName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { name, email, password, role: "Admin", schoolName };
    setLoader(true);
    dispatch(registerUser(fields, "Admin"));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "adminName") setAdminNameError(false);
    if (name === "schoolName") setSchoolNameError(false);
  };

  useEffect(() => {
    if (
      status === "success" ||
      (currentUser !== null && currentRole === "Admin")
    ) {
      navigate("/Admin/dashboard");
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      console.log(error);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

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
        Admin Register
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
        <FormControl fullWidth margin="normal" error={adminNameError}>
          <TextField
            id="adminName"
            name="adminName"
            type="text"
            label="Admin Name"
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          {adminNameError && <FormHelperText>Name is required</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal" error={schoolNameError}>
          <TextField
            id="schoolName"
            name="schoolName"
            type="text"
            label="School Name"
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          {schoolNameError && (
            <FormHelperText>School name is required</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal" error={emailError}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          {emailError && <FormHelperText>Email is required</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal" error={passwordError}>
          <TextField
            id="password"
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
          {loader ? "Loading..." : "Register"}
        </Button>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account? <Link to="/Adminlogin">Log in</Link>
          </Typography>
        </Box>
      </form>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </Box>
  );
};

export default AdminRegisterPage;
