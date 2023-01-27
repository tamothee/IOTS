"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import { FormControlLabel, FormGroup } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

export default function EditDevice({ handlePopup, open }) {
  const [name, setName] = React.useState("");
  const [regenId, setRegenId] = React.useState(false); // request to regenerate deviceId
  const [deviceId, setDeviceId] = React.useState("");
  const [changePass, setChangePass] = React.useState(false); //request to change password
  const [password, setPassword] = React.useState("");
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [editLoading, setEditLoading] = React.useState(false);

  const edit = () => {
    setEditLoading(true);
  };
  const deleteDevice = () => {
    setDeleteLoading(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={handlePopup}>
        <DialogTitle>Edit device</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit your device, please fill up the forms below.
          </DialogContentText>
          <FormGroup>
            <TextField
              autoFocus
              margin="dense"
              id="name-input"
              label="Name"
              fullWidth
              variant="standard"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <Stack
              direction={"row"}
              justifyContent="center"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={changePass}
                    onChange={(e) => setChangePass(e.target.checked)}
                  />
                }
                label="Change Password"
              />
              <TextField
                autoFocus
                margin="dense"
                id="password-input"
                label="Password"
                fullWidth
                variant="standard"
                disabled={!changePass}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Stack>
            <FormControlLabel
              control={
                <Checkbox
                  checked={regenId}
                  onChange={(e) => setRegenId(e.target.checked)}
                />
              }
              label="Regenerate Device ID"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopup}>Cancel</Button>
          <Button onClick={handlePopup}>Edit</Button>
          <LoadingButton
            loading={editLoading}
            variant="contained"
            onClick={edit}
          >
            Edit
          </LoadingButton>
        </DialogActions>
        <DialogContent >
          <LoadingButton
            color="error"
            loading={deleteLoading}
            startIcon={<DeleteIcon />}
            variant="contained"
            onClick={deleteDevice}
          >
            Delete
          </LoadingButton>
        </DialogContent>
      </Dialog>
    </div>
  );
}
