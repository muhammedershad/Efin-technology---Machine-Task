const errorHandling = (err, req, res, next) => {
    console.error(err); 
    return res.status(err.status || 500).json({
        success: false,
        statusCode: err.status || 500,
        message: err.message || "Internal server error",
    });
};

module.exports = errorHandling;

