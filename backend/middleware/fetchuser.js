var jwt = require('jsonwebtoken');
const JWT_SECRET = "my token number";

const fetchuser = (req, res, next) => {
  // Get fetch data from token    
  const token = req.header("auth-token") //  fetch tokean from header

  // if token are not exists then give error message
  if (!token) {
    res.status(401).send({ error: "Please enter vaild token" });
  }
  try {
    // verify user
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();

  } catch (error) {
    res.status(401).send({ error: "Please enter vaild token" });
  }

}

module.exports = fetchuser;