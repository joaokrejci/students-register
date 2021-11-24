import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Text from "../components/Text";
import "./StudentView.style.scss";

const STUDENT_QUERY = gql`
  query student($id: ID!) {
    student(id: $id) {
      id
      name
      email
      cpf
      createdAt
      updatedAt
    }
  }
`;

const DELETE_STUDENT_MUTATION = gql`
  mutation deleteStudent($id: ID!) {
    deleteStudent(id: $id)
  }
`;

export default function StudentView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);

  const { data, loading, error } = useQuery(STUDENT_QUERY, {
    variables: { id },
  });
  const [deleteStudent] = useMutation(DELETE_STUDENT_MUTATION);

  function handleDelete() {
    deleteStudent({ variables: { id } });
    navigate("/");
  }

  return (
    <div className="StudentView">
      {!loading && !error && (
        <>
          <header>
            <BackButton to="/" />
            <Text variant="caption" size="small">
              {data.student.updatedAt}
            </Text>
          </header>
          <main>
            <div className="StudentInformation">
              <Text variant="title" size={36}>
                {data.student.name}
              </Text>
              <Text variant="caption" size={18}>
                {data.student.email}
              </Text>
              <Text variant="caption" size={12}>
                {data.student.cpf}
              </Text>
            </div>
            <div className="StudentOperations">
              <Button
                onClick={() => setIsDeleting(true)}
                variant="round"
                label="Excluir"
                icon={FaTrashAlt}
              />
              <Button
                onClick={() => navigate("/student-form/" + data.student.id)}
                variant="round"
                label="Editar"
                icon={FaPen}
              />
            </div>

            {isDeleting && (
              <Modal
                onExit={() => {
                  setIsDeleting(false);
                }}
              >
                <Text variant="title">
                  Deseja excluir este aluno permanentemente?
                </Text>
                <div className="DeletingOptions">
                  <Button
                    onClick={() => setIsDeleting(false)}
                    variant="text"
                    label="Cancelar"
                  />
                  <Button
                    onClick={handleDelete}
                    variant="normal"
                    label="Excluir"
                  />
                </div>
              </Modal>
            )}
          </main>
        </>
      )}
    </div>
  );
}
