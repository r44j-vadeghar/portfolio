// src/components/sanity/portable-table.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PortableTableProps {
  value: {
    csvData?: string;
    hasHeader?: boolean;
  };
}

export default function PortableTable({ value }: PortableTableProps) {
  const { csvData, hasHeader = true } = value;

  if (!csvData || !csvData.trim()) {
    return null;
  }

  // Parse CSV data
  const rows = csvData
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(",").map((cell) => cell.trim()));

  if (rows.length === 0) {
    return null;
  }

  // Extract header and body rows based on hasHeader flag
  const headerRows = hasHeader ? rows.slice(0, 1) : [];
  const bodyRows = hasHeader ? rows.slice(1) : rows;

  return (
    <Table className="my-6 w-full overflow-auto rounded-lg border border-border shadow-sm">
      {hasHeader && headerRows.length > 0 && (
        <TableHeader className="bg-accent w-full">
          <TableRow className="border-b border-border hover:bg-transparent">
            {headerRows[0].map((cell, cellIndex) => (
              <TableHead
                key={cellIndex}
                className="py-3 px-4 text-primary-foreground font-medium text-left"
              >
                {cell}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody className="w-full">
        {bodyRows.map((cells, rowIndex) => (
          <TableRow
            key={rowIndex}
            className={`
                border-b border-border last:border-0 
                ${rowIndex % 2 === 0 ? "bg-muted/30" : ""}
                hover:bg-muted/50 transition-colors
              `}
          >
            {cells.map((cell, cellIndex) => (
              <TableCell key={cellIndex} className="py-3 px-4">
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
