<h1>SMART DOOR LOCK (IOTS PROJECT)</h1>

<h3>Introduction</h3>
The smart door lock project focus is on IOT security. From hardware to software it is supposed to adhere as much to tr64 as possible. The project features/functions were not our priority. 

<h3>Concept</h3>
The user will use a keypad to enter a code to unlock a door with a keypad to give instructions. For scalability, we have decided to let users configure their device settings through a website.
</br>

<h3>Components</h3>
<ul>
  <li>Hardware
    <ul>
      <li>esp32</li>
      <li>LCD with I2C</li>
      <li>Servo Motor</li>
    </ul>
  </li>
  <li>Website
    <ul>
      <li>NextJS</li>
      <li>ReactJS</li>
      <li>MongoDB</li>
      <li>Auth0</li>
    </ul>
  </li>
</ul>
<h3>How users are meant to operate and use the project</h3>
<h5>Setting up on the website</h5>
Users will need to set up their device to be connected to the database. To do that, the first thing a user will need to do is to register an account through the website. https://iots.vercel.app/ . After they signed in, they will click create a new device. They fill in the form then press create. Take not of the device id as you will need it later. You can create, read, update and delete your devices through the website.

<h5>Setting up on the door lock</h5>
After the user has created a new device in the website, they will go to the door lock and turn it on. After the door lock boots up, they will be prompted to add in the device id they got earlier on. 
</br>
</br>
Thats it! Your smart door is ready to work

<h3>TR64 Compliance Checklist</h3>

| TR64  | Compliance |
| ------------- | ------------- |
| Cryptographic Support  | CS-01, CS-02, CS-03, CS-04, CS-05  |
| Security Function Protection  | FP-01  |
| Identification & Authentication  | IA-01, IA-02, IA-03, IA-04  |
| Data Protection  | DP-02, DP-04  |
| Access Protection  | AP-01, AP-02, AP-05  |
| Security Management  |  MT-01, MT-02  |
| Resiliency Support  | RS-03, RS-04  |
| Security Audit  | AU-01, AU-02  |
| Lifecycle Protection  | LP-01, LP-02, LP-03, LP-05, LP-06, LP-07, LP-08, LP-09  |

<h3>Attack Surfaces</h3>
<h4>Webpage/Application</h4>
<h4>Web Server</h4>
<h4>ESP32</h4>

<h3>Documentation</h3>
<h5>Website</h5>
The website is hosted on vercel and is reachable via https://iots.vercel.app/ . It uses Auth0 to authenticate users and MongoDB is used to store user data.

<h6>To get started</h6>
