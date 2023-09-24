import React from "react";
import Navbar from "../Components/Navbar";
import { Box, Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((state)=>state.cart)
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
              { cart.cartitems.map((pizza,index)=>(
                <>
                <div key={index} ></div>
                </>
              )) }
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Cart;
