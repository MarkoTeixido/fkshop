const isLogged = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }

    return res.status(401).json({
        error: "Unauthorized",
        message: "Necesita iniciar sesión para poder ingresar a administración."
    });
};

module.exports = {
    isLogged
};