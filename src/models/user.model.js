import mongoose from "mongoose";
import bycrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    staff_id: {
      type: String,
      unique: true,
      required: function () {
        return this.role === "staff";
      },
    },
    role: {
      type: String,
      enum: ["admin", "staff"],
      default: "staff",
    },
    password: {
      type: String,
      required: true,
    },
    added_by: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: function () {
          return this.role !== "admin";
        },
      },
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, role: 1 }, { unique: true });

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bycrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bycrypt.compare(password, this.password);
};

userSchema.pre("validate", function (next) {
  if (this.role === "staff" && (!this.added_by || !this.added_by.id)) {
    this.invalidate("added_by", "Staff must have an added_by.id");
  }
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    const hashed = await bycrypt.hash(update.password, 12);
    this.setUpdate({ ...update, password: hashed });
  }
  next();
});

export default mongoose.model("User", userSchema);
