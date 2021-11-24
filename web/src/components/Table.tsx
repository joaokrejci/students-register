import { PropsWithChildren, TableHTMLAttributes } from "react";
import Text from "./Text";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  headers?: string[];
}
export default function Table({
  headers,
  className,
  children,
  ...props
}: PropsWithChildren<TableProps>) {
  return (
    <table className={`Table ${className}`} {...props}>
      {headers && (
        <thead>
          <tr>
            {headers.map((header, index) => (
              <td key={index}>
                <Text variant="title">{header}</Text>
              </td>
            ))}
          </tr>
        </thead>
      )}
      <tbody>{children}</tbody>
    </table>
  );
}
