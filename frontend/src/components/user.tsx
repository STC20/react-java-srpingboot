import { useEffect, useRef, useState } from "react";
// import { api } from "./services/api";
import "./App.css";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
  name: "",
  email: "",
});

const nameRef = useRef<HTMLInputElement>(null);
const emailRef = useRef<HTMLInputElement>(null);

  const formatBackendError = (data: unknown) => {
    if (!data) return "Failed to save user";
    if (typeof data === "string") return data;

    if (Array.isArray(data)) {
      return data
        .filter((item) => typeof item === "string")
        .join(". ");
    }

    if (typeof data === "object" && data !== null) {
      const responseObj = data as Record<string, unknown>;

      if (
        "message" in responseObj &&
        typeof responseObj.message === "string"
      ) {
        return responseObj.message;
      }

      const messages: string[] = [];

      Object.values(responseObj).forEach((value) => {
        if (typeof value === "string") {
          messages.push(value);
        } else if (Array.isArray(value)) {
          messages.push(
            ...value.filter((item) => typeof item === "string") as string[]
          );
        } else if (typeof value === "object" && value !== null) {
          messages.push(
            ...Object.values(value as Record<string, unknown>)
              .filter((item) => typeof item === "string") as string[]
          );
        }
      });

      return messages.join(". ") || "Failed to save user";
    }

    return "Failed to save user";
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      setError("");

      const res = await api.get<User[]>("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
    };

    void loadUsers();
  }, []);

  // CREATE or UPDATE (single function)
  const saveUser = async () => {
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }

    try {
      setSaving(true);

    if (editingId) {
      const res = await api.put<User>(`/users/${editingId}`, {
        name,
        email,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingId ? res.data : u
        )
      );
    } else {
      const res = await api.post<User>("/users", {
        name,
        email,
      });

      setUsers((prev) => [...prev, res.data]);
    }

    setName("");
    setEmail("");
    setEditingId(null);

  } catch (err: unknown) {
    console.error(err);

    if (typeof err === "object" && err !== null && "response" in err) {
      const axiosError = err as {
        response?: {
          data?: unknown;
        };
      };

      const response = axiosError.response?.data;
      setError(formatBackendError(response));
    } else {
      setError("Server not reachable");
    }
} finally {
    setSaving(false);
  }
};

  // DELETE
  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  // EDIT (fill form)
  const editUser = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user.id);
  };

  if (loading) {
    return (
      <div className="app">
        <h2>Loading users...</h2>
      </div>
    );
  }

return (
  <div className="app">
    <div className="container">
      <div className="hero">
        <h1 className="title">
          User Management Dashboard
        </h1>

        <p className="subtitle">
          Manage users with React + Spring Boot
        </p>

        <div className="stats">
          <h3>{users.length}</h3>
          <span>Total Users</span>
        </div>
      </div>

      {error && (
        <div className="error-card">
          ⚠️ {error}
        </div>
      )}

      {/* FORM */}
      <div className="form-card">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name <span className="required">*</span>
          </label>

          <input
            id="name"
            ref={nameRef}
            className={`input ${
              fieldErrors.name ? "input-error" : ""
            }`}
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);

              setFieldErrors((prev) => ({
                ...prev,
                name: "",
              }));

              setError("");
            }}
          />

          {fieldErrors.name && (
            <p className="field-error">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span className="required">*</span>
          </label>

          <input
            id="email"
            ref={emailRef}
            className={`input ${
              fieldErrors.email ? "input-error" : ""
            }`}
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              setFieldErrors((prev) => ({
                ...prev,
                email: "",
              }));

              setError("");
            }}
          />

          {fieldErrors.email && (
            <p className="field-error">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <button
          className="add-btn"
          onClick={saveUser}
          disabled={saving}
        >
          {saving
            ? "⏳ Saving..."
            : editingId
            ? "✏️ Update User"
            : "➕ Add User"}
        </button>

        {editingId && (
          <button
            className="cancel-btn"
            onClick={() => {
              setEditingId(null);
              setName("");
              setEmail("");
              setFieldErrors({
                name: "",
                email: "",
              });
            }}
          >
            ❌ Cancel Edit
          </button>
        )}
      </div>

      {/* USER LIST */}
      <div className="user-grid">
        {users.length === 0 ? (
          <div className="empty-state">
            <h2>No Users Found</h2>
            <p>Add your first user above.</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="user-card"
            >
              <div className="avatar">
                {user.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => editUser(user)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteUser(user.id)
                  }
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);
}