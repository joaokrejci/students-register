import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Student, StudentsQueryData } from "../apollo/types/Students";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import TableRow from "../components/TableRow";
import Text from "../components/Text";
import ViewportSelector from "../components/ViewportSelector";

import "./Students.style.scss";

const STUDENTS_QUERY = gql`
  query students($search: String) {
    students(search: $search) {
      id
      name
      cpf
      email
    }
  }
`;

export default function Students() {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");
  const [tableItems, setTableItems] = useState<Student[]>([]);
  const { loading, error, refetch } = useQuery<StudentsQueryData>(
    STUDENTS_QUERY,
    {
      variables: { search },
      onCompleted: function (data) {
        setTableItems(
          data.students.map(({ id, name, email, cpf }) => ({
            id,
            name,
            email,
            cpf,
          }))
        );
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  const STUDENTS_HEADERS = ["ID", "Nome", "Email", "CPF"];
  const LARGE_TABLE = (
    <Table className="LargeTable" headers={STUDENTS_HEADERS}>
      {tableItems.map((item, index) => (
        <TableRow
          onClick={() => navigate(`/student/${item.id}`)}
          key={index}
          cells={item}
        />
      ))}
    </Table>
  );
  const SMALL_TABLE = (
    <Table className="SmallTable">
      {tableItems.map(({ id, name, email, cpf }, index) => (
        <TableRow
          key={index}
          onClick={() => navigate(`/student/${id}`)}
          cells={{
            cell: (
              <>
                <Text variant="normal">
                  {id}. {name}
                </Text>
                <Text variant="caption" size="small">
                  {email}
                </Text>
                <Text variant="caption" size="small">
                  {cpf}
                </Text>
              </>
            ),
          }}
        />
      ))}
    </Table>
  );
  const LARGE_ADDBUTTON = (
    <Button
      onClick={() => navigate("/student-form")}
      label="Adicionar"
      icon={FaPlus}
    />
  );
  const SMALL_ADDBUTTON = (
    <Button
      onClick={() => navigate("/student-form")}
      className="SmallAddButton"
      variant="round"
      icon={FaPlus}
    />
  );

  if (error) {
    console.error(error);
  }

  return (
    <div className="Students">
      <Text variant="title" size="large">
        Alunos
      </Text>

      <Input
        placeholder="Procure pelo nome, email ou cpf"
        value={search}
        onChange={({ target: { value } }) => setSearch(value)}
      />
      <ViewportSelector larger={LARGE_ADDBUTTON} smaller={SMALL_ADDBUTTON} />

      {!loading && !error && (
        <div className="StudentsList">
          <ViewportSelector larger={LARGE_TABLE} smaller={SMALL_TABLE} />
        </div>
      )}
    </div>
  );
}
