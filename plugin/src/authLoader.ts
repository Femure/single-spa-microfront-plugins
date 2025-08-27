import { redirect } from "react-router";
import { useAuthStore } from "./authStore";

export async function authLoader() {
    const { fetchCredential } = useAuthStore.getState();

    try {
        const resp = await fetchCredential();
        console.log("authLoader:", resp);
        if (!resp || resp.status === "error") {
            // stop the loader, trigger ErrorPage
            throw new Error("Authentication failed");
        }
        return null; // auth success
    } catch (err: any) {
        console.error("authLoader catch:", err?.message || err);
        // Throw error to trigger the errorElement
        throw new Error("Unexpected auth error");
    }
}
