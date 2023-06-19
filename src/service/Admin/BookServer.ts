import myFetch from "utils/ajax";
import api from "../api.json";

export async function getAllBooksForAdmin(): Promise<Book[]> {
  const props: FetchProps = {
    url: `${api.book}/all`,
    method: "GET",
  };
  const data: Book[] = await myFetch(props).then((res) => res.json());
  return data;
}

export async function updateBookInfoForAdmin(book: Book): Promise<void> {
  const props: FetchProps = {
    url: `${api.book}/${book.uuid}`,
    method: "PATCH",
    body: book
  };
  await myFetch(props);
}
