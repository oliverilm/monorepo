import { useState } from "react";
import { login } from "../../api/auth";

export function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState()
    
    const onSubmit = async () => {
        const response = await login(
            { email, password }
        )

        setResponse(response.data)
    
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    
                    <form onSubmit={onSubmit}>
                    <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
                    </form>

                    {response && JSON.stringify(response)}
                </div>
            </div>
        </div>
    );
}