export interface EmployeePosition {
  id: number;
  status: string;
  number: number;
  employeeId: number;
  positionId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeePositionCreate
  extends Omit<EmployeePosition, 'createdAt' | 'updatedAt' | 'id'> {}
