import { findMate } from './queries';
import { addPerson, addCouple, changeMatch } from './mutations';

const resolvers = {
  Query: {
    findMate: (_, {gender, place}) => findMate(gender, place)
  },
  Mutation: {
    addPerson: (_, {gender, place}) => addPerson(gender, place),
    addCouple: (_, {male_id, female_id, place}) => addCouple(male_id, female_id, place),
    changeMatch: (_, {male_id, female_id}) => changeMatch(male_id, female_id)
  }
};

export default resolvers
