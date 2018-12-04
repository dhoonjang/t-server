import mongoose from "mongoose";

export const Person = mongoose.model("person",
  {
    id: Number,
    gender: String,
    place: String,
    match: Boolean
  }
);

export const Couple = mongoose.model("couple",
  {
    id: Number,
    male_id: Number,
    female_id: Number,
    place: String,
    state: String
  }
);
