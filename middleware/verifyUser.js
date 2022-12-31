export const verifyUser = (req, res, next) => {
    const {user} = req.session;
    if (!user) {
      return res.status(401).json("Unauthorized")
    }
    req.user = user;
    next();
}

