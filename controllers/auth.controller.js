const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      fullname: "",
      street: "",
      postal: "",
      city: "",
    };
  }


  res.render("customer/auth/signup", {inputData: sessionData});;
}

async function signup(req, res, next) {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };


  const user = new User(userData);
  

  if (
    !validation.userDetailsAreValid(user) ||
    !validation.emailIsConfirmed(user, req.body["confirm-email"]) ||
    !validation.passwordIsConfirmed(user, req.body.confirmPassword)
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Please check your input. Make sure your email is correct and your password is at least 6 characters long.",
          confirmPassword: req.body.confirmPassword,
          confirmEmail: req.body["confirm-email"],
        ...userData,
      },
      () => {
        res.redirect("/signup");
      }
    );
    return;
  }

  try {
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "This email is already in use.",
          confirmPassword: req.body.confirmPassword,
          confirmEmail: req.body["confirm-email"],
          ...userData,
        },
        () => {
          res.redirect("/signup");
        }
      );
      return;
    }
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }

  res.render("customer/auth/login", {inputData: sessionData});
}

async function login(req, res, next) {
  const user = new User({email: req.body.email, password: req.body.password});
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }


  const sessionErrorData = {
    errorMessage: "Invalid email or password.",
    email: user.email,
    password: user.password,
  };

  if (!existingUser) {
    sessionFlash.flashDataToSession(
      req,
      sessionErrorData,
      () => {
        res.redirect("/login");
      }
    );
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(
      req,
      sessionErrorData,
      () => {
        res.redirect("/login");
      }
    );
    return;
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserSession(req);
  res.redirect("/");
}

module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
  logout,
};
