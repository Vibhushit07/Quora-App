import React from "react";
import { useHistory, NavLink } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { getHeader, resetHeader, getUserData } from "../../Data/userData";
import { signout } from "../../Services/user";
import { getError, setError } from "../../Data/error";
import { Error } from "../error";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    color: "white",
    textDecoration: "none",
    fontSize: "25px",
  },
  button: {
    color: "#ffffff",
    backgroundColor: "#000000",
  },
  name: {
    textAlign: "center",
    marginLeft: "15vw",
    fontSize: "22px",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setError({
      code: "",
      message: "",
    });
    setAnchorEl(null);
  };

  const handleSignout = async () => {
    const response = await signout();
    handleMenuClose();

    if (response.code !== undefined) {
      setError(response);
    } else {
      resetHeader();
      history.push("/user/login");
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {getHeader().authorization === "" ? (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <NavLink to="/user/signup">Signup</NavLink>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <NavLink to="/user/login">Login</NavLink>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <NavLink to="/user/profile">Profile</NavLink>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <NavLink to="/user/question">My Questions</NavLink>
          </MenuItem>
          <MenuItem onClick={handleSignout}>Signout</MenuItem>
          {getError().code !== "" ? <Error /> : <div />}
        </div>
      )}
    </Menu>
  );

  const submit = () => {
    history.push("/question/post");
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            <NavLink to="/" className={classes.title}>
              QA App
            </NavLink>
          </Typography>

          <div className={classes.name}>
            {getUserData().first_name
              ? `Welcome ${getUserData().first_name}`
              : ""}
          </div>
          <div className={classes.grow} />
          <Button
            variant="contained"
            className={classes.button}
            disableElevation
            onClick={submit}
          >
            Ask Question
          </Button>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};
