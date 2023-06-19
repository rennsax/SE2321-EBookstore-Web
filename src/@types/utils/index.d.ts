type Method = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

interface FetchProps {
  url: string;
  method: Method;
  headers?: HeadersInit;
  body?: object;
}