import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { api } from "../Config/Config";
import { useParams} from "react-router-dom";

const defaultTheme = createTheme();

function Verify() {
  const { email } = useParams();
  const [response, Setresponse] = useState("");
  const [image, setimage] = useState(
    "https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png"
  );
  const [alt, setalt] = useState("");

  const getdata = async () => {
    try {
      const data = await axios.put(`${api}/users/verify`, { email });
      Setresponse(data.data.message);
      setalt("Success");
    } catch (error) {
      setalt("Error");
      Setresponse(error.response.data.message);
      setimage(
        "https://picsofweb.s3.ap-south-1.amazonaws.com/close-icon-13607.jpg"
      );
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Account Activation
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={image}
              width="100"
              height="100"
              loading="lazy"
              style={{ marginTop: "10px", marginBottom: "10px" }}
              alt={alt}
            />
            <Typography>{response}</Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Verify;
