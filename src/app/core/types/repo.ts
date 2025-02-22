import { User } from './user';

export interface Repo {
  id: number;
  html_url: string;
  name: string;
  owner: User;
}
