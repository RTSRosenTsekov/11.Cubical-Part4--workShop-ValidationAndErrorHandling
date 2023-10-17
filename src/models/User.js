const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User name is required!"],
    minLength: [3, "Username to short!"],
    match: [/^[A-Za-z0-9]+$/, "Username is not with english letters"],
    unique: {
      value: true,
      message: "Username already exists!",
    },
  },
  password: {
    type: String,
    minLength: [5, "Password is too short!"],
    validator: {
      validator: function (value) {
        return /^[A-Za-z0-9]+$/.test(value);
      },
      message: "User is not with english letters",
    },
  },
});

userSchema.path("username").validate(function (validate) {

  const user = mongoose.model('User').findOne({username});
  return !!user;
},'Username alredy exists!');

userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Password missmatch!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
