const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:8000";

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Use relative URL on client-side, direct URL on server-side
  const isServer = typeof window === "undefined";
  const baseUrl = isServer ? BACKEND_URL : "";
  
  const res = await fetch(`${baseUrl}${endpoint}`, {
    cache: "no-store",
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// explanation of the code: This function fetches data from the API endpoint and returns the JSON response. It handles both client-side and server-side requests differently.
// Line 3 we create async function fetchApi where <T> is a generic type parameter that allows the function to return a promise of any type T. The function takes an endpoint string and an optional options object of type RequestInit. RequestInit is a built-in TypeScript type that represents the options for the fetch request, such as method, headers, body, etc. The function returns a Promise of type T, which means it will resolve to the JSON response from the API.
// reason for making api.ts file: The api.ts file is created to centralize the API fetching logic, making it reusable and easier to maintain. By having a single function to handle API requests, we can ensure consistent error handling, caching strategies, and base URL management across the application. This approach also allows for better type safety with TypeScript, as we can define the expected response type for each API call using generics.