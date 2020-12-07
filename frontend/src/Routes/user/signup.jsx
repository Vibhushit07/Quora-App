import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";

import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { signup } from "../../Services/user";
import { getError, setError } from "../../Data/error";
import { Error } from "../../Components/error";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  textfield: {
    width: "250px",
  },
  error: {
    color: "red",
    fontStyle: "oblique",
  },
}));

export const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
    password: "",
    dob: "",
    contactNumber: "",
    showPassword: false,
    usernameError: false,
    passwordError: false,
    emailAddressError: false,
    firstNameError: false,
  });

  const handleChange = (prop) => (event) =>
    setValues({
      ...values,
      [prop]: event.target.value,
      usernameError: false,
      passwordError: false,
      emailAddressError: false,
      firstNameError: false,
    });

  const showPassword = () => setValues({ ...values, showPassword: true });

  const hidePassword = () => setValues({ ...values, showPassword: false });

  const submit = () => {
    if (values.firstName === "") {
      setValues({ ...values, firstNameError: true });
    } else if (values.userName === "") {
      setValues({ ...values, usernameError: true });
    } else if (values.emailAddress === "") {
      setValues({ ...values, emailAddressError: true });
    } else if (values.password === "") {
      setValues({ ...values, passwordError: true });
    } else {
      const response = signup(values);
      if (response.code !== undefined) {
        setError(response);
      } else {
        history.push("/");
      }
    }
  };

  return (
    <div className={classes.container}>
      <br />
      <h1>Create Account</h1>
      <form>
        <TextField
          className={classes.textfield}
          label="First Name"
          variant="outlined"
          size="small"
          onChange={handleChange("firstName")}
          required
        />
        <br /> <br />
        <TextField
          className={classes.textfield}
          label="Last Name"
          variant="outlined"
          size="small"
          onChange={handleChange("lastName")}
        />
        <br /> <br />
        <TextField
          className={classes.textfield}
          label="Username"
          variant="outlined"
          size="small"
          onChange={handleChange("userName")}
          required
        />
        <br /> <br />
        <TextField
          className={classes.textfield}
          label="Email"
          type="email"
          variant="outlined"
          size="small"
          onChange={handleChange("emailAddress")}
          required
        />
        <br /> <br />
        <FormControl
          variant="outlined"
          size="small"
          className={classes.textfield}
          required
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            label="Password"
            type={values.showPassword ? "text" : "password"}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibilty"
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
        <TextField
          className={classes.textfield}
          label="Date of Birth"
          type="date"
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange("dob")}
        />
        <br /> <br />
        <TextField
          className={classes.textfield}
          label="Contact Number"
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange("contactNumber")}
        />
        <br /> <br />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={submit}
        >
          Signup
        </Button>
        <br /> <br />
        <div>
          <i>Already have an account </i>{" "}
          <NavLink to="/login">
            <b>Login</b>
          </NavLink>
        </div>
      </form>
      {values.firstNameError && (
        <div className={classes.error}>First name required</div>
      )}
      {values.usernameError && (
        <div className={classes.error}>Username required</div>
      )}
      {values.emailAddressError && (
        <div className={classes.error}>Email address required</div>
      )}
      {values.passwordError && (
        <div className={classes.error}>Password required</div>
      )}
      {getError().code !== "" ? <Error /> : <div></div>}
    </div>
  );
};
