type Method = "GET" | "POST" | "PATCH" | "DELETE";

type SuccessInfo = {
  readonly flag: boolean;
};

interface FetchProps {
  url: string;
  method: Method;
  headers?: HeadersInit;
  params?: object;
}