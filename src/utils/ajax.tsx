const sendAjax = function <S>(method: "GET" | "POST", url: string) {
  return new Promise<S>((resolve, reject) => {
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
          resolve(xhr.response as S);
        } else {
          reject("response exception!");
        }
      }
    };
  });
};

export { sendAjax };
