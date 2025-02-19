const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred' });
    });
};

module.exports = asyncHandler;