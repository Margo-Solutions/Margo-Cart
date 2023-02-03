module.exports = function(req, res, next) {
  const { email, navn, passord } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/margodatabase/register") {
    console.log(!email.length);
    if (![email, navn, passord].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/margodatabase/login") {
    if (![email, passord].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  }

  next();
};
