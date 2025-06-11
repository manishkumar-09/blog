function authoriseAdmin(req, res, next) {
    if (req.user && req.user.userRole === "admin") {
      next();
    } else {
      res.status(403).json({
          success: false,
          message:"Your are not eligible for this! "
      });
    }
  }
  
  function isUserAuthorise(req, res, next) {
    if (req.user && req.userRole === "user") {
        //we can or operator "user"|| admin to check both are role
        next();
    } else {
        res.status(403).json({
            success: false,
            message:"You are not eligible for this!"
        })
    }
}
module.exports = {isUserAuthorise,authoriseAdmin}
 