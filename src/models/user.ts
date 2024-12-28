import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  hash_password: string;
  role: string;
  contactNumber: string;
  profilePicture: string;
  authenticate: (password: string) => boolean;
  fullName: string;
}

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: function (password: any): boolean {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

const userModel = mongoose.model<User>("User", userSchema);
export default userModel;
