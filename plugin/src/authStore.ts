import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Keycloak from "keycloak-js";

type AuthResp = { status: "success" | "error"; token?: string };

const keycloak = new Keycloak({
	url: "http://localhost:8080",
	realm: "myrealm",
	clientId: "myclient",
});

type AuthState = {
	isAuth: boolean;
	token: string | null;
	fetchCredential: () => Promise<AuthResp>;
	logout: () => void;
};

// Wrap the store with devtools, providing type arguments to fix TS
export const useAuthStore = create<AuthState>()(
	devtools(
		(set) => ({
			isAuth: false,
			token: null,

			fetchCredential: async () => {
				console.log("fetchCredential called");
				const authenticated = await keycloak.init({ onLoad: "login-required" });
				if (authenticated) {
					set({ isAuth: true, token: keycloak.token });
					return { status: "success", token: keycloak.token! };
				} else {
					set({ isAuth: false, token: null });
					return { status: "error" };
				}
			},

			logout: () => {
				keycloak.logout();
				set({ isAuth: false, token: null });
			},
		}),
		{ name: "AuthStore" }
	)
);
