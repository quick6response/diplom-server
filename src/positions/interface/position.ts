export interface Position {
  id: number;
  code: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PositionCreate {
  code: string;
  name: string;
  description: string;
}
