import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import Navbar from "../Components/Navbar";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { api } from "../Config/Config";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Editpizza() {
  const { id } = useParams();
  const pizza = useSelector((state) => state.pizza.pizza);
  const findpizza = pizza.find((item) => item._id === id);
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const token = user_data.token;
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { values, handleChange, handleSubmit, handleBlur} =
    useFormik({
      initialValues: {
        name: findpizza.name,
        category: findpizza.category,
        prices: {
          small: findpizza.prices.small,
          medium: findpizza.prices.medium,
          large: findpizza.prices.large,
        },
        description: findpizza.description,
        image: findpizza.imageurl,
      },
      onSubmit: async (value) => {
        try {
          const response = await axios.put(
            `${api}/pizza/editpizza/${id}`,
            { ...value, userID: user_data.userID },
            {
              headers: { token },
            }
          );
          setSnackbarMessage(
            response.data.message + ", Redirecting to dashboard...."
          );
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setTimeout(() => {
            navigate("/dashboard");
          }, 4000);
        } catch (error) {
          console.log(error.message);
          setSnackbarMessage(error.response.data.Error);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      },
    });
  function handleCloseSnackbar() {
    setSnackbarOpen(false);
  }
  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: 15 }}>
        <Container fixed>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography fontFamily="Poppins" align="center" variant="h4">
              Edit Pizza
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3} sx={{ marginTop: 5 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Pizza Name"
                    fullWidth
                    autoComplete="given-name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    required
                    id="image"
                    name="image"
                    label="Image Url"
                    fullWidth
                    autoComplete="given-name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.image}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      required
                      id="category"
                      name="category"
                      label="Category"
                      fullWidth
                      autoComplete="category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Grid container>
                    <Grid item xs={4} md={4} sm={4}>
                      <TextField
                        required
                        id="price.small"
                        name="prices.small"
                        label="Price-Small"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.prices.small}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={4} md={4} sm={4}>
                      <TextField
                        required
                        id="price.medium"
                        name="prices.medium"
                        label="Price-Medium"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.prices.medium}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={4} md={4} sm={4}>
                      <TextField
                        required
                        id="price.large"
                        name="prices.large"
                        label="Price-Large"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.prices.large}
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    required
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    autoComplete="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    variant="standard"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                color="success"
                sx={{ mt: 2 }}
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
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
    </>
  );
}

export default Editpizza;
