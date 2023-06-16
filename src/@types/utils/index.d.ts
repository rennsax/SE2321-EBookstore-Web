type Method = "GET" | "POST" | "PATCH" | "DELETE";

interface FetchProps {
  url: string;
  method: Method;
  headers?: HeadersInit;
  body?: object;
}