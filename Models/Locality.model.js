const mongoose = require("mongoose");

const localitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
  },
  { timestamps: true }
);

const Locality = mongoose.model("Locality", localitySchema);

module.exports = Locality;
