import { useState } from "react";
import api from "../api/axios";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [msg, setMsg] = useState("")

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/register", form);
            setMsg(response.data.message);
        } catch (err) {
            setMsg(err.response?.data?.message || "An error occurred. Please try again.")
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

                {msg && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        placeholder="Enter Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        name="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}
