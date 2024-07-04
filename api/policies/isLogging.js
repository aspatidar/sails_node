module.exports = async (req, res, proceed) => {
  if (req) {
    sails.log.info('API request ->', req.originalUrl, ' received at -> ', + Date.now());
    proceed();
  }
};
