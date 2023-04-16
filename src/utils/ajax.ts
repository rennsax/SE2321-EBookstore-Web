type Method = "GET" | "POST";
type SendAjaxFun = <T>(method: Method, url: string) => Promise<T>;

const sendAjax: SendAjaxFun = async function <T>(method: Method, url: string) {
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

export default sendAjax;
