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
import CircularColor from "../Components/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { api } from "../Config/Config";

const defaultTheme = createTheme();

const login_validation_schema = yup.object().shape({
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
  password: yup.string().required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: login_validation_schema,
      onSubmit: async (user_data) => {
        setloading(true);
        try {
          const response = await axios.post(`${api}/users/login`, user_data);
          const data = response.data;
          if (data) {
            window.localStorage.setItem("user_data", JSON.stringify(data));
          }
          if (data.Verification) {
            setSnackbarMessage(data.message + " Redirecting to Dashboard...");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          } else {
            setloading(false);
            setSnackbarMessage("Your Account is Not Verified");
            snackbarSeverity("warning");
            setSnackbarOpen(true);
          }
        } catch (error) {
          setloading(false);
          console.log(error);
          setSnackbarMessage(error.response.data.message);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
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
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {errors.email && touched.email ? (
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error
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
                  name="password"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Password"
                  type="password"
                  error
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
                  <Link to="/forgotpassword">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
              <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <Typography
                  fontFamily="Poppins"
                  align="center"
                  fontWeight="600"
                >
                  Admin Login
                </Typography>
                <Box>
                  <Typography fontFamily="Poppins" sx={{ mt: 2 }}>
                    Email : admin123@gmail.com
                  </Typography>
                  <Typography fontFamily="Poppins" sx={{ mt: 2 }}>
                    Password : admin123
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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

export default Login;
