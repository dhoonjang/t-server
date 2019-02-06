export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]\n  users: [User]\n  couple: Couple\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Couple {\n  id: Int!\n  status: String!\n  users: [User]\n  placeId: Int\n  place: Place\n  chatId: Int\n  chat: Chat\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chatId: Int!\n  chat: Chat!\n  userId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  star: Int!\n  address: String!\n  explanation: String\n  isTaken: Boolean!\n  couples: [Couple]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetMyProfile: GetMyProfileResponse!\n  getUser: User!\n}\n\ntype LogInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  LogIn(email: String!, password: String!): LogInResponse!\n  SignUp(name: String!, email: String!, password: String!, gender: String!): SignUpResponse!\n  UpdateMyProfile(name: String, email: String, password: String, gender: String, age: String): UpdateMyProfileResponse!\n}\n\ntype SignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  email: String!\n  name: String!\n  password: String!\n  gender: String!\n  age: Int\n  isVerified: Boolean!\n  isMatched: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n  chat: Chat\n  messages: [Message]\n  coupleId: Int\n  couple: Couple\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Verification {\n  id: Int!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetMyProfile: GetMyProfileResponse;
  getUser: User;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  gender: string;
  age: number | null;
  isVerified: boolean;
  isMatched: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
  chat: Chat | null;
  messages: Array<Message> | null;
  coupleId: number | null;
  couple: Couple | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  users: Array<User> | null;
  couple: Couple | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chatId: number;
  chat: Chat;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Couple {
  id: number;
  status: string;
  users: Array<User> | null;
  placeId: number | null;
  place: Place | null;
  chatId: number | null;
  chat: Chat | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  star: number;
  address: string;
  explanation: string | null;
  isTaken: boolean;
  couples: Array<Couple> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  LogIn: LogInResponse;
  SignUp: SignUpResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface LogInMutationArgs {
  email: string;
  password: string;
}

export interface SignUpMutationArgs {
  name: string;
  email: string;
  password: string;
  gender: string;
}

export interface UpdateMyProfileMutationArgs {
  name: string | null;
  email: string | null;
  password: string | null;
  gender: string | null;
  age: string | null;
}

export interface LogInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface SignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Verification {
  id: number;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}
