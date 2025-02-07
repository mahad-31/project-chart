import { NamedOperation } from "./../../node_modules/sift/lib/core.d";
import { Schema, model } from "mongoose";

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
