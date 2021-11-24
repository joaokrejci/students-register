export interface StudentsQueryParams {
  search: string;
}

export interface StudentQueryParams {
  id: number;
}


export interface StudentInput {
  id?: number;
  name: string;
  cpf: string;
  email: string;
}

export interface SaveStudentMutationParams {
  student: StudentInput;
}

export interface DeleteStudentMutationParams {
  id: number;
}