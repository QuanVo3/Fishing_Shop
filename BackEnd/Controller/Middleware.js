const jwt = require("jsonwebtoken");
const middleware = {
  //ACCESS TOKEN

  accessTokenAdmin: (req, res, next) => {
    // GET FULL TOKEN STRING FROM THE REQUEST HEADERS

    const accessToken = req.headers.token;

    if (accessToken) {
      // GET ONLY THE TOKEN VALUE (STRIP OFF "BEARER " PREFIX IF IT EXISTS)
      const token = accessToken.split(" ")[1];
      console.log(token);

      // VERIFY AND DECODE THE TOKEN

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          // IF THE TOKEN IS INVALID, RETURN A 403 FORBIDDEN ERROR

          return res.status(403).json("Token is not valid!");
        } else {
          // IF THE TOKEN IS VALID, STORE THE DECODED USER OBJECT IN THE REQUEST

          req.user = user;

          // CHECK IF THE USER IS AN ADMIN

          if (req.user.isAdmin) {
            // IF THE USER IS AN ADMIN, CALL NEXT() TO PASS CONTROL TO THE NEXT MIDDLEWARE

            return next();
          } else {
            // IF THE USER IS NOT AN ADMIN, RETURN A 403 FORBIDDEN ERROR

            return res
              .status(403)
              .json("You are not authorized to perform this action!");
          }
        }
      });
    } else {
      // IF NO ACCESS TOKEN WAS PROVIDED, RETURN A 401 UNAUTHORIZED ERROR

      return res.status(401).json("You are not authenticated!");
    }
  },

  accessTokenUser: (req, res, next) => {
    // GET FULL TOKEN STRING FROM THE REQUEST HEADERS

    const accessToken = req.headers.token;

    if (accessToken) {
      // GET ONLY THE TOKEN VALUE (STRIP OFF "BEARER " PREFIX IF IT EXISTS)
      const token = accessToken.split(" ")[1];
      console.log(token);

      // VERIFY AND DECODE THE TOKEN

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          // IF THE TOKEN IS INVALID, RETURN A 403 FORBIDDEN ERROR

          return res.status(403).json("Token is not valid!");
        }
        // ELSE CONTINUE
        req.user = user;
        return next();
      });
    } else {
      // IF NO ACCESS TOKEN WAS PROVIDED, RETURN A 401 UNAUTHORIZED ERROR

      return res.status(401).json("You are not authenticated!");
    }
  },
};
module.exports = middleware;
