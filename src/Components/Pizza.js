import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addtoCart, removefromCart } from "../Slice/CartSlice";
import { useDispatch } from "react-redux";

function Pizza({ pizza }) {
  const [quantity, setquantity] = useState(1);
  const [varient, setvarient] = useState("small");
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  return (
    <>
      <Grid
        item
        sx={{ display: "flex", justifyContent: "center" }}
        xs={12}
        sm={4}
        md={4}
      >
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: "4",
            borderRadius: "16px",
            ":hover": { boxShadow: "15" },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="350"
              image={pizza.imageurl}
              alt="green iguana"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontFamily: "Poppins" }}
                component="div"
              >
                {pizza.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Variants
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={varient}
                      label="Variants"
                      onChange={(e) => {
                        setvarient(e.target.value);
                      }}
                    >
                      {pizza.varients.map((varients, index) => (
                        <MenuItem value={varients} key={index}>
                          {varients}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Quantity
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={quantity}
                      label="Quantity"
                      onChange={(e) => {
                        setquantity(e.target.value);
                      }}
                    >
                      {[...Array(10).keys()].map((values, index) => (
                        <MenuItem value={index + 1} key={index}>
                          {index + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </CardActions>
          <CardActions>
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box sx={{ minWidth: 120 }}>
                  <Typography fontFamily="Poppins" fontWeight="600">
                    Price : {pizza.prices[varient] * quantity} Rs
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box sx={{ minWidth: 120 }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      dispatch(addtoCart({ quantity, varient, pizza }));
                      setShow(false);
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}

export default Pizza;
