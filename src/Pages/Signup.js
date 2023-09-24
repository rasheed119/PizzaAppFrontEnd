import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import { api } from "../Config/Config";
import axios from "axios";
import CircularColor from "../Components/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const defaultTheme = createTheme();

const signin_validation_schema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  email: yup
    .string()
    .email("Invalid email")
    .test("com", "Invalid email", (value) => {
      if (value && !value.endsWith(".com")) {
        return false;
      }
      return true;
    })
    .required("Email is required"),
  password: yup.string().required("Password is required").min(8),
});

function Signup() {
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [loading, setloading] = useState(false);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: signin_validation_schema,
      onSubmit: async (user_data) => {
        setloading(true);
        try {
          const user = await axios.post(`${api}/users/register`, user_data);
          setSnackbarMessage(user.data.message+", Redirecting to Sign In Page ....");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setloading(false);
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        } catch (error) {
          setSnackbarMessage(error.response.data.message);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          setloading(false);
        }
      },
    });

  function handleCloseSnackbar() {
    setSnackbarOpen(false);
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random/?food,pizza)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {errors.username && touched.username ? (
                <TextField
                  margin="normal"
                  fullWidth
                  name="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error
                  required
                  helperText={errors.username}
                />
              ) : (
                <TextField
                  margin="normal"
                  fullWidth
                  name="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              )}

              {errors.email && touched.email ? (
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error
                  required
                  helperText={errors.email}
                />
              ) : (
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              )}
              {errors.password && touched.password ? (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  error
                  label="Password"
                  type="password"
                  helperText={errors.password}
                />
              ) : (
                <TextField
                  margin="normal"
                  required
                  name="password"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Password"
                  type="password"
                />
              )}
              {loading ? (
                <CircularColor />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              )}

              <Grid container>
                <Grid item xs>
                  <Link to="/">
                    Back to Login Page</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Signup;
