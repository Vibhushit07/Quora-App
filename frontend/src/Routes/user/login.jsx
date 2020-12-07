import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
import { setQuestions, setUserQuestion } from "../../Data/questions";
import { getAllQuestions, getUserQuestions } from "../../Services/question";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "4em 2em",
    textAlign: "center",
  },
  textField: {
    width: "250px",
  },
}));

export const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState({
    userName: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const showPassword = () => {
    setValues({ ...values, showPassword: true });
  };

  const hidePassword = () => {
    setValues({ ...values, showPassword: false });
  };

  const submit = async () => {
    const user = {
      username: values.userName,
      password: values.password,
    };

    window.localStorage.setItem("QA-App", JSON.stringify(user));

    setAuthenticate();
    setTokenNId(await signin());
    setQuestions(await getAllQuestions());

    history.push("/");

    setUserData(await profile());
    setUserQuestion(await getUserQuestions());
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
          required
        />
        <br /> <br />
        <FormControl variant="outlined" className={classes.textField} required>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            label="Password"
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
        <br /> <br />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={submit}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};
