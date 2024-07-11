function authProductMiddleware(req, res, next) {
  if (!req.cookies.token) {
    res.redirect("/login");
    return;
  }
  next();
}

function authMiddleware(req, res, next) {
  if (req.cookies.token) {
    res.redirect("/");
    return;
  }
  next();
}

export { authProductMiddleware, authMiddleware };
