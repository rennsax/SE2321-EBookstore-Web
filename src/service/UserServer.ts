import myFetch from "utils/ajax";
import api from "./api.json";

export async function getUserInfo(account: string): Promise<UserInfo> {
  const props: FetchProps = {
    url: `${api.user}?account=${account}`,
    method: "GET",
  };
  const data: UserInfo = await myFetch(props).then((res) => {
    return res.json();
  });
  return data;
}
