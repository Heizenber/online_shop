function getSignup(req, res) {
  res.render("auth/signup");
}

function getLogin(req, res) {
  res.render("auth/signup");
}

module.exports = {
  getSignup,
  getLogin,
};
