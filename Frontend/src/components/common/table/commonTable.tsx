import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

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
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow sm:rounded-lg">
            <Table striped={true} hoverable={true} className="min-w-full divide-y divide-WhiteMarble dark:divide-TranquilBlack relative">
              <TableHead className="bg-White dark:bg-TranquilBlack">
                {columns.map((col) => (
                  <TableHeadCell key={col.key}>{col.label}</TableHeadCell>
                ))}
              </TableHead>
              <TableBody className="bg-White dark:bg-Cosmos">
                {data?.length ? (
                  data.map((row, idx) => (
                    <TableRow key={idx}>
                      {columns.map((col) => (
                        <TableCell key={col.key} className="px-6 py-4 whitespace-nowrap text-base font-normal text-DarkBackground dark:text-White" > {col.render ? col.render(row) : row[col.key] ?? "-"} </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center p-4 text-SharkGray"> {emptyMessage} </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
    </div>
  );
};

export default CommonTable;
