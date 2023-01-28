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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Grid, IconButton } from "@mui/material";

//for hashing password
import crypto from "crypto-js";

export default function EditDevice({
  handlePopup,
  open,
  user,
  mongodb,
  device,
}) {
  const [name, setName] = React.useState("");
  const [regenId, setRegenId] = React.useState(false); // request to regenerate deviceId
  const [deviceId, setDeviceId] = React.useState("");
  const [changePass, setChangePass] = React.useState(false); //request to change password
  const [password, setPassword] = React.useState("");
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [editLoading, setEditLoading] = React.useState(false);
  const [idPopup, setIdPopup] = React.useState(false); // second popup to say the device id

  const handleIdPopup = () => {
    setIdPopup(!idPopup);
  };

  React.useEffect(() => {
    if (device) {
      setName(device.name);
      setDeviceId(device["device_id"]);
    }
  }, [device]);

  const edit = () => {
    setEditLoading(true);
    if (user) {
      //dont run write when user connection is not established with mongodb
      if (password.length > 5 || !changePass) {
        // const device_id = "" + Math.floor(Math.random() * 100000 + 10000);
        // setDeviceId(device_id);
        const collection = mongodb.db("IOTS_dashboard").collection("iot"); //insert into collection
        let update;
        const hashedpassword = crypto
            .PBKDF2(password, process.env.NEXT_PUBLIC_SALT, {
              keySize: 256 / 32,
              iterations: 1000,
            })
            .toString();
        if (changePass) {
          //user wants to change password only
          update = {
            name: name,
            password: hashedpassword,
            timestamp: new Date(),
          };
        } else if (changePass && regenId) {
          // user wants to change password and regenerate device id
          const device_id = "" + Math.floor(Math.random() * 100000 + 10000);
          setDeviceId(device_id);
          const hashedpassword = crypto
            .PBKDF2(password, process.env.NEXT_PUBLIC_SALT, {
              keySize: 256 / 32,
              iterations: 1000,
            })
            .toString();
          update = {
            name: name,
            password: hashedpassword,
            device_id,
            timestamp: new Date(),
          };
        } else if (regenId) {
          // user wants to regenerate device id only
          const device_id = "" + Math.floor(Math.random() * 100000 + 10000);
          setDeviceId(device_id);
          update = {
            name: name,
            device_id,
            timestamp: new Date(),
          };
        } else {
          // user just wants to change name
          update = {
            name: name,
            timestamp: new Date(),
          };
        }
        console.log(update);
        collection
          .updateOne(
            { _id: device["_id"] },
            {
              $set: update,
            }
          )
          .then(() => {
            regenId ? handleIdPopup() : handlePopup();
            alert("Successfully updated");
            window.location.reload();
          })
          .catch((err) => {
            if (err.toString().search("duplicate")) {
              edit(); //run edit function again to get a new device id because the one generated was a duplicate
            } else {
              alert("Unexpected error. Please try again");
              console.log(err);
            }
          });
      } else {
        alert("Password must be longer than 5");
      }
    } else {
      alert("Mongodb connection not established. Please try again");
    }
    setEditLoading(false);
  };

  const deleteDevice = () => {
    setDeleteLoading(true);
    if (confirm("Are you sure you want to delete this device") === true) {
      const query = { _id: device["_id"] };
      const collection = mongodb.db("IOTS_dashboard").collection("iot"); //insert into collection
      collection // delete device selected from this collection in the database
        .deleteOne(query)
        .then((result) => {
          console.log(`Deleted ${result.deletedCount} item.`);
          alert("Successfully deleted");
          handlePopup();
          window.location.reload();
        })
        .catch((err) => {
          console.error(`Delete failed with error: ${err}`);
          alert("Error deleting. Please try again");
        });
    }
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
            <Stack
              direction={"row"}
              justifyContent="flex-start"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={regenId}
                    onChange={(e) => setRegenId(e.target.checked)}
                  />
                }
                label="Regenerate Device ID"
              />
              <Box>{deviceId}</Box>
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(deviceId);
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Stack>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopup}>Cancel</Button>
          <LoadingButton
            loading={editLoading}
            variant="contained"
            onClick={edit}
          >
            Edit
          </LoadingButton>
        </DialogActions>
        <DialogContent>
          <Stack justifyContent="center" alignItems="center">
            <LoadingButton
              color="error"
              loading={deleteLoading}
              startIcon={<DeleteIcon />}
              variant="contained"
              onClick={deleteDevice}
            >
              Delete
            </LoadingButton>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog open={idPopup} onClose={handleIdPopup}>
        <DialogTitle>Device ID</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid justifyContent="center" alignItems="center" spacing={4}>
              <div>
                Your device has been successfully been updated. This is your
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
