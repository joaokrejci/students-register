import { getRepository, ILike, Repository } from "typeorm";
import { StudentInput } from "../apollo/types/Student";
import { Student } from "../data/entities/Student";

class StudentService {
  private static safeGetRepository(): Repository<Student> {
    try {
      return getRepository(Student);
    } catch (error) {
      console.error("Unable to get repository for Student");
      throw error;
    }
  }

  static async findOne(id: number): Promise<Student | undefined | null> {
    return this.safeGetRepository().findOne(id);
  }
  static async find(search?: string): Promise<Student[] | undefined | null> {
    if (!search) {
      return this.safeGetRepository().find();
    }

    return this.safeGetRepository().find({
      where: [
        { name: ILike(`%${search}%`) },
        { cpf: ILike(`%${search}%`) },
        { email: ILike(`%${search}%`) },
      ],
    });
  }
  static async save({ id, ...student }: StudentInput) : Promise<Student | undefined | null> {
    if (id) {
      let studentEntity = await this.findOne(id);
      if (!!studentEntity && !!studentEntity.id) {
        Object.assign(studentEntity, student);
        return this.safeGetRepository().save(studentEntity);
      }
    }

    return this.safeGetRepository().save(student);
  }
  static async delete(id: number): Promise<number> {
    this.safeGetRepository().delete(id)
    return id
  }
}

export default StudentService;
