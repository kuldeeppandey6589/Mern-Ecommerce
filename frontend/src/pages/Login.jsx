import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", form);
            console.log(response, "data");

            // Store the token in localStorage
            localStorage.setItem("token", response.data.token);
            setMessage("Login successful!");

            // Navigate to the dashboard or home page after successful login
            setTimeout(() => {
                navigate("/");
            }, 1000); // Redirect after 1 second

        } catch (err) {
            setMessage(err.response?.data?.message || "An error occurred. Please try again.");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Account</h2>



                <form onSubmit={handleSubmit} className="space-y-4">
                    {message && (
                        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                            {message}
                        </div>
                    )}

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
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}