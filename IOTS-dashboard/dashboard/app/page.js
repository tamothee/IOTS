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

// Create the Application

// Define the App component

const HomePage = () => {
  // Set state variables

  // This useEffect hook will run only once when the page is loaded and when
  // mongodb connection is established
  const { mongodb, user, permission, app } = useContext(mongodbContext);
  const [devices, setDevices] = useState();
  const [openPopup, setOpenPopup] = useState(false);

  const getUserData = async () => {
    try {
      //connect to database
      const collection = mongodb.db("IOTS_dashboard").collection("iot"); // Everytime a change happens in the stream, add it to the list of events
      const devices = await collection.find({});
      setDevices(devices);
    } catch (err) {
      console.error("Failed to log in", err.message);
    }
  };

  const handlePopup = ()=>{
    setOpenPopup(!openPopup)
    console.log('run', openPopup)
  }

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
        {!!user &&
          !!devices && //check if user is loaded
          devices.map((device) => {
            return (
              <Card sx={{ minWidth: 275 }} style={{ marginBottom: "10px" }}>
                <CardActionArea onClick={handlePopup}>
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
          {openPopup && <openPopup handlePopup={handlePopup} open={openPopup}/>}
        <button onClick={write}>write</button>
      </div>
    </div>
  );
};

export default HomePage;
