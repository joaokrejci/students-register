import "reflect-metadata";
import { Student } from "../data/entities/Student";
import StudentService from "./StudentService";

describe("Student service operations", () => {
  const newStudent = new Student();
  newStudent.name = "John Doe";
  newStudent.cpf = "123.456.789-10";
  newStudent.email = "johndoe@mail.com";

  it("Should create a student", async () => {
    const student = await StudentService.save(newStudent);
    expect(student).toBeTruthy();
    expect(student).toHaveProperty("id");
    expect(student).toHaveProperty("createdAt");
    expect(student).toHaveProperty("updatedAt");
    expect(student?.name).toEqual(newStudent.name);
    expect(student?.email).toEqual(newStudent.email);
    expect(student?.cpf).toEqual(newStudent.cpf);
  });

  it("Should update a previous created student", async () => {
    const student = await StudentService.save(newStudent);
    expect(student).toBeTruthy();
    const updatedStudent = {
      id: student?.id || 0,
      name: student?.name || "",
      email: student?.email || "",
      cpf: student?.cpf || "",
    };
    updatedStudent.name = "Jane Doe";

    const finalStudent = await StudentService.save(updatedStudent);
    expect(finalStudent?.id).toEqual(student?.id);
    expect(finalStudent?.name).toEqual("Jane Doe");
  });

  it("Should find based on id", async () => {
    const student = (await StudentService.save(newStudent)) || { id: -1 };
    expect(student).toHaveProperty("id");
    const foundStudent = await StudentService.findOne(student.id);
    expect(foundStudent).toBeTruthy();
    expect(foundStudent?.id).toEqual(student.id);
  });

  it("Should remove a student", async () => {
    const student = (await StudentService.save(newStudent)) || { id: -1 };
    expect(student).toHaveProperty("id");
    const id = await StudentService.delete(student.id);
    expect(id).toEqual(student.id);
    const foundStudent = await StudentService.findOne(id);
    expect(foundStudent).toBeFalsy();
  });

  it("Should find by search pattern", async () => {
    const anotherStudent = { ...newStudent };
    anotherStudent.name = "John Cena";
    await StudentService.save(newStudent);
    await StudentService.save(anotherStudent);

    const findResult = await StudentService.find("John")
    expect(findResult).toBeTruthy()
    expect(findResult?.length).toBeGreaterThan(2)
    expect(findResult?.find(({name}) => name === "John Cena")).toBeTruthy()
    expect(findResult?.find(({name}) => name === "John Doe")).toBeTruthy()
  });

  it("Should find all students with no search pattern", async () => {
    const findResult = await StudentService.find()
    expect(findResult).toBeTruthy()
    expect(findResult).toBeGreaterThan(2)
  })
});
