export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  login: string;
  numberPhone: string;
  passportSerial: number;
  passportNumber: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeCreate
  extends Omit<Employee, 'createdAt' | 'updatedAt' | 'id'> {}
