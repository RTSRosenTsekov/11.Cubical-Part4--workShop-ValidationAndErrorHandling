const { MongooseError } = require("mongoose");

exports.extractErrorMsg = (error) => {
  const isInstanceOfMongoose = error instanceof MongooseError;
 
  if (isInstanceOfMongoose) {
    const errors = Object.values(error.errors);
    const msgs = errors.map((e) => e.message);
    
    return msgs;
  }
  return [error.message];
};
