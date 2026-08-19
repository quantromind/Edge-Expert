import React from "react";

const TableView = ({ columns = [], data = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto border border-gray-100">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-indigo-50 text-indigo-700">
          <tr>
            {columns.map((c, i) => (
              <th key={i} className="px-4 py-3 text-left text-sm font-medium">{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-6 text-center text-gray-400">No records found</td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={row._id || idx} className="hover:bg-indigo-50">
                {columns.map((c, j) => (
                  <td key={j} className="px-4 py-3 text-sm text-gray-700">
                    {typeof c.accessor === "function" ? c.accessor(row) : row[c.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
