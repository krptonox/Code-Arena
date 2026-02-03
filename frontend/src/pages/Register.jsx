import {useState} from "react";

function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(`Email ${email} Password ${password}`);
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
                    className="w-full mt-4 py-2 bg-emerald-500 text-slate-9000 rounded font-semibold"
                    >
                        Register
                    </button>
                 </form>
            </div>
        </div>
        </>
    );
}

export default Register;