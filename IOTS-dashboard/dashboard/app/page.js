"use client"; //do not remove pls

// import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
// import * as Realm from "realm-web";
// import { mongodbContext } from "./MongoHandler";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


// Create the Application

// Define the App component

const HomePage = () => {
  // Set state variables
  
  // This useEffect hook will run only once when the page is loaded and when
  // mongodb connection is established
  const { mongodb, user, permission, app } = useContext(mongodbContext);

  function write() {
    if (mongodb) {
      //dont run watch when mongodb connection is not established
      const collection = mongodb.db("IOTS_dashboard").collection("iot"); //insert into collection
      collection.insertOne({
        timestamp: new Date(),
        value: 1234567,
        owner_id: user
      });
    } else {
      alert("Mongodb connection not established. Please try again");
    }
  }
 

  // Return the JSX that will generate HTML for the page
  return (
    <div>
        homepage
        <button onClick={write}>write</button>
    </div>
    // <div className="App">
    //   {!!user  && ( //check if user is loaded
    //     <Card sx={{ minWidth: 275 }}>
    //       <CardContent>
    //         <Typography variant="h5" gutterBottom>
    //           Number Of People
    //         </Typography>
    //         <Typography variant="body2">
    //           {!!events ? (
    //             <div>
    //               {events.fullDocument.value}
    //               <br />
    //               {Date(JSON.stringify(events.fullDocument.timestamp))}
    //             </div>
    //           ) : (
    //             "Waiting for update"
    //           )}
    //           {/* {events?.fullDocument.timestamp} */}
    //           {console.log(events)}
    //         </Typography>
    //       </CardContent>
    //     </Card>
    //   )}
    //   <button onClick={write}>write</button>
    // </div>
  );
};

export default HomePage;
