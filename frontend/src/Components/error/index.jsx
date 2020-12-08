import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

import { getError, setError } from "../../Data/error";

export const Error = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setError({ code: "", message: "" });
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {getError().code} {getError().message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
