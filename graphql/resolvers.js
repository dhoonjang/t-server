import { getTests, addPerson } from './db'

const resolvers = {
  Query: {
    tests: () => getTests()
  },
  Mutation: {
    addPerson: (_, {gender, place}) => addPerson(gender, place)
  }
};

export default resolvers
