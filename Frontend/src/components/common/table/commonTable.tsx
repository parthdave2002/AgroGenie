import React from "react";
import { Table } from "flowbite-react";

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode; // Custom render for column
}

interface CommonTableProps {
  columns: Column[];
  data: any[];
  emptyMessage?: string;
}

const CommonTable: React.FC<CommonTableProps> = ({
  columns,
  data = [],
  emptyMessage = "No records found",
}) => {
  return (
    <div className="my-6 rounded-lg bg-White shadow dark:bg-Cosmos">
      <div className="flex flex-col overflow-x-auto rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow sm:rounded-lg">
            <Table striped className="min-w-full divide-y divide-WhiteMarble dark:divide-Hydrocarbon">
              <Table.Head className="bg-White dark:bg-TranquilBlack">
                {columns.map((col) => (
                  <Table.HeadCell key={col.key}>{col.label}</Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body className="bg-White dark:bg-Cosmos">
                {data?.length ? (
                  data.map((row, idx) => (
                    <Table.Row key={idx}>
                      {columns.map((col) => (
                        <Table.Cell key={col.key} className="px-6 py-4 whitespace-nowrap text-base font-normal text-DarkBackground dark:text-White py-0" > {col.render ? col.render(row) : row[col.key] ?? "-"} </Table.Cell>
                      ))}
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={columns.length} className="text-center p-4 text-SharkGray"> {emptyMessage} </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonTable;
