import mongoose from "mongoose";
import { optional } from "zod/v4";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    client_id: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      optional: true,
      trim: true,
    },
    call_type: {
      type: String,
      enum: ["Hot Call", "Cold Call", "Warm Call"],
      required: true,
      default: "Hot Call",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
      default: "Active",
    },
    schedule: {
      type: Date,
      required: true,
      default: Date.now, 
    },
    company_name: {
      type: String,
      required: true,
      trim: true,
    },
    industry_type: {
      type: String,
      required: true,
      trim: true,
    },
    remarks: {
      type: [String],
      default: [],
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    added_by: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
