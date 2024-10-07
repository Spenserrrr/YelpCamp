// catch(next) is catch (e => next(e)) in short
// When you use .catch(next), you're passing the next function itself as the handler to the .catch method.
// This means that if the Promise returned by the async func is rejected, the error is automatically passed to the next function.

module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
