import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Input from "../components/Input";
import Text from "../components/Text";
import "./StudentForm.style.scss";

interface StudentInput {
  name: string;
  email: string;
  cpf: string;
}

const REGISTER_STUDENT_MUTATION = gql`
  mutation saveStudent($student: StudentInput!) {
    saveStudent(student: $student) {
      id
    }
  }
`;

interface StudentFormProps {
  defaultValues?: { [key: string]: any };
}

function StudentForm({ defaultValues = {} }: StudentFormProps) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<StudentInput>();

  const [saveStudent] = useMutation(REGISTER_STUDENT_MUTATION);

  function onSubmit(student: StudentInput) {
    saveStudent({
      variables: {
        student: {
          ...(defaultValues.id ? { id: defaultValues.id } : {}),
          ...student,
        },
      },
    })
      .then(({ data }) => navigate("/student/" + data?.saveStudent?.id))
      .catch(console.error);
  }

  return (
    <div className="StudentForm">
      <header>
        <BackButton to="/" />
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text variant="title" size="large">
          Aluno
        </Text>
        <Input
          required
          label="Nome"
          defaultValue={defaultValues["name"]}
          {...register("name")}
        />
        <Input
          required
          label="Email"
          defaultValue={defaultValues["email"]}
          type="email"
          {...register("email")}
        />
        <Input
          required
          label="CPF"
          defaultValue={defaultValues["cpf"]}
          mask="000.000.000-00"
          {...register("cpf")}
        />
        <Button label="Salvar" type="submit" />
      </form>
    </div>
  );
}

const STUDENT_QUERY = gql`
  query student($id: ID!) {
    student(id: $id) {
      id
      name
      email
      cpf
    }
  }
`;

export default function StudentFormContainer() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(STUDENT_QUERY, {
    variables: { id },
  });

  if (!id) return <StudentForm />;

  return (
    <>{!loading && !error && <StudentForm defaultValues={data.student} />}</>
  );
}
