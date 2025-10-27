import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const API_BASE =
    import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "http://127.0.0.1:8000";

export default function Signup() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch(`${API_BASE}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.detail || "Signup failed");
            }
            const data = await res.json(); // { username, role }
            login(data); // auto login
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
                <h2 className="text-xl font-semibold text-indigo-700 text-center">Create Account</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="border rounded w-full p-2"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border rounded w-full p-2"
                    required
                />

                {error && <div className="text-red-600 text-sm text-center">{error}</div>}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    Sign Up
                </button>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-700 underline">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}
