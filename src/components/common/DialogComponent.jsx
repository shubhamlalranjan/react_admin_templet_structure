import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from "@material-ui/core";

export default function AlertDialog({ open, DialogContainer, handleClose }) {
  return (
    <div>
      <Dialog
        maxWidth='lg'
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogContent>
          <DialogContainer />
        </DialogContent>
      </Dialog>
    </div>
  );
}
