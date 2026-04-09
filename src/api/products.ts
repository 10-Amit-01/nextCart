import baseUrl from "./baseApi";

export async function getProductSuggestions(keyword: string) {
  const response = await baseUrl.get(
    `/products/suggestions?keyword=${keyword}`,
  );
  return response;
}

export async function searchProduct(
  keyword: string,
  limit: number,
  page: number,
) {
  const response = await baseUrl.get(
    `/products/search?keyword=${keyword}&limit=${limit}&page=${page}`,
  );
  return response;
}
