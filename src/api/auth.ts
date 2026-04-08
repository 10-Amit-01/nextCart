import baseUrl from "./baseApi";

export async function login(username: string, password: string) {
    const response = await baseUrl.post("/auth/login", { username, password });
    return response.data;
}