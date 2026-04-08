import baseUrl from "./baseApi";

export async function getProduct() {
  const response = await baseUrl.get("/products");
  return response;
}