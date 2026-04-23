"use client";

import { Box, Dialog } from "@mui/material";
interface Props {
  open: boolean;

  handleClose: () => void;

  children: React.ReactNode;
  width?: string;
}

const IModal = (props: Props) => {
  return (
    <>
      <Dialog
        onClose={props.handleClose}
        open={props.open}
        fullWidth
        maxWidth="sm"
      >
        <Box sx={{ width: props.width, p: 3 }}>{props.children}</Box>
      </Dialog>
    </>
  );
};
export default IModal;
