import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from '@mui/material/Alert';
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
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
  },
});

const backend_route =`/api/login/`;

const defaultValues = {
  username: "",
  password: "",
};

function Login() {
  const [urlSearchParams] = useSearchParams();
  const [formValues, setFormValues] = useState(defaultValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [response, setResponse] = useState({});

  useEffect(() => {
    const qsError = urlSearchParams.get("error");
    if (qsError === "protected")
      setErrorMessage(
        <Alert severity="error">Please log in to view our pages.</Alert>
      );
  }, []);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await axios.post(backend_route, formValues);
      setErrorMessage("");
      setResponse(response.data);
    } catch (err) {
      setErrorMessage(
        <Alert severity="error">{`${err.response.data.message}`}</Alert>
      );
    }
  };

  if (!response.success) {
    return (
      <div className="login-Container">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                mt: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <h1>login</h1>
  
              {errorMessage}
  
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  onChange={handleInputChange}
                />
  
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  onChange={handleInputChange}
                />
  
                <button type="submit">log in</button>
  
                <Grid container>
                  <Grid item xs={9}></Grid>
                  <Grid item>
                    <Link href="/register" color="#225095" variant="body2">
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
  } else return <Navigate to="/" />;
}

export default Login;
