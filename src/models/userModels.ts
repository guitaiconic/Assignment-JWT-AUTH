import mongoose, { Schema, Document } from "mongoose";

export interface Iuser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  isAdmin?: boolean;
}

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<Iuser>("user", userSchema);
