import React, { useMemo, useState } from "react";
import { UserPlus, Pencil, Trash2, Search } from "lucide-react";
import EmptyState from "./EmptyState";

const roleLabels = {
  broker: "Broker",
  customer: "Customer",
  developer: "Developer",
};

const UserTable = ({ role, users, onCreate, onEdit, onDelete }) => {
  const [query, setQuery] = useState("");
  const filteredUsers = useMemo(() => {
    if (!query.trim()) return users;
    return users.filter((user) =>
      [user.name, user.email, user.company, user.phoneNumber]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, users]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {roleLabels[role]} Directory
          </h2>
          <p className="text-sm text-gray-500">
            Manage all {roleLabels[role]?.toLowerCase()} accounts and permissions
          </p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md"
        >
          <UserPlus className="h-4 w-4" />
          Add {roleLabels[role]}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${roleLabels[role]}...`}
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-3 text-sm"
          />
        </div>
        <div className="text-sm text-gray-500">
          {filteredUsers.length} result{filteredUsers.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Company", "Phone", "Created", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredUsers.length ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="group hover:bg-gray-50">
                  <td className="px-5 py-4">{user.name}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">{user.company || "—"}</td>
                  <td className="px-5 py-4">{user.phoneNumber || "—"}</td>
                  <td className="px-5 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2" onClick={() => onEdit(user)}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="p-2" onClick={() => onDelete(user)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-10">
                  <EmptyState
                    title="No profiles found"
                    description={`Start by adding a new ${roleLabels[role]?.toLowerCase()} profile.`}
                    action={
                      <button
                        onClick={onCreate}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Add {roleLabels[role]}
                      </button>
                    }
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
