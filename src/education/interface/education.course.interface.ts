export interface EducationCourse {
  id: number;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EducationCourseCreate {
  code: string;
  name: string;
}
