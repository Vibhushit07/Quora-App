import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { getDialogBox } from "../../Data/dialogBox";

export const DialogBox = (props) => {
  const content = getDialogBox();

  const handleAccept = () => {
    props.accept();
  };

  const handleReject = () => {
    props.reject();
  };

  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{content.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept} color="primary" autoFocus>
          {content.accept}
        </Button>
        <Button onClick={handleReject} color="primary">
          {content.reject}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
