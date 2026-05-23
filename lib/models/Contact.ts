import mongoose, { Schema, model, models } from "mongoose";
const ContactSchema = new Schema({ name: String, email: String, message: String }, { timestamps: true });
export const Contact = models.Contact || model("Contact", ContactSchema);
