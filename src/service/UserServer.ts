import myFetch, { checkResponse } from "utils/ajax";
import api from "./api.json";
import { Dayjs } from "dayjs";

export async function getUserInfo(account: string): Promise<UserInfo> {
  const props: FetchProps = {
    url: `${api["user.dev"]}/by?account=${account}`,
    method: "GET",
  };
  const data: UserInfo = await myFetch(props).then((res) => {
    return res.json();
  });
  return data;
}

export async function register(
  userName: string,
  account: string,
  passwd: string
): Promise<RegisterResult> {
  const props: FetchProps = {
    url: `${api.user}`,
    method: "PUT",
    body: {
      userName,
      account,
      passwd,
    },
  };
  try {
    const response = await myFetch(props);
    if (response.status >= 200 && response.status < 300) {
      // Check if the user is an administrator.
      return "register success";
    } else if (response.status === 409) {
      return "account conflict";
    }
  } catch (err) {
    console.error(err);
  }
  return "response error";
}

export async function changeInfo(id: number, newName: string) {
  const props: FetchProps = {
    url: `${api.user}/${id}`,
    method: "PATCH",
    body: {
      name: newName,
    },
  };
  await myFetch(props);
}

export async function getUserStatistic(
  id: number,
  beginDate?: Dayjs,
  endDate?: Dayjs
): Promise<UserStatistic> {
  const props: FetchProps = {
    url: `${api.user}/${id}/stat?${new URLSearchParams({
      ...(beginDate && { beginDate: beginDate.format("YYYY-MM-DD") }),
      ...(endDate && { endDate: endDate.format("YYYY-MM-DD") }),
    })}`,
    method: "GET",
  };
  return await checkResponse(await myFetch(props));
}
