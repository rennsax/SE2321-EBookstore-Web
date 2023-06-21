import UploadIcon from "@mui/icons-material/Upload";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import {
  updateBookInfoForAdmin,
  uploadFile
} from "service/Admin/BookServer";
import api from "service/api.json";

interface BookManageDialogProps {
  bookSelected?: Book;
  open: boolean;
  onClose: () => void;
  refetch: () => Promise<void>;
}

interface ImageManageProps {
  src: string;
  imageList: ImageListType;
  setImageList: React.Dispatch<React.SetStateAction<ImageListType>>;
}

const ImageManage: React.FC<ImageManageProps> = ({
  src,
  imageList,
  setImageList,
}) => {
  const onChange = (imageList: ImageType[]) => {
    setImageList(imageList);
  };

  return (
    <ImageUploading value={imageList} onChange={onChange} acceptType={["jpg"]}>
      {({ imageList, onImageUpload }) => {
        return (
          <div style={{ position: "relative" }}>
            {imageList.length === 0 ? (
              <img className="book-mng__img" src={src} />
            ) : (
              <img src={imageList[0].dataURL} className="book-mng__img" />
            )}
            <button className="book-mng__img-mask" onClick={onImageUpload}>
              <UploadIcon
                fontSize="large"
                className="book-mng__img-mask__icon"
              />
            </button>
          </div>
        );
      }}
    </ImageUploading>
  );
};

const BookManageDialog: React.FC<BookManageDialogProps> = ({
  bookSelected,
  open,
  onClose: closeDialog,
  refetch,
}) => {
  const [imageBuffer, setImageBuffer] = useState<ImageListType>([]);
  const [book, setBook] = useState<Book | undefined>(bookSelected);

  useEffect(() => {
    setBook(bookSelected);
  }, [bookSelected]);

  const onClose: () => void = () => {
    closeDialog();
    setImageBuffer([]);
    setBook(undefined);
  };

  if (book === undefined) {
    return <></>;
  }

  function createInfoLine<K extends keyof Book>(
    field: K,
    prompt: string,
    transfer?: (value: string) => Book[K]
  ): React.ReactNode {
    return (
      <Stack direction={"row"} className="book-mng__info__row">
        <p style={{ width: "100px", height: "40px", lineHeight: "40px" }}>
          {prompt}:
        </p>
        <label>
          <input
            type="text"
            defaultValue={(book as Book)[field]}
            name={prompt}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBook({
                ...(book as Book),
                [field]: transfer ? transfer(e.target.value) : e.target.value,
              });
            }}
          />
        </label>
      </Stack>
    );
  }

  const handleSaveBook: () => Promise<void> = async () => {
    const newBook = { ...book };
    if (imageBuffer.length !== 0) {
      const file = imageBuffer[0].file as File;
      await uploadFile(file);
      newBook.picId = (function (str: string) {
        return str.substring(0, str.indexOf("."));
      })(file.name);
    }
    if (newBook !== bookSelected) {
      await updateBookInfoForAdmin(newBook);
      refetch();
    }
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Manage Book</DialogTitle>
      <DialogContent>
        <Stack direction={"row"} className="book-mng">
          <ImageManage
            src={`${api["book.picture"]}/${book.picId}.jpg`}
            imageList={imageBuffer}
            setImageList={setImageBuffer}
          />
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
        <Button onClick={handleSaveBook}>Save</Button>
        <Button onClick={onClose}>Quit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookManageDialog;