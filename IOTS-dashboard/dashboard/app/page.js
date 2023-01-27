"use client"; //do not remove pls

// import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
// import * as Realm from "realm-web";
import { mongodbContext } from "./MongoHandler";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { CardActionArea } from "@mui/material";
import EditDevice from "../components/EditDevice";
import AddDevice from "../components/AddDevice";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Stack } from "@mui/system";

const HomePage = () => {
  // Set state variables
  const { mongodb, user, app } = useContext(mongodbContext);
  const [devices, setDevices] = useState(); // user devices registered
  const [openEditPopup, setEditPopup] = useState(false); //popup state for edit
  const [openAddPopup, setAddPopup] = useState(false); // popup state for add

  const getUserData = async () => {
    try {
      //connect to database using credentials from mongohandler
      const collection = mongodb.db("IOTS_dashboard").collection("iot"); // Everytime a change happens in the stream, add it to the list of events
      const devices = await collection.find({});
      setDevices(devices);
    } catch (err) {
      console.error("Failed to log in", err.message);
    }
  };

  // for opening and closing popup
  const handleEditPopup = () => {
    setEditPopup(!openEditPopup);
  };

  // for opening and closing popup
  const handleAddPopup = () => {
    setAddPopup(!openAddPopup);
  };

  // run when page first renders and when mongodb changes
  // this useeffect is used to retrieve the user devices
  useEffect(() => {
    if (mongodb) {
      //dont run watch when mongodb connection is not established
      getUserData();
    }
  }, [mongodb]);

  // Return the JSX that will generate HTML for the page
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "10px" }}>
        <Link
          style={{ color: "inherit" }}
          underline="hover"
          color="inherit"
          href="/"
        >
          Home
        </Link>
      </Breadcrumbs>
      <div>
        <Stack direction={"row"} spacing={2} style={{ marginBottom: "20px" }}>
          <Button variant="contained" onClick={handleAddPopup}>
            Add new device
          </Button>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
        </Stack>
        {!devices && <>loading...</>}{" "}
        {/* show loading when devices are not shown */}
        {!!user &&
          !!devices && //check if user and devices is loaded to prevent error when running an undefined variable
          devices.map((device) => {
            return (
              <Card sx={{ minWidth: 275 }} style={{ marginBottom: "10px" }}>
                <CardActionArea onClick={handleEditPopup}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Device Name: {device.name}
                    </Typography>
                    <Typography variant="body1">
                      Device ID: {device["device_id"]}
                    </Typography>
                    <Typography variant="body2">
                      {/* Last updated at: {Date(JSON.stringify(device.timestamp))} */}
                      Last updated at: {device.timestamp.toLocaleDateString(undefined, options)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        <EditDevice
          handlePopup={handleEditPopup}
          open={openEditPopup}
          user={user}
          mongodb={mongodb}
        />
        <AddDevice
          handlePopup={handleAddPopup}
          open={openAddPopup}
          user={user}
          mongodb={mongodb}
        />
      </div>
    </div>
  );
};

export default HomePage;
