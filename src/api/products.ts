import baseUrl from "./baseApi";

export async function getProduct() {
  const response = await baseUrl.get("/products");
  return response;
}

export async function getProductSuggestions(keyword: string) {
  const response = await baseUrl.get(`/products/suggestions?keyword=${keyword}`);
  return response;
}