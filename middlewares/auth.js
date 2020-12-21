const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.headers.authorization, "d9eb703f978a5087a3cd6efb01220790");
        res.locals.userId = decodedToken.userId;
        res.locals.role = decodedToken.role;
            next();
    } catch {
        res.status(401).json({
            error: new Error("Requete invalide !"),
        });
    }
};
