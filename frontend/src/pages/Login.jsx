import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { setAuthSession } from "../utils/authStorage";

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");

        try {
            setLoading(true);
            const result = await apiRequest("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            setAuthSession(result.token, result.user);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-slate-800">
            <div className="bg-black p-8 border-white">
                <h1 className="text-white text-4xl font-bold text-center ">CODE ARENA</h1>

                <p className="text-red-600 text-center mt-2">
                    Login to your account
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                   <div>
                    <label className="text-white text-sm">Email</label>

                    <input 
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full mt-1 px-4 py-2  bg-slate-700 text-white outline-none o"
                    ></input>
                   </div>

                   <div className="mt-4">
                    <label className="text-white text-sm">Password</label>

                    <input
                    type="password"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    className="w-full mt-1 px-2 py-2  bg-slate-700 text-white outline-none"
                    ></input>
                   </div>

                   <button 
                   type="submit"
                   className="w-full mt-4 py-2 bg-red-600 text-slate-900  font-semibold hover:bg-red-700 hover:text-2px"
                   >
                    {loading ? "Logging in..." : "Login"}
                   </button>

                   {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

                   <p className="mt-4 text-sm text-slate-400 text-center">
                    No account? <Link to="/register" className="text-white">Register</Link>
                   </p>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;