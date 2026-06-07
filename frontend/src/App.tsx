import { useEffect, useState } from "react";
import { api } from "./services/api";
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

  useEffect(() => {
    const loadUsers = async () => {
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

    void loadUsers();
  }, []);

  // const fetchUsers = useCallback(async () => {
  //   try {
  //     setError("");

  //     const res = await api.get<User[]>("/users");
  //     setUsers(res.data);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Failed to load users");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   void fetchUsers();
  // }, [fetchUsers]);

  // const fetchUsers = async () => {
  //   try {
  //     setError("");
  //     const res = await api.get<User[]>("/users");
  //     setUsers(res.data);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Failed to load users");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   void fetchUsers();
  // }, []);

  const saveUser = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingId) {
        const res = await api.put<User>(`/users/${editingId}`, {
          name,
          email,
        });

        setUsers((prev) =>
          prev.map((u) => (u.id === editingId ? res.data : u)),
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
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setSaving(false);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  const editUser = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user.id);
  };

  if (loading) {
    return (
      <div className="app">
        <h2 style={{ color: "white" }}>Loading users...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <div className="hero">
          <h1 className="title">User Management Dashboard</h1>
          <p className="subtitle">React + Spring Boot CRUD App</p>

          <div className="stats">
            <h3>{users.length}</h3>
            <span>Total Users</span>
          </div>
        </div>

        {error && <div className="error-card">⚠️ {error}</div>}

        {/* FORM */}
        <div className="form-card">
          <div className="form-group">
            <label className="label">Full Name</label>
            <input
              className="input"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">Email Address</label>
            <input
              className="input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* BUTTON INSIDE FORM CARD */}
          <button className="add-btn" onClick={saveUser} disabled={saving}>
            {saving ? "Saving..." : editingId ? "Update User" : "Add User"}
          </button>
        </div>

        {editingId && (
          <button
            className="cancel-btn"
            onClick={() => {
              setEditingId(null);
              setName("");
              setEmail("");
            }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* USERS */}
      <div className="user-grid">
        {users.length === 0 ? (
          <div className="empty-state">
            <h2>No Users Found</h2>
            <p>Add your first user above.</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-card">
              {/* LEFT SIDE */}
              <div className="user-left">
                <div className="avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="actions">
                <button className="edit-btn" onClick={() => editUser(user)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
