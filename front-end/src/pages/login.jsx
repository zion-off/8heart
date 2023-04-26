import React, { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MUILink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Body from "../fonts/Regular.otf";
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
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Body';
            font-style: normal;
            src: local('Raleway'), local('Raleway-Regular'), url(${Body}) format('opentype');
          }
        `,
      },
    },
  },
});

const Login = (props) => {

  const [cookies, setCookie] = useCookies(['nameCookie']);
  let [urlSearchParams] = useSearchParams();

  const [response, setResponse] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const qsError = urlSearchParams.get("error");
    if (qsError === "protected")
      setErrorMessage("Please log in to view our fabulous protected content.");
  }, []);
  useEffect(() => {
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.username}`);
      localStorage.setItem("token", response.token);
      setCookie("nameCookie", response.username, { path: "/" });
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        username: e.target.username.value,
        password: e.target.password.value,
      };
      
      const response = await axios.post(
        `https://8heart.zzzzion.com/back-end/auth/login`,
        requestData
      );

      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
      setResponse(response.data);
    } catch (err) {
      setErrorMessage(
        "You entered invalid credentials.  Try harder!  Check out the usernames in the server's user_data.js file."
      );
    }
  };

  if (!response.success) {
    return (
      <div className="login-container">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs" sx={{ fontFamily: "Body" }}>
            <Box
              sx={{
                mt: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "Body",
              }}>
              <h1>login</h1>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, fontFamily: "Body" }}>
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

                <button type="submit">log in</button>

                <Grid container>
                  <Grid item xs={9}></Grid>
                  <Grid item>
                    <MUILink
                      href="/register"
                      color="#225095"
                      variant="body2"
                      sx={{ fontFamily: "Body" }}>
                      register
                    </MUILink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    );
  } else return <Navigate to="/home" />;
};

export default Login;
