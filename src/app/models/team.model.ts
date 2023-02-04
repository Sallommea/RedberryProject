import { NumberValueAccessor } from '@angular/forms';

export interface User {
  id: number;
  name: string;
}

export interface Response {
  data: User[];
}

export interface Position {
  id: number;
  name: string;
  team_id: number;
}
export interface ResponsePos {
  data: Position[];
}

export interface Brands {
  id: number;
  name: string;
}
export interface ResponseBrands {
  data: Brands[];
}

export interface CPUs {
  id: number;
  name: string;
}
export interface ResponseCPUs {
  data: CPUs[];
}
