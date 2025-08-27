import { useAuthStore } from "./authStore";

export default function Home() {
	const logout = useAuthStore(s => s.logout);
	const token = useAuthStore(s => s.token);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl mb-4">🏠 Home Page</h1>
			<p className="mb-4">Token: {token}</p>
			<button
				onClick={logout}
				className="bg-red-500 text-white px-4 py-2 rounded"
			>
				Logout
			</button>
		</div>
	);
}
