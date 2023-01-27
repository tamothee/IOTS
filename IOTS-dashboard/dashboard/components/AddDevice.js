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
import { Stack } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Grid, IconButton } from "@mui/material";

export default function AddDevice({ handlePopup, open, user, mongodb }) {
  const [password, setpassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [idPopup, setIdPopup] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [deviceId, setDeviceId] = React.useState("");

  async function write() {
    setLoading(true);
    if (user) {
      //dont run write when user connection is not established with mongodb
      if (password.length > 5) {
        try {
          const device_id = "" + Math.floor(Math.random() * 100000 + 10000);
          setDeviceId(device_id);
          const collection = mongodb.db("IOTS_dashboard").collection("iot"); //insert into collection
          await collection.insertOne({
            timestamp: new Date(),
            password: password,
            owner_id: user.id,
            device_id: device_id,
            name: name,
          });
          handleIdPopup();
          handlePopup();
        } catch (err) {
          if (err.toString().search("duplicate")) {
            write(); //run write function again to get a new device id because the one generated was a duplicate
          } else {
            alert("Unexpected error. Please try again");
            console.log(err);
          }
        }
      } else {
        alert("Password must be longer than 5");
      }
    } else {
      alert("Mongodb connection not established. Please try again");
    }
    setLoading(false);
  }

  const handleIdPopup = () => {
    setIdPopup(!idPopup);
  };

  return (
    <div>
      <Dialog open={open} onClose={handlePopup}>
        <DialogTitle>Add Device</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new device, please fill up the forms below.
          </DialogContentText>
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
          <TextField
            autoFocus
            margin="dense"
            id="password-input"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(event) => {
              setpassword(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopup}>Cancel</Button>
          <LoadingButton loading={loading} variant="contained" onClick={write}>
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog open={idPopup} onClose={handleIdPopup}>
        <DialogTitle>Device ID</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid justifyContent="center" alignItems="center" spacing={4}>
              <div>
                Your device has been successfully been inserted. This is your
                Device ID. <b> DO NOT SHARE THIS WITH ANYONE.</b> Put this ID in
                your device to pair with your account.
              </div>
              <Stack
                direction={"row"}
                justifyContent="center"
                alignItems="center"
              >
                <Box>{deviceId}</Box>
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(deviceId);
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Stack>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleIdPopup();
              window.location.reload();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
