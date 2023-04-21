import React from "react";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Body from "../fonts/Regular.otf";
import "../css/index.css";
import "../css/login.css";

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

function Login() {
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

            <Box component="form" sx={{ mt: 1, fontFamily: "Body" }}>
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
                  <Link
                    href="/register"
                    color="#225095"
                    variant="body2"
                    sx={{ fontFamily: "Body" }}>
                    register
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Login;
