module.exports = () => {
    return (req, res, next) => {
      const user = req.user; // Assuming the user is attached to `req.user` after authentication.
  
      // Check if the user is an admin
      if (user.isAdmin) {
        next();
      } else {
        if (req.method === 'GET') {
          next(); 
        } else {
          return res.status(403).json({ message: "You do not have permission to perform this action." });
        }
      }
    };
  };
  