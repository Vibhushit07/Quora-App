import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  textfield: {
    width: "250px",
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
    aboutMe: "",
    country: "",
    dob: "",
    contactNumber: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) =>
    setValues({ ...values, [prop]: event.target.value });

  const showPassword = () => setValues({ ...values, showPassword: true });

  const hidePassword = () => setValues({ ...values, showPassword: false });

  const submit = () => {
    const response = signup(values);
    if (response.code !== undefined) {
      alert(`Code: ${response.code}\nMessage: ${response.message}`);
    } else {
      history.push("/");
    }
  };

  return (
    <div className={classes.container}>
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
          label="About"
          variant="outlined"
          size="small"
          onChange={handleChange("aboutMe")}
        />
        <br /> <br />
        <TextField
          className={classes.textfield}
          label="Country"
          variant="outlined"
          size="small"
          onChange={handleChange("country")}
        />
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
          type="number"
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
      </form>
    </div>
  );
};
