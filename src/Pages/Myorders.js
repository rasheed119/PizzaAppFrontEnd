import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { api } from "../Config/Config";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function Myorders() {
  const [myorders, setmyorders] = useState();
  const json_user_data = localStorage.getItem("user_data");
  const user_data = JSON.parse(json_user_data);
  const userID = user_data.userID;
  const token = user_data.token;
  const userorders = async () => {
    try {
      const response = await axios.get(`${api}/order/userorders/${userID}`, {
        headers: {
          token,
        },
      });
      setmyorders(response.data.user_orders);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    userorders();
  }, []);
  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: 15 }}>
        <Container>
          <Box sx={{ flexGrow: 1 }}>
            {myorders && myorders.length === 0 ? (
              <>
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="info" icon={false}>
                    <Typography
                      fontFamily="Poppins"
                      fontWeight="600"
                      fontSize="24px"
                      sx={{ width: "100%", textAlign: "center" }}
                    >
                      You Have not place any order yet 😟
                    </Typography>
                  </Alert>
                </Stack>
              </>
            ) : (
              ""
            )}
            {myorders &&
              myorders.map((order, index) => (
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography fontFamily="Poppins">
                          Customer Name : {order.name}
                        </Typography>
                        <Typography fontFamily="Poppins">
                          Order id : {order._id}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          fontFamily="Poppins"
                          fontWeight="600"
                          sx={{ mt: 2, mb: 2 }}
                        >
                          Order Status :{" "}
                          {order.status === "Delivered" ? (
                            <Alert
                              severity="success"
                            >
                              Delivered
                            </Alert>
                          ) : (
                            <Alert
                              severity="info"
                            >
                              {order.status}
                            </Alert>
                          )}
                        </Typography>
                        <Typography fontFamily="Poppins" sx={{ mt: 2, mb: 2 }}>
                          Delivery Address : {order.address}
                          <br />
                          {order.State}-{order.pincode}
                        </Typography>
                      </Box>
                      <Typography fontWeight="900" variant="h5" sx={{ mt: 3 }}>
                        Ordered Items :
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Grid container>
                          <Grid item xs={2} md={2} lg={2}>
                            {order.ordered_items.map((item, index) => (
                              <>
                                <img
                                  key={index}
                                  src={item.image}
                                  style={{
                                    height: "100px",
                                    width: "100px",
                                  }}
                                  alt={item.name}
                                />
                              </>
                            ))}
                          </Grid>
                          <Grid item xs={8} md={8} lg={8}>
                            {order.ordered_items.map((item, index) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  height: "100px",
                                }}
                              >
                                <Typography
                                  key={index}
                                  fontFamily="Poppins"
                                  fontWeight="600"
                                >
                                  {item.name} ({item.varient}) ( x
                                  {item.quantity} )
                                </Typography>
                              </Box>
                            ))}
                          </Grid>
                          <Grid item xs={2} md={2} lg={2}>
                            {order.ordered_items.map((item, index) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  height: "100px",
                                }}
                              >
                                <Typography
                                  key={index}
                                  fontFamily="Poppins"
                                  fontWeight="600"
                                >
                                  {item.price} Rs
                                </Typography>
                              </Box>
                            ))}
                          </Grid>
                          <Typography
                            fontFamily="Poppins"
                            textAlign="right"
                            fontWeight="600"
                            variant="h5"
                            sx={{ width: "100%", marginRight: "80px" }}
                          >
                            Total : {order.amount}
                          </Typography>
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </>
              ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default Myorders;
