import React from "react";
import Navbar from "../Components/Navbar";
import {
  Box,
  Button,
  CardActions,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { singleaddtocart } from "../Slice/CartSlice";

function Cart() {
  const store = useSelector((state) => state.cart.store);
  const cart_items = store.cartitems;

  //console.log(cart_items)

  const dispatch = useDispatch();
  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: 15 }}>
        <Container fixed>
          <Box>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} md={8} lg={8}>
                {cart_items.map((pizza, index) => (
                  <>
                    <Card
                      sx={{
                        display: "flex",
                        boxShadow: "10",
                        borderRadius: "16px",
                        marginBottom: "20px",
                      }}
                      key={index}
                      style={{ width: "100%" }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 120, height: 135 }}
                        style={{ paddingTop: "20px" }}
                        image={pizza.image}
                        alt={pizza.name}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography
                            component="div"
                            variant="h5"
                            fontFamily="Poppins"
                          >
                            {pizza.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            {pizza.varient}
                          </Typography>
                        </CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: 1,
                            pb: 1,
                          }}
                        >
                          <IconButton
                            aria-label="previous"
                            sx={{
                              backgroundColor: "#f44336",
                              ":hover": { backgroundColor: "#aa2e25" },
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <TextField
                            disabled
                            sx={{ mx: "20px", width: "50px", pl: 1 }}
                            id="filled-disabled"
                            value={pizza.quantity}
                          />
                          <IconButton
                            aria-label="next"
                            sx={{
                              backgroundColor: "#4caf50",
                              ":hover": { backgroundColor: "#357a38" },
                            }}
                            onClick={() => {
                              dispatch(singleaddtocart({ pizza }));
                            }}
                          >
                            <AddIcon sx={{ color: "white" }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Card>
                  </>
                ))}
              </Grid>
              <Grid
                item
                xs={6}
                md={4}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Card
                  sx={{
                    width: { xs: "100%", md: "30%",lg: "30%" },
                    boxShadow: "10",
                    borderRadius: "16px",
                    position: { xs: "static", md: "fixed" },
                    top: "100px",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h4"
                      color="text.primary"
                      gutterBottom
                      fontFamily="Poppins"
                      fontWeight="800"
                    >
                      Cart Items ({cart_items.length})
                    </Typography>
                    <Grid container>
                      <Grid item xs={8} md={8} lg={8}>
                        <Typography
                          sx={{ mb: 1.5 }}
                          fontFamily="Poppins"
                          paragraph
                          color="text.secondary"
                        >
                          Pizza Name
                        </Typography>
                        {cart_items.map((pizza, index) => (
                          <Typography
                            key={index}
                            fontFamily="Poppins"
                            fontWeight="600"
                            variant="body2"
                            sx={{ mb: 1.5 }}
                          >
                            {pizza.name} (x{pizza.quantity})
                          </Typography>
                        ))}
                      </Grid>
                      <Grid item xs={4} md={4} lg={4}>
                        <Typography
                          sx={{ mb: 1.5 }}
                          fontFamily="Poppins"
                          textAlign="center"
                          color="text.secondary"
                        >
                          Amount (INR)
                        </Typography>
                        {cart_items.map((pizza, index) => (
                          <Typography
                            key={index}
                            fontFamily="Poppins"
                            fontWeight="600"
                            textAlign="center"
                            sx={{ mb: 1.5 }}
                          >
                            {pizza.price}
                          </Typography>
                        ))}
                      </Grid>
                    </Grid>
                    <Divider />
                    <Typography
                      sx={{ mt: 1.5, pr: 1.5 }}
                      fontFamily="Poppins"
                      textAlign="right"
                      variant="h4"
                      fontWeight="600"
                    >
                      Total : {store.total_price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      sx={{
                        fontFamily: "Poppins",
                        width: "100%",
                        borderRadius: "30px",
                        backgroundColor: "#f73378",
                        ":hover": { backgroundColor: "#f73365" },
                      }}
                      variant="contained"
                      size="large"
                    >
                      Place Order
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Cart;
