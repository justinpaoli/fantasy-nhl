export interface User {
  username: string,
  jwt: string,
}

export interface IUserContext {
  user: User
  updateUser: (user: User) => void
}