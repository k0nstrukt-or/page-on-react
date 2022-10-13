import { User } from "./User";

export interface UsersPagination {
  total_users: number,
  users: User[],
}