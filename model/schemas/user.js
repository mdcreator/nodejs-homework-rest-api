import mongoose from "mongoose";
const { Schema, model } = mongoose;
import { Subscription } from "../../helpers/constants.js";
import bcrypt from "bcryptjs";

const SALT_WORK_FACTOR = 8;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: [true, "Password required"],
    },
    subscription: {
      type: String,
      enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
      default: Subscription.FREE,
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt, null);
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

export default User;
