import {
  Button,
  Stack
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { deleteBook, getAllBooksForAdmin } from "service/Admin/BookServer";
import api from "service/api.json";
import { defaultQueryOptions } from "service/defaultQueryOptions";
import BookDeleteDialog from "./BookDeleteDialog";
import BookManageDialog from "./BookManageDialog";


export default function BookController() {
  // the book uuid selected to be managed
  const [selectedBookUuid, setSelectedBookUuid] = useState<string | undefined>(
    undefined
  );
  const [selectedDeletedBookUuid, setSelectedDeletedBookUuid] = useState<
    string | undefined
  >(undefined);

  const columnDefs: GridColDef[] = [
    {
      field: "picId",
      headerName: "Cover",
      width: 86,
      renderCell: (params) => (
        // TODO: add timestamp here can refresh the img element immediately
        // but leads to poor performance.
        <img
          style={{ height: "80px", width: "60px" }}
          src={`${api["book.picture"]}/${params.value}.jpg`}
        />
      ),
      sortable: false,
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "author", headerName: "Author(s)", width: 160 },
    { field: "stock", headerName: "Stock", width: 90, sortable: false },
    { field: "isbn", headerName: "ISBN", width: 150, sortable: false },
    {
      field: "uuid",
      headerName: "",
      width: 100,
      sortable: false,
      hideable: false,
      renderCell: (params) => (
        <Stack>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedBookUuid(params.value);
            }}
            size="small"
            sx={{ mb: "10px" }}
          >
            Manage
          </Button>
          <Button
            color="error"
            variant="outlined"
            size="small"
            onClick={() => {
              setSelectedDeletedBookUuid(params.value);
            }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const {
    isSuccess,
    data: bookContentList,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookListForAdmin"],
    queryFn: async () => {
      return await getAllBooksForAdmin();
    },
    ...defaultQueryOptions,
    onError: () => {
      console.log(error);
    },
    refetchOnWindowFocus: false,
  });
  if (!isSuccess) {
    return <></>;
  }

  return (
    <>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          columns={columnDefs}
          rows={bookContentList as Book[]}
          loading={false}
          rowHeight={100}
          getRowId={(row: Book) => row.uuid}
          disableRowSelectionOnClick
        />
      </Box>
      <BookManageDialog
        bookSelected={
          selectedBookUuid === undefined
            ? undefined
            : bookContentList.find((book) => book.uuid === selectedBookUuid)
        }
        open={selectedBookUuid !== undefined}
        onClose={() => setSelectedBookUuid(undefined)}
        refetch={async () => {
          await refetch();
        }}
      />
      <BookDeleteDialog
        open={selectedDeletedBookUuid !== undefined}
        onClose={() => setSelectedDeletedBookUuid(undefined)}
        doDelete={async () => {
          // TODO: Exception handling: if the book is referenced by any user's order.
          await deleteBook(selectedDeletedBookUuid as string).then(() => {
            refetch();
          });
        }}
      />
    </>
  );
}
