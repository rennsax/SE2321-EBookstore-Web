import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UploadIcon from "@mui/icons-material/Upload";
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
import { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import {
  deleteBook,
  getAllBooksForAdmin,
  uploadFile,
} from "service/Admin/BookServer";
import { addBook } from "service/BookService";
import api from "service/api.json";
import { defaultQueryOptions } from "service/defaultQueryOptions";
import BookDeleteDialog from "./BookDeleteDialog";
import BookManageDialog from "./BookManageDialog";

const BookAddManage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageList, setImageList] = useState<ImageListType>([]);
  const [book, setBook] = useState<BookAdded>({});

  function createInfoLine<K extends keyof BookAdded>(
    field: K,
    prompt: string,
    transfer?: (value: string) => BookAdded[K]
  ): React.ReactNode {
    return (
      <Stack direction={"row"} className="book-mng__info__row">
        <p style={{ width: "100px", height: "40px", lineHeight: "40px" }}>
          {prompt}:
        </p>
        <label>
          <input
            type="text"
            defaultValue={(book ?? {})[field]}
            name={prompt}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBook({
                ...(book ?? {}),
                [field]: transfer ? transfer(e.target.value) : e.target.value,
              });
            }}
          />
        </label>
      </Stack>
    );
  }

  useEffect(() => {
    console.log(book);
  }, [book]);

  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleAddBook: () => void = () => {
    // TODO not alert
    if (book.title === undefined) {
      alert("At least set the title!");
      return;
    }
    if (imageList.length === 0) {
      alert("Please upload a cover!");
      return;
    }
    const newBook = { ...book };
    const file = imageList[0].file as File;
    const pendingPromise: Promise<void>[] = [];
    pendingPromise.push(uploadFile(file));
    newBook.picId = (function (str: string) {
      return str.substring(0, str.indexOf("."));
    })(file.name);
    pendingPromise.push(addBook(newBook));
    Promise.all(pendingPromise).then(() => {
      setIsDialogOpen(false);
      setBook({});
    }).catch(() => {
      alert("Title conflict!")
    })
  };

  return (
    <>
      <Stack direction={"row"} sx={{ mt: "8px" }}>
        <Button
          sx={{ textTransform: "none", fontSize: "18px" }}
          onClick={() => setIsDialogOpen(true)}
        >
          <AddCircleOutlineIcon sx={{ mr: "10px" }} />
          <span>Add A New Book</span>
        </Button>
      </Stack>
      <Dialog onClose={handleCloseDialog} open={isDialogOpen}>
        <DialogTitle>Add a Book</DialogTitle>
        <DialogContent>
          <Stack direction={"row"} className="book-mng">
            <ImageUploading
              value={imageList}
              onChange={(imageList) => setImageList(imageList)}
              acceptType={["jpg"]}
            >
              {({ imageList, onImageUpload }) => {
                return (
                  <div style={{ position: "relative" }}>
                    {imageList.length === 0 ? (
                      <div
                        style={{
                          width: "150px",
                          height: "200px",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    ) : (
                      <img
                        src={imageList[0].dataURL}
                        className="book-mng__img"
                      />
                    )}
                    <button
                      className="book-mng__img-mask"
                      onClick={onImageUpload}
                    >
                      <UploadIcon
                        fontSize="large"
                        className="book-mng__img-mask__icon"
                      />
                    </button>
                  </div>
                );
              }}
            </ImageUploading>
            <Stack
              sx={{ ml: "30px", fontSize: "18px" }}
              className="book-mng__info"
            >
              {createInfoLine("title", "Title")}
              {createInfoLine("author", "Author(s)")}
              {createInfoLine("stock", "Stock", (value) =>
                Number.parseInt(value)
              )}
              {createInfoLine("isbn", "ISBN")}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddBook}>Save</Button>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

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
      <BookAddManage />
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
