interface UserStore {
  userType: number;
  id: string;
  name: string;
}

export type UserStoresResponse = UserStore[];
