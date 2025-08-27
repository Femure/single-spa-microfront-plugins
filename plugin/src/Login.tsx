import { useNavigate } from "react-router";
import { useAuthStore } from "./authStore";

export default function Login() {
	const fetchCredential = useAuthStore(s => s.fetchCredential);
	const navigate = useNavigate();

	async function handleLogin() {
		const resp = await fetchCredential();
		if (resp.status === "success") {
			console.log("login success");
			navigate("/");  // ✅ works, loader will call same fetchCredential again
		}
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl mb-4">Login Page</h1>
			<button
				onClick={handleLogin}
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				Login with Keycloak
			</button>
		</div>
	);
}
