import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchallpizza } from "../Slice/PizzaSlice";
import Navbar from "../Components/Navbar";
import { Box, Container } from "@mui/material";
import CircularColor from "../Components/CircularProgress";
import Grid from "@mui/material/Grid";
import Pizza from "../Components/Pizza";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function Dashboard() {
  const dispatch = useDispatch();

  const pizza = useSelector((state) => state.pizza);

  useEffect(() => {
    dispatch(fetchallpizza());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: 15 }}>
        <Container fixed>
          <Box sx={{ flexGrow: 1 }}>
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
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
