type Method = "GET" | "POST";
// type SendAjaxFun = <T>(method: Method, url: string) => Promise<T>;

// const sendAjax: SendAjaxFun = async function <T>(method: Method, url: string) {
//   console.log("send ajax!");
//   const response = await new Promise<T>((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.responseType = "json";
//     xhr.send();
//     setTimeout(() => {
//       reject("no response!");
//     }, 3000);
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4) {
//         if (xhr.status >= 200 && xhr.status < 300) {
//           resolve(xhr.response);
//         } else {
//           reject("response exception!");
//         }
//       }
//     };
//   });
//   return response;
// };

export interface FetchProps {
  url: string;
  method: Method;
  headers?: HeadersInit;
  params?: object;
}

/**
 * @param props implements interface FetchProps
 * @returns response
 */
const myFetch = async function myFetch(props: FetchProps) {
  const { url, method, params } = props;
  let { headers } = props;
  if (params) {
    headers = { ...headers, "Content-Type": "application/json" };
  }
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: params ? JSON.stringify(params) : null,
    });
    if (response.status < 200 || response.status >= 300) {
      throw `Request error with status code ${response.status}`;
    }
    return response;
  } catch (error) {
    throw "No response from the service";
  }
};

export default myFetch;
