import mongoose from "mongoose";
import { Person, Couple } from './models';

export const addPerson = async (gender, place) => {
  let people = await Person.find();

  return await new Person({
    id: people.length,
    gender,
    place,
    match: false
  }).save()
}

export const addCouple = async (male_id, female_id, place) => {
  let couples = await Couple.find();

  return await new Couple({
    id: couples.length,
    male_id,
    female_id,
    place,
    state: "notice"
  }).save()
}

export const changeMatch = async (male_id, female_id) => {
  let res = await Person.update(
    { $or: [{ "id" : male_id },{ "id": female_id }] },
    { "match": true },
    { multi: true }
  )
  return res.models
}
