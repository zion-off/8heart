import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MUILink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../css/index.css";
import "../css/login.css";
import { useCookies } from 'react-cookie';

const theme = createTheme({
  palette: {
    primary: {
      main: "#81b29a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#81b29a",
      contrastText: "#fff",
    },
  },
});

const Signup = (props) => {
  let [urlSearchParams] = useSearchParams();
  const [response, setResponse] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookie] = useCookies(['nameCookie']);

  useEffect(() => {
    // if the user is logged-in, save the token to local storage
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.username}`);
      localStorage.setItem("token", response.token); // store the token into localStorage
    }
  }, [response]);

  const handleSubmit = async (e) => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();
    try {
      setCookie("nameCookie", e.target.username.value, { path: "/" });
      // create an object with the data we want to send to the server
      const requestData = {
        username: e.target.username.value, // gets the value of the field in the submitted form with name='username'
        password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
      };
      // send a POST request with the data to the server api to authenticate
      const response = await axios.post(
        `https://8heart.zzzzion.com/back-end/auth/register`,
        requestData
      );
      // store the response data into s the data state variable
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
      setResponse(response.data);
    } catch (err) {
      // request failed... user entered invalid credentials
      setErrorMessage(
        "The username or password you entered are not valid.  Try harder! "
      );
    }
  };

  if (!response.success) {
    return (
      <div className="signup-container">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                mt: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <h1>register</h1>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                />

                <button type="submit" >
                  register
                </button>

                <Grid container>
                  <Grid item xs={9}></Grid>
                  <Grid item>
                    <MUILink href="/login" color="#225095" variant="body2">
                      login
                    </MUILink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    );
  } else return <Navigate to="/signupmessage" />;
};

export default Signup;
