/**
 * send ajax with json-type request body
 * @param props implements interface FetchProps
 * @returns response
 */
const myFetch = async function myFetch(props: FetchProps) {
  const { url, method, params } = props;
  let { headers } = props;
  if (params) {
    headers = { ...headers, "Content-Type": "application/json" };
  }
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: params ? JSON.stringify(params) : null,
  });
  return response;
};

export default myFetch;

/**
 * Tool function to check the response status.
 *
 * @param response
 * @returns if the response denotes success, return the data.
 * @throws "response error!" if the response denotes failure.
 */
export async function checkResponse<T>(response: Response): Promise<T> {
  if (response.status < 200 || response.status >= 300) {
    throw "response error!";
  }
  return await response.json();
}

/** @deprecated */
type SendAjaxFun = <T>(method: Method, url: string) => Promise<T>;

/** @deprecated */
export const sendAjax: SendAjaxFun = async function <T>(method: Method, url: string) {
  console.log("send ajax!");
  const response = await new Promise<T>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.send();
    setTimeout(() => {
      reject("no response!");
    }, 3000);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject("response exception!");
        }
      }
    };
  });
  return response;
};