import { DateTimeScalar } from "graphql-date-scalars";
import StudentService from "../service/StudentService";
import {
  DeleteStudentMutationParams,
  SaveStudentMutationParams,
  StudentQueryParams,
  StudentsQueryParams,
} from "./types/Student";

export default {
  Date: DateTimeScalar,
  Query: {
    students: async function (_: undefined, { search }: StudentsQueryParams) {
      return await StudentService.find(search);
    },
    student: async function (_: undefined, { id }: StudentQueryParams) {
      return await StudentService.findOne(id);
    },
  },
  Mutation: {
    saveStudent: async function (
      _: undefined,
      { student }: SaveStudentMutationParams
    ) {
      return await StudentService.save(student);
    },
    deleteStudent: async function (
      _: undefined,
      { id }: DeleteStudentMutationParams
    ) {
      return await StudentService.delete(id);
    },
  },
};
