import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Container, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import { api } from "../Config/Config";
import useRazorpay from "react-razorpay";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import CircularColor from "../Components/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { remove_all_items_from_cart } from "../Slice/CartSlice";

const checkout_validation_schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  address: yup.string().required("Address is Required"),
  city: yup.string().required("City is Required"),
  state: yup.string().required("State is Required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Pincode must be a 6-digit number")
    .required("Pincode is Required"),
  mobile: yup
    .string()
    .matches(/^[6789]\d{9}$/, "Invalid mobile number")
    .required("Mobile Number is Required"),
});

function Checkout() {
  const [Razorpay] = useRazorpay();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const json_user_data = localStorage.getItem("user_data");
  const user_data = JSON.parse(json_user_data);
  const token = user_data.token;
  const userID = user_data.userID;
  const dispatch = useDispatch();
  const total_amount = useSelector((state) => state.cart.store.total_price);
  const cartItems = useSelector((state) => state.cart.store.cartitems);

  const cartItem = [];

  cartItems.forEach((pizza) => {
    const pizza_data = {
      name: pizza.name,
      image: pizza.image,
      price: pizza.price,
      quantity: pizza.quantity,
      varient: pizza.varient,
    };
    cartItem.push(pizza_data);
  });

  const handlePayment = async (value) => {
    try {
      const order_amount = {
        amount: total_amount,
      };
      const result = await axios.post(
        `${api}/order/createorder`,
        order_amount,
        {
          headers: {
            token,
          },
        }
      );
      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      const { amount, id: order_id, currency } = result.data;
      const options = {
        key: "rzp_test_9uzFaRoEwyoZoP",
        amount: amount.toString(),
        currency: currency,
        name: `${value.name}`,
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            name: value.name,
            userID,
            razor_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            address: value.address,
            amount: total_amount,
            ordered_items: cartItem,
            pincode: value.pincode,
            State: value.state,
          };
          const placeorder = await axios.post(`${api}/order/payment`, data, {
            headers: {
              token,
            },
          });
          setSnackbarMessage(placeorder.data.message);
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setLoading(false);
          dispatch(remove_all_items_from_cart());
        },
        prefill: {
          name: `${value.name}`,
          contact: `${value.mobile}`,
        },
        notes: {
          address: `${value.address}`,
        },
        theme: {
          color: "#61dafb",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        setLoading(false);
      });

      rzp1.open();
    } catch (error) {
      if (cartItems.length === 0) {
        setLoading(false);
        setSnackbarMessage("Cart is Empty");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } else {
        setLoading(false);
        console.log(error.message);
      }
    }
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        mobile: "",
      },
      validationSchema: checkout_validation_schema,
      onSubmit: (value) => {
        setLoading(true);
        handlePayment(value);
      },
    });
  function handleCloseSnackbar() {
    setSnackbarOpen(false);
  }

  return (
    <>
      <Navbar />
      <React.Fragment>
        <Box sx={{ marginTop: 15 }}>
          <Container fixed>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" fontFamily="Poppins" gutterBottom>
                Shipping address
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    {touched.name && errors.name ? (
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        error
                        autoComplete="given-name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        variant="standard"
                        helperText={errors.name}
                      />
                    ) : (
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        autoComplete="given-name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        variant="standard"
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {touched.address && errors.address ? (
                      <TextField
                        required
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        error
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="shipping address"
                        variant="standard"
                        helperText={errors.address}
                      />
                    ) : (
                      <TextField
                        required
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="shipping address"
                        variant="standard"
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {touched.city && errors.city ? (
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error
                        helperText={errors.city}
                        autoComplete="shipping address-level2"
                        variant="standard"
                      />
                    ) : (
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="shipping address-level2"
                        variant="standard"
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {touched.state && errors.state ? (
                      <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        error
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="standard"
                      />
                    ) : (
                      <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                        variant="standard"
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {touched.pincode && errors.pincode ? (
                      <TextField
                        required
                        id="pincode"
                        name="pincode"
                        label="Zip / Postal code"
                        fullWidth
                        value={values.pincode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error
                        helperText={errors.pincode}
                        autoComplete="shipping postal-code"
                        variant="standard"
                      />
                    ) : (
                      <TextField
                        required
                        id="pincode"
                        name="pincode"
                        label="Zip / Postal code"
                        fullWidth
                        value={values.pincode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="shipping postal-code"
                        variant="standard"
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {touched.mobile && errors.mobile ? (
                      <TextField
                        required
                        id="mobile"
                        name="mobile"
                        label="Mobile Number"
                        fullWidth
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error
                        helperText={errors.mobile}
                        autoComplete="mobile"
                        variant="standard"
                      />
                    ) : (
                      <TextField
                        required
                        id="mobile"
                        name="mobile"
                        label="Mobile Number"
                        fullWidth
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="mobile"
                        variant="standard"
                      />
                    )}
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexGrow: 1,
                    }}
                  >
                    {loading ? (
                      <CircularColor />
                    ) : (
                      <Button
                        sx={{
                          fontFamily: "Poppins",
                          width: "25%",
                          borderRadius: "30px",
                          backgroundColor: "#f73378",
                          ":hover": { backgroundColor: "#f73365" },
                          mt: 5,
                        }}
                        variant="contained"
                        size="large"
                        type="submit"
                      >
                        Place Order{" "}
                        <ArrowForwardIcon sx={{ fontSize: "24px" }} />
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
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

export default Checkout;
