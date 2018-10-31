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
    gender,
    place
  }).save()
}

export const findPerson = async (gender, place) => {
  if (gender == 'male'){
    return await Person.findOne({ $and:[{"gender" : "female" }, {"place" : place}] });
  }
  else if (gender == 'female'){
    return await Person.findOne({ $and:[{"gender" : "male" }, {"place" : place}] });
  }
}
