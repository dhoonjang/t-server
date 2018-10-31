import { getTests, addPerson, findPerson } from './db'

const resolvers = {
  Query: {
    tests: () => getTests(),
    findPerson: (_, {gender, place}) => findPerson(gender, place)
  },
  Mutation: {
    addPerson: (_, {gender, place}) => addPerson(gender, place)
  }
};

export default resolvers
