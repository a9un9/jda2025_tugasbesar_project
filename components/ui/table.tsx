import * as React from 'react';

export const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-auto border rounded-md">
    <table className="w-full text-sm text-left" {...props}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-100 text-gray-700">{children}</thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="bg-white divide-y">{children}</tbody>
);

export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="hover:bg-gray-50">{children}</tr>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-2 text-left font-medium">{children}</th>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="px-4 py-2">{children}</td>
);
