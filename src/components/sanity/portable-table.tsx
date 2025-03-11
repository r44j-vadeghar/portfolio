import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PortableTable({ value }: { value: any }) {
  const { rows } = value;

  if (!rows || rows.length === 0) {
    return null;
  }
  const hasHeader = rows.length > 1;

  return (
    <div className="my-6 w-full overflow-auto">
      <Table>
        {hasHeader && (
          <TableHeader>
            <TableRow>
              {rows[0].cells.map((cell: string, cellIndex: number) => (
                <TableHead key={cellIndex}>{cell}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {rows.slice(hasHeader ? 1 : 0).map((row: any, rowIndex: number) => (
            <TableRow key={rowIndex}>
              {row.cells.map((cell: string, cellIndex: number) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
