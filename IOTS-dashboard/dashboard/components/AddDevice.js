'use client'
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddDevice({ handlePopup, open, user, mongodb, getUserData }) {
  const [deviceId, setDeviceId] = React.useState("");
  const [password, setpassword] = React.useState("");
  const router = useRouter();

  function write() {
    if (user) {
      //dont run write when user connection is not established with mongodb
      if (password.length > 5) {
        const collection = mongodb.db("IOTS_dashboard").collection("iot"); //insert into collection
        collection.insertOne({
          timestamp: new Date(),
          password: password,
          owner_id: user.id,
          device_id: deviceId,
        });
        handlePopup();
        alert("Insert Successful!");
        getUserData();
      }
      else{
        alert("password not strong enough")
      }
    } else {
      alert("Mongodb connection not established. Please try again");
    }
  }

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
            id="deviceId-input"
            label="Device ID"
            type="number"
            fullWidth
            variant="standard"
            value={deviceId}
            onChange={(event) => {
              setDeviceId(event.target.value);
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
          <Button onClick={write}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
