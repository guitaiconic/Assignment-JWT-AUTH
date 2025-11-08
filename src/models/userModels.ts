import mongoose, { Schema, Document } from "mongoose";

export interface Iuser extends Document {
  name: string;
  username: string;
  roles?: string;
  password: string;
  email: string;
}

const userSchema: Schema = new Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<Iuser>("user", userSchema);
