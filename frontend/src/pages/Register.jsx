import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { setAuthSession } from "../utils/authStorage";

function Register(){
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
            const result = await apiRequest("/api/auth/register", {
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
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-slate-800 p-8 rounded-xl">
                 <h1 className="text-emerald-400  text-4xl font-bold px-5">CODE ARENA</h1>
                 <p className="text-emerald-400 text-center text-4xlmt-2">Create your Account</p>
                 <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-emerald-300 text-sm">Email
                        </label>

                        <input
                        type="email"
                        value={email}
                        onChange={(e) =>{
                            setEmail(e.target.value)
                        }}
                        className="w-full mt-1 px-3 py-2 rounded bg-slate-700 text-white outline-none"
                        ></input>
                    </div>

                    <div className="mt-4">
                        <label className="text-emerald-400 text-sm">
                            Password
                        </label>

                        <input
                        type="password"
                        value={password}
                        onChange={(e) =>{
                            setPassword(e.target.value)
                        }}
                        className="w-full mt-1 px-4 py-2 rounded bg-slate-700 text-white outline-none"
                        >
                        </input>
                    </div>

                    <button
                    type="submit"
                    className="w-full mt-4 py-2 bg-emerald-500 text-slate-900 rounded font-semibold"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>

                    {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

                    <p className="mt-4 text-sm text-slate-400 text-center">
                        Already registered? <Link to="/login" className="text-emerald-400">Login</Link>
                    </p>
                 </form>
            </div>
        </div>
        </>
    );
}

export default Register;