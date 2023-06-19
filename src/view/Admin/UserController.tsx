import { Button, CircularProgress, Container, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  banUser,
  getAllUsers,
  setUserPasswd,
  unlockUser,
} from "service/Admin/UserServer";
import api from "service/api.json";
import { defaultQueryOptions } from "service/defaultQueryOptions";

const UserCard: React.FC<{
  userInfo: UserInfoForAdmin;
  refetch: () => Promise<void>;
}> = ({ userInfo, refetch }) => {
  const { id, name, avatarId, account, userType, passwd } = userInfo;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [passwdNew, setPasswdNew] = useState<string>("");
  const avatarSrc = `${api["avatar"]}/${avatarId}.jpg`;
  const typeColor = (() => {
    switch (userType) {
      case "SUPER":
        return "#faa307";
      case "NORMAL":
        return "grey";
      case "FORBIDDEN":
        return "red";
    }
  })();

  const handleChangeUserType = async () => {
    if (userType === "FORBIDDEN") {
      await unlockUser(id);
    } else if (userType === "NORMAL") {
      await banUser(id);
    }
    await refetch();
  };

  const handlePasswdChange = async () => {
    if (passwd === passwdNew) {
      return;
    }
    await setUserPasswd(id, passwdNew);
    setIsDialogOpen(false);
    setPasswdNew("");
    await refetch();
  };

  return (
    <>
      <Stack
        direction={"row"}
        className="admin__user-card"
        justifyContent={"space-between"}
      >
        <div className="admin__user-card__avatar">
          <img src={avatarSrc} alt="name" />
        </div>
        <Stack justifyContent={"space-evenly"}>
          <div className="admin__user-card__name">{name}</div>
          <div className="admin__user-card__type" style={{ color: typeColor }}>
            {(() => {
              switch (userType) {
                case "SUPER":
                  return "Administrator";
                case "NORMAL":
                  return "User";
                case "FORBIDDEN":
                  return "Forbidden";
              }
            })()}
          </div>
        </Stack>
        <Stack justifyContent={"space-evenly"}>
          <Button
            variant="outlined"
            className="admin__user-card__btn"
            onClick={() => setIsDialogOpen(true)}
          >
            Passwd
          </Button>
          <Button
            variant="outlined"
            className="admin__user-card__btn"
            color={userType === "FORBIDDEN" ? "success" : "error"}
            onClick={handleChangeUserType}
            disabled={userType === "SUPER"}
          >
            {userType === "FORBIDDEN" ? "Unlock" : "Lock"}
          </Button>
        </Stack>
      </Stack>{" "}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are modifying the password of
            <span style={{ marginLeft: "0.3em", color: "red" }}>{account}</span>
            . <br />
            The original password is {passwd}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="new-passwd"
            label="New Passwd"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPasswdNew(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handlePasswdChange}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function UserController() {
  const {
    isSuccess,
    data: userList,
    refetch,
  } = useQuery({
    queryKey: ["admin", "getAllUser"],
    queryFn: getAllUsers,
    ...defaultQueryOptions,
    refetchOnMount: true,
  });

  if (!isSuccess) {
    return (
      <Container sx={{ width: "100px", mt: "40px" }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Stack>
      {userList.map((user, index) => {
        return (
          <UserCard
            userInfo={user}
            key={`admin_user${index}`}
            refetch={async () => {
              await refetch();
            }}
          />
        );
      })}
    </Stack>
  );
}
