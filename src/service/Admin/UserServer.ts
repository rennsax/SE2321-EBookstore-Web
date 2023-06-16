import myFetch from "utils/ajax";
import api from "../api.json";

export async function getAllUsers(): Promise<UserInfoForAdmin[]> {
  const props: FetchProps = {
    url: `${api.user}`,
    method: "GET",
  };
  const data: UserInfoForAdmin[] = await myFetch(props).then((res) => {
    return res.json();
  });
  return data;
}

export async function banUser(id: number): Promise<void> {
  const props: FetchProps = {
    url: `${api["user.ban"]}/${id}`,
    method: "PATCH",
  };
  await myFetch(props);
}

export async function unlockUser(id: number): Promise<void> {
  const props: FetchProps = {
    url: `${api["user.unlock"]}/${id}`,
    method: "PATCH",
  };
  await myFetch(props);
}

export async function setUserPasswd(id: number, passwd: string): Promise<void> {
  const props: FetchProps = {
    url: `${api["user.setPasswd"]}/${id}`,
    method: "PATCH",
    body: {
      passwd,
    },
  };
  await myFetch(props);
}
