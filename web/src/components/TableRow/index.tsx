import { HTMLAttributes } from "react";

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  cells: { [key: string]: any };
}

export default function TableRow({ cells, ...props }: TableRowProps) {
  return (
    <tr {...props} className="TableRow">
      {Object.values(cells).map((value, key) => (
        <td key={key}>{value}</td>
      ))}
    </tr>
  );
}
