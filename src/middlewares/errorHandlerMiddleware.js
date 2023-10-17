const { extractErrorMsg } = require("../utils/errorHandler");

module.exports = (err, req, res, nex) => {
  const errorMessages = extractErrorMsg(err);
console.log({errMsgMiddleware:errorMessages});
  res.render("404", { errorMessages });
};
