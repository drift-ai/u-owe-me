'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RowData {
  id: number;
  name: string;
  email: string;
  details: string;
}

const dummyData: RowData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', details: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', details: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
];

export default function Home() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <table className="w-full max-w-2xl border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((row) => (
            <>
              <tr key={row.id} className="border-b border-gray-300">
                <td className="border border-gray-300 p-2">{row.name}</td>
                <td className="border border-gray-300 p-2">{row.email}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => toggleRow(row.id)}
                    className="text-blue-500 hover:underline"
                  >
                    {expandedRows.includes(row.id) ? 'Hide' : 'Show'} Details
                  </button>
                </td>
              </tr>
              {expandedRows.includes(row.id) && (
                <tr>
                  <td colSpan={3} className="border border-gray-300 p-2 bg-gray-50">
                    <p>{row.details}</p>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
      <Link href="/login" className="text-blue-500 hover:underline">
        Go to Login
      </Link>
    </div>
  );
}