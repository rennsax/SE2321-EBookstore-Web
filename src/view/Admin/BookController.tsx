import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import {
  getAllBooksForAdmin,
  updateBookInfoForAdmin,
} from "service/Admin/BookServer";
import { getBookByUuid } from "service/BookService";
import api from "service/api.json";
import { defaultQueryOptions } from "service/defaultQueryOptions";

interface BookManageDialogProps {
  uuid?: string;
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const BookManageDialog: React.FC<BookManageDialogProps> = ({
  uuid,
  open,
  onClose,
  refetch,
}) => {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function fetchBook(uuid: string) {
      setBook(null);
      const bookData = await getBookByUuid(uuid);
      if (!ignore) {
        setBook(bookData);
      }
    }

    let ignore = false; // in case of the race condition
    if (uuid !== undefined) {
      fetchBook(uuid);
    }
    return () => {
      ignore = true;
    };
  }, [uuid]);

  useEffect(() => {
    console.log(book);
  }, [book]);

  if (book === null) {
    return <></>;
  }

  function createInfoLine(field: keyof Book, prompt: string): React.ReactNode {
    return (
      <Stack direction={"row"} className="book-mng__info__row">
        <p style={{ width: "100px", height: "40px", lineHeight: "40px" }}>
          {prompt}:
        </p>
        <label>
          <input
            type="text"
            defaultValue={(book as Book)[field]}
            name={"title"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBook({
                ...(book as Book),
                [field]: e.target.value,
              });
            }}
          />
        </label>
      </Stack>
    );
  }

  const handleSaveBook: () => Promise<void> = async () => {
    await updateBookInfoForAdmin(book).then(refetch).then(onClose);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Manage Book</DialogTitle>
      <DialogContent>
        <Stack direction={"row"} className="book-mng">
          <img
            style={{ width: "200px", objectFit: "scale-down" }}
            src={`${api["book.picture"]}/${book.picId}.jpg`}
          />
          <Stack
            sx={{ ml: "30px", fontSize: "18px" }}
            className="book-mng__info"
          >
            {createInfoLine("title", "Title")}
            {createInfoLine("author", "Author(s)")}
            {createInfoLine("stock", "Stock")}
            {createInfoLine("isbn", "ISBN")}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveBook}>Save</Button>
        <Button onClick={onClose}>Quit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function BookController() {
  // the book uuid selected to be managed
  const [selectedBookUuid, setSelectedBookUuid] = useState<string | undefined>(
    undefined
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleManage = (uuid: string) => {
    setSelectedBookUuid(uuid);
  };

  useEffect(() => {
    console.log(selectedBookUuid);
  }, [selectedBookUuid]);

  const columnDefs = useMemo(() => {
    const columns: GridColDef[] = [
      {
        field: "picId",
        headerName: "Cover",
        width: 86,
        renderCell: (params) => (
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
          <Button
            variant="outlined"
            onClick={() => {
              handleManage(params.value);
              setIsDialogOpen(true);
            }}
          >
            Manage
          </Button>
        ),
      },
    ];
    return columns;
  }, []);

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
  });
  if (!isSuccess) {
    return <></>;
  }

  return (
    <>
      <Box sx={{ height: 540, width: "100%" }}>
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
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        uuid={selectedBookUuid}
        refetch={refetch}
      />
    </>
  );
}
