module.exports = async (req, res, next) => {
  if (req) {
    sails.log('API calling', req.originalUrl);
    next();
  }
};
