import api from "service/api.json";
import myFetch from "utils/ajax";

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
    body: book,
  };
  await myFetch(props);
}

export async function uploadFile(file: File): Promise<void> {
  const data = new FormData();
  data.append("file", file);
  await fetch(`${api["book.dev.uploadPicture"]}`, {
    method: "POST",
    body: data,
  });
}

export async function deleteBook(uuid: string): Promise<void> {
  const props: FetchProps = {
    url: `${api.book}/${uuid}`,
    method: "DELETE"
  };
  const res = await myFetch(props);
  if (res.status < 200 || res.status >= 300) {
    throw "response error"
  }
}
