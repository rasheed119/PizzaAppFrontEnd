import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchallpizza } from "../Slice/PizzaSlice";
import Navbar from "../Components/Navbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import CircularColor from "../Components/CircularProgress";
import Grid from "@mui/material/Grid";
import Pizza from "../Components/Pizza";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { api } from "../Config/Config";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { delete_one_pizza } from "../Slice/PizzaSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const pizza = useSelector((state) => state.pizza);

  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const token = user_data.token;
  const role = user_data.role


  useEffect(() => {
    dispatch(fetchallpizza());
  }, [dispatch]);

  const delete_pizza = async (id) => {
    try {
      await axios.delete(`${api}/pizza/delete/${id}`, {
        headers: { token },
      });
      dispatch(delete_one_pizza(id));
      setSnackbarMessage("Pizza Deleted Successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error.message);
      setSnackbarMessage("Something Went wrong");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  function handleCloseSnackbar() {
    setSnackbarOpen(false);
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          marginTop: 15,
        }}
      >
        <Container fixed>
          <Box sx={{ flexGrow: 1 }}>
            {role === "admin" ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/addpizza")}
                  >
                    <AddIcon sx={{ mr: 2 }} />
                    Add Pizza
                  </Button>
                </Box>
                {pizza.isLoading ? (
                  <CircularColor />
                ) : pizza.isError ? (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">Something went Wrong</Alert>
                  </Stack>
                ) : (
                  pizza.pizza &&
                  pizza.pizza.map((item, index) => (
                    <>
                      <Card
                        variant="outlined"
                        sx={{
                          mt: 3,
                          mb: 3,
                          borderRadius: "16px",
                          ":hover": {
                            boxShadow: "15",
                          },
                        }}
                        key={index}
                      >
                        <CardContent>
                          <Grid container>
                            <Grid item xs={2} md={8} lg={2}>
                              <img
                                alt={item.name}
                                src={item.imageurl}
                                height="75"
                                width="75"
                              ></img>
                            </Grid>
                            <Grid item xs={8} md={8} lg={8}>
                              <Box
                                sx={{
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  fontFamily="Poppins"
                                  fontWeight="600"
                                >
                                  {item.name}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                              <Box
                                sx={{
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    navigate(`/editpizza/${item._id}`)
                                  }
                                  sx={{ mr: 1 }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  color="error"
                                  sx={{ ml: 1 }}
                                  variant="contained"
                                  onClick={() => delete_pizza(item._id)}
                                >
                                  Delete
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </>
                  ))
                )}
              </>
            ) : (
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {pizza.isLoading ? (
                  <CircularColor />
                ) : pizza.isError ? (
                  <>
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">Something went Wrong</Alert>
                    </Stack>
                  </>
                ) : (
                  pizza.pizza &&
                  pizza.pizza.map((item, index) => (
                    <Pizza pizza={item} key={index} />
                  ))
                )}
              </Grid>
            )}
          </Box>
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

export default Dashboard;
