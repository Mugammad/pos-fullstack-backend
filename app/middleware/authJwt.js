//MUGAMMAD BREDA WROTE THIS CODE....WELL....MOST OF IT

const jwt = require("jsonwebtoken");

// function checks jwt token
verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    req.decoded = decoded
    next();
  });
};

module.exports = verifyToken;