export interface Student {
  id: number;
  name: string;
  email: string;
  cpf: string;
}

export interface StudentsQueryData {
  students: Student[];
}
