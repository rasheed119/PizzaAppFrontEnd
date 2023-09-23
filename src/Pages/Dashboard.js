import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchallpizza } from "../Slice/PizzaSlice";
import Navbar from "../Components/Navbar";
import { Box, Container } from "@mui/material";
import CircularColor from "../Components/CircularProgress";
import Grid from "@mui/material/Grid";
import Pizza from "../Components/Pizza";

function Dashboard() {
  const dispatch = useDispatch();

  const pizza = useSelector((state) => state.pizza);

  const cart = useSelector((state) => state.cart);
  console.log(cart);

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
              ) : (
                pizza.pizza &&
                pizza.pizza.map((item, index) => (
                  <Pizza pizza = {item} key={index} />
                  )
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
