import mongoose from "mongoose";
import { Person, Couple } from './models'

export const findMate = async (gender, place) => {
  if (gender == 'male'){
    return await Person.findOne({ $and:[{"gender" : "female" }, {"place" : place}, {"match": false}] });
  }
  else if (gender == 'female'){
    return await Person.findOne({ $and:[{"gender" : "male" }, {"place" : place}, {"match": false}] });
  }
}
