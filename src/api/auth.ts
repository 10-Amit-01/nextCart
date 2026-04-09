import baseUrl from "./baseApi";

export async function login(email: string, password: string) {
  const response = await baseUrl.post("/auth/login", { email, password });
  return response.data;
}

export async function register(name: string, email: string, password: string) {
  const response = await baseUrl.post("/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
}

export async function logout() {
  const response = await baseUrl.post("/auth/logout");
  return response.data;
}



