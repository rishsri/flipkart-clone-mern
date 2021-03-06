import React, { useState} from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { authenticateSignup, authenticateLogin } from "../../service/api";

const useStyle = makeStyles({
  component: {
    height: "83vh",
    width: "100vh",
    maxWidth: "unset !important",
  },
  image: {
    backgroundImage: `url(${"https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"})`,
    background: "#2874f0",
    backgroundPosition: "center 85%",
    backgroundRepeat: "no-repeat",
    height: "83vh",
    width: "40%",
    padding: "45px 35px",
    "& > *": {
      color: "#FFFFFF",
      fontWeight: 600,
    },
  },
  login: {
    padding: "25px 35px",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    "& > *": {
      marginTop: 20,
    },
  },
  loginbtn: {
    textTransform: "none",
    background: "#FB641B",
    color: "#fff",
    height: 48,
    borderRadius: 2,
    "&:hover": {
      backgroundColor: "#FB641B",
      color: "#fff",
    },
  },
  requestbtn: {
    textTransform: "none",
    background: "#fff",
    color: "#2874f0",
    height: 48,
    borderRadius: 2,
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#2874f0",
    },
  },
  text: {
    color: "#878787",
    fontSize: 12,
  },
  createText: {
    margin: "auto 0 5px 0",
    textAlign: "center",
    color: "#2874f0",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
  error: {
    fontSize: 10,
    color: "#ff6161",
    lineHeight: 0,
    marginTop: 10,
    fontWeight: 600,
  },
});

const initialValue = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: " Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here",
    subHeading: "Signup to get started",
  },
};

const LoginDialog = ({ open, setOpen, setAccount }) => {
  const classes = useStyle();

  const signupInitialValue = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  };

  const loginInitialvalue = {
    username: "",
    password: ""
  }

  const [account, toggleAccount] = useState(initialValue.login);
  const [signup, setSignup] = useState(signupInitialValue);
  const [login, setLogin] = useState(loginInitialvalue);
  const [error, setError] = useState(false);

  const toggleAccountFunction = () => {
    toggleAccount(initialValue.signup);
  };

  const toggleAccountLoginFunction = () => {
    toggleAccount(initialValue.login);
  };

  const handleClose = () => {
    setOpen(false);
    toggleAccount(initialValue.login);
  };

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });

  };

  const onValueChange = (e) => {
    setLogin({...login,[e.target.name]: e.target.value} )
  }

  const loginUser = async() => {
    let response = await authenticateLogin(login);
    if(!response) {
      setError(true);
      return;
    } 
    handleClose();
    
    setAccount(login.username)
  }
  // if we want to represent a key in a form of value then we use [] to represnt it

  const signupUser = async () => {
    let response = await authenticateSignup(signup);
    //if the user does not succesfully signup then we will throw a undefiend
    if (!response) return;
    handleClose();
    setAccount(signup.username)
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className={classes.component}>
        <Box style={{ display: "flex" }}>
          <Box className={classes.image}>
            <Typography variant="h5"> {account.heading} </Typography>
            <Typography style={{ marginTop: 20, color: "#D3D3D3" }}>
              {account.subHeading}
            </Typography>
          </Box>

          {account.view === "login" ? (
            <Box className={classes.login}>
              <TextField onChange = {(e) => onValueChange(e)} name="username" label="Enter Email/Mobile number" />
              <TextField onChange = {(e) => onValueChange(e)} name="password" label="Enter Password" />
              {error && <Typography className = {classes.error}>Invalid username and password </Typography> }
              <Typography className={classes.text}>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </Typography>
              <Button className={classes.loginbtn} onClick = {() => loginUser()}>Login</Button>
              <Typography
                className={classes.text}
                style={{ textAlign: "center" }}
              >
                OR
              </Typography>
              <Button className={classes.requestbtn}>Request OTP</Button>
              <Typography
                className={classes.createText}
                onClick={toggleAccountFunction}
              >
                New to Flipkart? Create an account
              </Typography>
            </Box>
          ) : (
            <Box className={classes.login}>
              <TextField
                onChange={(e) => handleChange(e)}
                name="firstname"
                label="Enter Firstname"
              />
              <TextField
                onChange={(e) => handleChange(e)}
                name="lastname"
                label="Enter Lastname"
              />
              <TextField
                onChange={(e) => handleChange(e)}
                name="username"
                label="Enter Username"
              />
              <TextField
                onChange={(e) => handleChange(e)}
                name="email"
                label="Enter Email"
              />
              <TextField
                onChange={(e) => handleChange(e)}
                name="password"
                label="Enter Password"
              />
              <TextField
                onChange={(e) => handleChange(e)}
                name="phone"
                label="Enter Phone"
              />
              <Button className={classes.loginbtn} onClick={() => signupUser()}>
                Signup
              </Button>
              <Button
                className={classes.requestbtn}
                onClick={toggleAccountLoginFunction}
              >
                Existing User? Log in{" "}
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
