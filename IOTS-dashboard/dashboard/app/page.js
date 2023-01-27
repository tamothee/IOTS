"use client"; //do not remove pls

// import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
// import * as Realm from "realm-web";
import { mongodbContext } from "./MongoHandler";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import { CardActionArea } from "@mui/material";
import EditDevice from "../components/EditDevice";
import AddDevice from "../components/AddDevice";

const HomePage = () => {
  // Set state variables
  const { mongodb, user, permission, app } = useContext(mongodbContext);
  const [devices, setDevices] = useState(); // user devices registered
  const [openEditPopup, setEditPopup] = useState(false); //popup state for edit
  const [openAddPopup, setAddPopup] = useState(false) // popup state for add

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

  function write() {
    if (mongodb) {
      //dont run watch when mongodb connection is not established
      const collection = mongodb.db("IOTS_dashboard").collection("iot"); //insert into collection
      collection.insertOne({
        timestamp: new Date(),
        password: 1234567,
        owner_id: user.id,
      });
    } else {
      alert("Mongodb connection not established. Please try again");
    }
  }

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
        <Button variant="contained" onClick={write}>
          Add new device
        </Button>
        {!!user &&
          !!devices && //check if user and devices is loaded to prevent error when running an undefined variable
          devices.map((device) => {
            return (
              <Card sx={{ minWidth: 275 }} style={{ marginBottom: "10px" }}>
                <CardActionArea onClick={handleEditPopup}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Device ID: {device["device_id"]}
                    </Typography>
                    <Typography variant="body2">
                      Last updated at: {Date(JSON.stringify(device.timestamp))}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        {openEditPopup && <EditDevice handlePopup={handleEditPopup} open={openEditPopup} />}
        {openAddPopup && <AddDevice handlePopup={handleAddPopup} open={openAddPopup} />}
      </div>
    </div>
  );
};

export default HomePage;
