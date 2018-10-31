import mongoose from "mongoose";

const Test = mongoose.model("test",
  {
    id: Number,
    name: String
  });

const Person = mongoose.model("person",
  {
    id: Number,
    gender: String,
    place: String
  });

export const getTests = async () => {
  return await Test.find()
};

export const addPerson = async (gender, place) => {
  let people = await Person.find();

  return await new Person({
    id: people.length,
    gender: gender,
    place: place
  }).save()
}
