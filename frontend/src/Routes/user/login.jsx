import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  InputLabel,
  Container,
  OutlinedInput,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { profile, signin } from "../../Services/user";
import { setAuthenticate, setTokenNId, setUserData } from "../../Data/userData";
import { getError, setError } from "../../Data/error";
import { Error } from "../../Components/error";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "4em 2em",
    textAlign: "center",
  },
  textField: {
    width: "250px",
    margin: "5px",
  },
  error: {
    color: "red",
    fontStyle: "oblique",
  },
}));

export const Login = () => {
  // setError({
  //   code: "",
  //   message: "",
  // });
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState({
    userName: "",
    password: "",
    showPassword: false,
    usernameError: false,
    passwordError: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
      usernameError: false,
      passwordError: false,
    });
  };

  const showPassword = () => {
    setValues({ ...values, showPassword: true });
  };

  const hidePassword = () => {
    setValues({ ...values, showPassword: false });
  };

  const submit = async () => {
    console.log(values.userName);
    if (values.userName === "") {
      setValues({ ...values, usernameError: true });
    } else if (values.password === "") {
      setValues({ ...values, passwordError: true });
    } else {
      setAuthenticate();
      // const resp = ;
      if (setTokenNId(await signin())) {

        history.push("/");

        setUserData(await profile());
      }
    }
  };

  return (
    <Container className={classes.container}>
      <h1>Login</h1>
      <form>
        <TextField
          className={classes.textField}
          label={"Username"}
          onChange={handleChange("userName")}
          variant="outlined"
          error={values.usernameError}
          required
        />
        <br /><br />
        <FormControl variant="outlined" className={classes.textField} required>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            label="Password"
            error={values.passwordError}
            type={values.showPassword ? "text" : "password"}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onMouseOver={showPassword}
                  onMouseLeave={hidePassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br /><br /><br />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={submit}
        >
          Sign-in
        </Button> <br /><br /><br /><br />
        <div>Create an account  <NavLink to="/signup">Signup</NavLink></div>
      </form>
      <br />
      {values.usernameError && (
        <div className={classes.error}>Username required</div>
      )}
      {values.passwordError && (
        <div className={classes.error}>Password required</div>
      )}
      {getError().code !== "" ? <Error /> : <div></div>}
    </Container>
  );
};