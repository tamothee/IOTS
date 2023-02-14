<h1>SMART DOOR LOCK (IOTS PROJECT)</h1>

|  Name |  Admission ID  |
|  -------------  |  -------------  |
|  Leong Ming Liang Timothy  |  P1907799  |
|  Ron Tan Zi Yu |  P1908521  |
|  Tiamzon Joseph Martin |  P1907492  |

<h3>Concept</h3>
The user will use a keypad to enter a code to unlock the door. It also uses an LCD to give prompts to the user. Users will also be able to configure their device information through a website.
</br>

<h3>Components</h3>
<ul>
  <li>Hardware
    <ul>
      <li>Esp32</li>
      <li>4x4 Keypad</li>
      <li>I2C LCD 16x2 with PCF8574 IIC I2C Serial Interface Adapter</li>
      <li>SG90 Servo Motor</li>
      <li>12x Female-to-Male Jumper Wires</li>
      <li>3x Male-to-Male Jumper Wires</li>
      <li>Breadboard</li>
    </ul>
  </li>
  <li>Website
    <ul>
      <li>NextJS</li>
      <li>ReactJS</li>
      <li>Auth0</li>
      <li>Vercel</li>
    </ul>
  </li>
  <li>Database
    <ul>
      <li>Mongodb</li>
    </ul>
  </li>
</ul>

<h3>General Overview</h3>
<p align="center">
<img src="/img/diagram_flow.png" alt="diagram flow" width="70%" height="70%">
</p>

<h3>How users are meant to operate and use the product</h3>
<h5>Setting up on the website</h5>
Users will need to set up their device to be connected to the database. To do that, the first thing a user will need to do is to register an account through the website. https://iots.vercel.app/ . After they signed in, they will click create a new device. They fill in the form then press create. Take not of the device id as you will need it later. You can create, read, update and delete your devices through the website.

<h5>Setting up on the door lock</h5>
After the user has created a new device in the website, they will go to the door lock and turn it on. After the door lock boots up, they will be prompted to add in the device id they got earlier on. 
</br>
</br>
Thats it! Your smart door is ready to work

<h3>
OAuth 2.0 framework
</h3>
<p>
The implementation of our website follows the OAuth 2.0 framework. The user will first go through a <b>Authorisation Request</b> to Auth0. If the user is authorised, they will get a <b>Authorisation Grant</b> from Auth0. The user will then use the <b>Authorisation Grant</b> received to retrieve a <b>Access Token</b> from Auth0. The user can then use this <b>Access Token</b> to retrieve data from Mongodb. For a better user experience, Auth0 uses refresh token to silently retrieve a access token when it is expired without user intervention. This allows our user to stay authenticated in our application without needing to logging everytime. The access token expiry set in our application is 86,400 seconds (24 hours) and the refresh token expiry set is 2592000 seconds (30 days).
<p>

<p align="center">
<img src="/img/oauth2_diagram.jpg" alt="oauth2 diagram" width="70%" height="70%">
</p>

<h3>TR64 Compliance Checklist</h3>

|  TR64 Category  |  Compliance Request ID  |
| ------------- | ------------- |
| Cryptographic Support  | CS-01, CS-02, CS-03, CS-04, CS-05  |
| Security Function Protection  | FP-01, FP-02  |
| Identification & Authentication  | IA-01, IA-02, IA-03, IA-04  |
| Data Protection  | DP-02, DP-04  |
| Access Protection  | AP-01, AP-02, AP-04, AP-05  |
| Security Management  |  MT-01, MT-02  |
| Resiliency Support  | RS-03, RS-04  |
| Security Audit  | AU-01, AU-02  |
| Lifecycle Protection  | LP-01, LP-02, LP-03, LP-07, LP-09  |

<h3>Attack Surfaces</h3>
<h4>Attack Surface 1: Physical Attacks (ESP-32)</h4>
<h5>Vulnerabilities</h5>
<p>
Physically tampering with the door access system and injecting of external code into the microcontroller controlling the door system could potentially result in the whole system failing.
</p>
<h5>Assessment</h5>

|  Category  |  Description  |
|  --------  |  -----------  |
|  Damage  | An attack on the physical hardware would have a very high impact as the physical hardware is the core of the Door Access System.  |
|  Reproducability  | An attack on the hardware level would be very hard to reproduce as it would require the attacker to be physically present at the same location as the hardware  |
|  Exploitability  |   This attack would be considered as medium level exploitability since our product is already placed in a tamper-proof box to secure it.  |
|  Affected Users  |  The home owner would be the main affected user as it would compromise the entire security system, allowing anyone to enter the home of the home owner.  |
|  Discoverability  |  An attack at this level would be very high on the discoverability scale as this attack requires the home owner to be physically present at the site where the security system is, which in this case is the home.  |

<p align="center">
<img src="/img/OWaspVulnerabilityScore1.png" alt="Calculated Vulnerability Score 1" width="75%" height="75%">
</p>
<p>
CVSS:3.0/AV:P/AC:H/PR:H/UI:N/S:C/C:N/I:N/A:H
</p>

<h5>Mitigation</h5>
<p>
In order to mitigate this attack, physically securing the Door Access System with proper procedures would be recommended. In order to achieve this, we created a tamper proof enclosure for the ESP-32 microcontroller so that it would be very difficult for them to inject their own code and tamper with the microcontroller.

</p>



<h4>Attack Surface 2: ESP-32 Network Attack</h4>
<h5>Vulnerabilities</h5>
<p>
Intercepting of packets being sent from the "Door Access" terminal to the secure endpoint on MongoDB would result in the Personal Identifiable Information (PII/SPI) being leaked to the threat actor as they would be able to know the specific time as to when the home owner leaves and returns.
</p>
<h5>Assessment</h5>
<p>

|  Category  |  Description  |
|  --------  |  -----------  |
|  Damage  | An attack at this level would be be very low risk as there are proper security procedures implemented into this. For example, packets are sent through using TLS, meaning that it is very hard for hackers to identify and decrypt the Personal Identifiabe Information.  |
|  Reproducability  |  In order to reproduce this type of attack, it would be very easy. However, the exploitaility of this attack is not easy.  |
|  Exploitability  |  This attack has a medium level exploitability as it would require a specific skillset from the threat actor in order to perform this successfully.  |
|  Affected Users  |  Home Owners are the only users that would be affected.  |
|  Discoverability  |  Discovering a vulnerability in order to perform an eavesdropping attack would be considered low since it is not very easy to find a vulnerability to intercept the packets.  |

<p align="center">
<img src="/img/OWaspVulnerabilityScore2.png" alt="Calculated Vulnerability Score 2" width="75%" height="75%">
</p>
<p>
CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:N/A:N 
</p>

<h5>Mitigation</h5>
<p>
In order to mitigate this attack, we chose to encrypt the data at rest as well as the data in transit. The data at rest is encrpted using the PBKDF2 algorithm and the data in transit is encrypted using TLS. This way, even if there was an attacker listening on the packets being transmitted, they would have to find out the encryption algorithm and decrypt the packet before being able to identify the data.
</p>



<h4>Attack Surface 3: Database Attacks (MongoDB)</h4>
<h5>Vulnerabilities</h5>
<p>
Breach of Administrator account credentials. With a breached administrator account, the threat actor would have a full access to the Mongo Database which consists of all the information of end users.
</p>
<h5>Assessment</h5>

|  Category  |  Description  |
|  --------  |  -----------  |
|  Damage  | The damage would be high if the administrator account were to be accessed by a threat actor. This is because the administrator has full access to all the data that resides in the database and is able to configure all the server settings |
|  Reproducability  | The reproducability is would be considered high if the threat actor has found the credentials of the administrator account as they have full access to the database and can make changes as and when they please |
|  Exploitability  | The exploitability would be considered as low since the administrator account for the MongoDB database is securely protected with the use of social logins and 2 factor authentication. The social login also consists of a strong password, reducing the possibility of having a breached administrator account. |
|  Affected Users  | An attack on the database would affect all users, including the Administrator and all end-users  |
|  Discoverability  | The discovery of an IoT threat at this level would be considered as low as we have proper procedures in place to prevent a breached user account from having too much of an impact. |

<p align="center">
<img src="/img/OWaspVulnerabilityScore3.png" alt="Calculated Vulnerability Score 3" width="75%" height="75%">
</p>
CVSS:3.0/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:H
</p>

<h5>Mitigation</h5>
<p>
The best mitigation techniques would be implementing social logins that make use of 2 factor authentication, creating a strong password for the social login account, limiting the amount of people that have administrator privileges and having an audit log for important events such as authentications. The main purpose of implementing a strong password would be to minimize the risk of having a compromised password. Having a 2 factor authentication on top of the strong password would act as a gateway to the account, reducing the impact of a compromised user account. Limiting the number of administrator accounts would then help limit the number of potential compromised administrator accounts, reducing the risk of having an administrator account be compromised. 
<p align="center">
<img src="/img/AttackSurface3.png" alt="Atack Surface 3" width="75%" height="75%">
</p>
</p>



<h4>Attack Surface 4: Web Server Attacks (Vercel)</h4>
<h5>Vulnerabilities</h5>
<p>
Distributed Denial of Service (DDoS) of the Vercel webserver to take down the entire website. This attack would have a big impact on <b>availability</b> as the website will become inaccessible to all end-users. 
</p>
<h5>Assessment</h5>

|  Category  |  Description  |
|  --------  |  -----------  |
|  Damage  | An attack of a web server attack would be considered as a middle damage level attack as it would completely prevent users from CRUD functions (Create, Read, Update and Delete functions). This would result in the end-users being unable to change any configuration related to their security system.  |
|  Reproducability  |  In order to reproduce an attack at this level, it would be extremely difficult as Vercal has taken proper precautions to prevent high level threats such as DDoS which could reflect badly on the companys reputation  |
|  Exploitability  |  To perform a DDoS at such a large scale, one that is able to take down a major cloud hosting such as Vercel, the threat actor would be required to be highly skilled and knowledgeable. They would also be require to make use of a extremely large number of zombies  |
|  Affected Users  |  All users would be affected if Vercel were to be taken down as it would prevent them from being able to access and view their cloud based dashboards, which prevents them from using CRUD functions.  |
|  Discoverability  |  It is not easy to discover how perform a DDoS attack that would work on major cloud hosts such as Vercel due to the security precautions that are already in place. |

<p align="center">
<img src="/img/OWaspVulnerabilityScore4.png" alt="Calculated Vulnerability Score 4" width="75%" height="75%">
</p>
CVSS:3.0/AV:N/AC:H/PR:H/UI:N/S:C/C:H/I:H/A:H

<h5>Mitigation</h5>
<p>
Proper mitigation techniques for this type of attack would be an automatic identification of any and all suspicious activities from users as well as black listing of the User/IP addresses that may be considered as attempting any malicious activities. 
<p align="center">
<img src="/img/AttackSurface4.png" alt="Attack Surface 4" width="75%" height="75%">
</p>
CVSS:3.0/AV:N/AC:H/PR:H/UI:N/S:C/C:H/I:H/A:H
</p>


<h4>Attack Surface 5: Web Application Attacks (Auth0)</h4>
<h5>Vulnerabilities</h5>
<p>
One of the most common IoT attacks on web applications that require authentications would be brute force attack. Brute force attack is the act where the threat actor constantly attempts to get into the system by guessing the user credentials on the website application.
</p>
<h5>Assessment</h5>

|  Category  |  Description  |
|  --------  |  -----------  |
|  Damage  | The damage would be considered high for this attack as the threat actor would be able to reconfigure the settings of the home owner, potentially allowing the threat actor to get into the home of the account owner.  |
|  Reproducability  |  The reproducability of this attack would be considered as low since there are proper precautions in place to prevent such attacks. Some examples would be a restriction and notification alert sent to the account owner if there was a number of failed attempts. |
|  Exploitability  |  A brute force attack would be considered as low exploitability since it required a large amount of effort and time to enter each potential password.  |
|  Affected Users  |  The only affected user would be the end-user whose account was breached by this attack.  |
|  Discoverability  |  It does not difficult for a threat actor perform a brute force attack as it requires little to no knowledge about IoT attacks.  |

<h5>Mitigation</h5>
<p>
Recommended mitigation techniques for this attack would include an alert and locking of the account after a set number of failed attempts. This has been implemented as part of Auth0's compliance. An additional method in preventing this attack would be the implementation of 2FA. With the use of 2FA, if the threat actor were to successfully authenticate themselves with the use of the username and password, they would still require authentication from the 2nd factor, which is highly unlikely.
</p>
<p align="center">
<img src="/img/OWaspVulnerabilityScore5.png" alt="Calculated Vulnerability Score 5" width="75%" height="75%">
</p>
CVSS:3.0/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:L
</p>
<h3>Compliance Lists</h3>
<h4>Webpage Compliance List</h4> 
<i>TR64 Req IDs: CS-02; FP-02; IA-01;RS-03;MT-02</i>

|  TR64 Req ID  |  Explanation  |
|  -------------  |  -------------  |
|  CS-02;IA-01  |  User created passwords for Auth0 are hashed using bcrypt.  |
|  FP-02  | FP-02: Website application configuration variables are stored under vercel environment variables which are encrypted via AES256  |
|  RS-03  |  Web server is secured by vercel with security grade procedures. Able to withstand malicious threats such as Denial of Service (DoS) and Distributed Denial of Service (DDoS).  |
|  MT-02  |  Users are only able to create, read, update and delete their own data so to uphold confidentiality and that data will not be tampered by unauthorized users.  |



<h4>MongoDB Atlas Compliance List</h4>
<i>TR64 Req IDs: CS-01;CS-04;CS-05;FP-01;DP-04;RS-04;AU-01;AU-02;MT-02 </i></br>

|  TR64 Req ID  |  Explanation  |
|  -------------  |  -------------  |
|  CS-01  |  API keys are generated by Mongo.  |
|  CS-04  |  RS256 asymmetric encryption algorithm is used to sign Json Web Tokens (JWTs) for authentication to web application.  |
|  CS-05;FP-01  |  API Keys are created for trusted endpoints and are fully managed by MongoDB with industrial grade security features.  |
|  DP-04  |  Role based access is assigned for different users.  |
|  RS-04  |  MongoDB Atlas provides a tool that enables backups of the entire database to be created easily. The backup can be used for disaster recovery in the event of an IoT attack.  |
|  AU-01;AU-02  |  Audit log consists of all entries, including Create, Read, Update and Delete (CRUD) as well as any successful or unsuccessful authentications. Audit logs are also secured and tamper proof. Only the authorized user with the proper credentials/API key would be able  to access it.  |
|  MT-02  |  Role based access is granted to specific users such that there are no over privileged accounts, which poses as a IoT security vulnerability.  |

<p align="center">
<img src="/img/RoleBased.png" alt="RoleBased" width="75%" height="75%">
<i>User dashboard view only consists of personal devices</i>
</p>
<p align="center">
<img src="/img/AuditLog.jpg" alt="Audit Log" width="75%" height="75%">
<i>Audit Log for CRUD and Authentications</i>
</p>
<p align="center">
<img src="/img/UserDatabaseSave.jpg" alt="User Database Save" width="75%" height="75%">
<i>Saving of user does not include saving of PIIs</i>
</p>


<h4>Auth0 Compliance List </h4>
<i>TR64 Req IDs: CS-05;MT-01;IA-01;IA-02;IA-03;IA-04;DP-02;AP-01;AP-02;AP-05</i> </br>

|  TR64 Req ID  |  Explanation  |
|  -------------  |  -------------  |
|  CS-05;IA-01  |  Passwords created for specific user accounts are hashed using bcrypt before being stored in the Auth0 database separate from our resource database (Mongodb) following OAuth 2.0 to ensure <bold>confidentiality</bold> of user credentials.  |
|  IA-02  |  Authentication to web server has a set session expiry of 7 days before the user is prompted to sign in again.  |
|  IA-03  |  Unique tokens are generated and assigned to users using JWTs to guarantee the Authenticity of users.  |
|  IA-04;AP-02;MT-01  |  Users are required to create a complex password upon signing up. 2 factor authentication is also required for users who sign in using third-party applications such as Google or Microsoft Account.  |
|  DP-02  |  Digital signatures are created using RS256 to sign Json Web Tokens for <b>Non-Repudiation</b> and <b>Integrity</b>, making sure the content has not been tampered with.  |
|  AP-01  |  Failure to enter password consecutively would result in an account lockout followed by blocking of the suspected user IP Address. Account owner would also be notified of the suspicious activity and given a choice to unblock the IP Address.  |

<h4>ESP32</h4> 
<i>TR64 Compliance List: CS-02;IA-01;AP-04</i> </br>

|  TR64 Req ID  |  Explanation  |
|  -------------  |  -------------  |
|  CS-02;IA-01  |  We used a cryptographic algorithm (PBKDF2) to hash the device password with salt for better <b>confidentiality</b>.  |
|  AP-04  |  In order to prevent threat actors from physically accessing the microcontroller, which is the core of the physical system, we created a tamper-resistant box which is used to hold the microcontroller  |

<h4>System Wide Compliance List</h4>
<i>TR64 Compliance List: LP-01;LP-02;LP-03;LP-07;LP-09</i> </br>

|  TR64 Req ID  |  Explanation  |
|  -------------  |  -------------  |
|  LP-01  |  Threat modelling was performed and used to improve our security features based on the DREAD  threat modelling method  |
|  LP-02  |  System was designed using the secure systems engineering approach. Minimal inputs are taken from users, system was designed to be as simplified as possible and permissions are only granted as and when required.  |
|  LP-03  |  System was constructed using components provided by Singapore Polytechnic. Components were presumably sourced from a authorized seller.  |
|  LP-07  |  Penetration testing for the cloud services are done by the service providers upon new updates and releases. Penetration testing for the ESP-32 data transmission was done with Kali Linux by legal means and under a controlled environment.  |
|  LP-09  |  MongoDB manages all the user data for authenticated clients and Auth0 helps to provide certificates to allow proper authentication for all authorized clients.  |

<h3>Security Testing of IoT Product</h3>
<p>For the Security Testing portion, we have come up with two separate methods that would successfully penetrate the developed IoT Product.</p>

<h4>Method 1: Distributed Denial of Service Attack</h4>
<p>
For method 1, we would be performing a Distributed Denial of Service Attack (DDoS). This attack has a sole purpose of denying the end user from being able to access the IoT Device, completely stopping the Smart Door System from working. For this DDoS attack, we would be flooding the network address with an absurd amount of traffic to the point where the IoT Devices would not be able to receive any incoming commands from the IoT Gateway.
</p>
<h5>Step 1: Access the network of the target IoT Device </h5>
<p>
Access Kali and kill all processes using the WiFi interface

`airmon-ng check kill`

Start the network adapter in monitor mode and view all nearby access points to identify target network.
<p align="center">
<img src="/img/AllNearbyAP.jpg" alt="All Nearby AP" width="75%" height="75%">
</p>
View all the clients that are connected to the network

`airodump-ng -c 1 --bssid 80:35:C1:13:C1:2C -w /root wlan0mon`

Deauthenticate all clients from the network in order to get them to re-authenticated themselves. While clients attempt to re-authenticate themselves, we would be able to capture the WPA handshake.

`aireplay-ng -0 10 -a 80:35:C1:13:C1:2C wlan0mon`

After obtaining the handshake, compare the handshake with a dictionary consisting of all common passwords.

`aircrack-ng -a2 -b 80:35:C1:13:C1:2C -w /root/passwords.txt /root/hacking-01.cap`

<p align="center">
<img src="/img/ObtainedKey.jpg" alt="Obtained Key" width="75%" height="75%">
</p>
</p>

<h5>Step 2: Identify the target IoT Device </h5>
<p>
After gaining access to the same network as the IoT device, we would be able to scan the network using third-party softwares such as "Advanced IP Scanner" to identify the device we are trying to attack. In this case, it would be the device under the manufacturer "Espressif Systems".
<p align="center">
<img src="/img/AdvancedIPScanner.png" alt="Advanced IP Scanner" width="75%" height="75%">
</p>

</p>
<h5>Step 3: Perform the Attack </h5>
<p>
After we successfully identified the IP address of the target IoT device, we would be able to perform the Distributed Denial of Service attack by flooding the network with hping or with the use of zombies. 

`sudo hping3 "192.168.9.92" -q -n -d 120 -S -p 8883 --flood --rand-source`

An alternative way to make use of the device would be to convert the Smart Door System into a Zombie for DDoS attacks on the internal network. Since we have attained access to the IoT Device, we could turn it into an IoT threat for the rest of their network, completely breaking down the home network of the end user.</br>
For a guide on how to set up zombies, see here https://www.geeksforgeeks.org/slowloris-ddos-attack-tool-in-kali-linux/.

</p>

<h4>Method 2: Man in the Middle Attack</h4>
<p>
For method 2, we are going with the assumption that the IoT Device has been mass produced and deployed. This would result in the product connecting to the Access Points to gain access to the internet. As such, another threat that the IoT product faces would be Man in the Middle Attacks (MITM). For MITM attacks, there would be a fake access point that would be identical to that of the real one, causing the end user to misinterpret the fake access point as the real one and connecting to it, sending their personal data directly to the threat actor.
<p align="center">
<img src="/img/MITM.png" alt="MITM" width="75%" height="75%">
</p>
</p>
<h5>Step 1: Identify the network of the target IoT Device </h5>
<p>
Follow the guide provided for Method 1 Step 1.
</p>

<h5>Step 2: Create a fake access point using WiHotspot </h5>
<p>
After identifying the network access point details, create a fake access point using any of the preferred tools such as wifiphisher. In this case, we will be using wihotspot, which is a GUI based tool. </br>
In the GUI of wihotspot, set the SSID and password of fake access point to be that of the real one and click on create. This will create the fake access point which will act as a bait for the end user to connect to.
<p align="center">
<img src="/img/FakeAccessPoint.png" alt="Fake Access Point" width="75%" height="75%">
</p>
After setting up the fake access point, it would show up alike any other hotspots or available access points. To speed up the process, we would de-authenticate all the users that are currently connected to the real access point. This would increase the chances of the end user connecting their IoT device to our fake access point that we have created. 

`aireplay-ng -0 10 -a 80:35:C1:13:C1:2C wlan0mon`

</p>

<h5>Step 3: Analyze incoming transmissions </h5>
<p>
After the users have connected to the fake access points, all the data that is intended to be sent to the cloud database will be sent to the threat actor instead. The last step would be to decrypt the received packets and we would have successfully obtained the private data of the end user.
</p>

<h3>Documentation (to run this system yourself)</h3>
<h4>Website</h4>
The website is hosted on vercel and is reachable via https://iots.vercel.app/ . The website is built on NextJS which is a meta ReactJS framework which allows developers to create full stack web application. It also uses MongoDB as a database to store the user device information and Auth0 to handle user authentication and storing of user information.

<h5>Website dependency</h5>
<ul>
<li>next (Framework built for full stack ReactJS web application) </li>
<li>next auth (Handle authentication and middleware of the website)</li>
<li>MUI (Design library)</li>
<li>cypto-js (Cyptography library for the PBKFD2 hashing client side)</li>
<li>ReactJS</li>
</ul>

<h5>To get started</h5>
<ol>
  <li>
  You will need to have nodejs installed. Go over to https://nodejs.org/en/ to install nodejs
  </li>
   <li>
  Clone this repository or download the zip file
  </li>
  <li>
  Open it up using visual studio code or equivalent and go to the root path of the dashboard which is /IOTS/IOTS-dashboard
  </li>
  <li>
  From here you can choose to either run it in localhost mode or push it to the cloud. 
  <br/>
  <b>If you want to push it to the cloud</b>
    <ol>
      <li>
      Create a new github repository and push the code to the repository
      </li>
      <li>
      Create a vercel account and link it to your github https://vercel.com/
      </li>
      <li>
      After signing in to vercel, go to add <b>new project</b>
      </li>
      <li>
      Import the repository that you created
      </li>
      <li>
      Select the NextJS under the <b>Framework Preset</b>
      </li>
      <li>
      Ensure that the <b>Root Directory is the root path of the website</b>
      </li>
      <li>
      Then click deploy
      </li>
      <li>
      All codes that are commited to github will be rebuilt and redeployed on vercel.
      </li>
    </ol>
    <b>If you want to run it locally using localhost</b>
      <ol>
      <li>
       Go to the root path of the website locally from your terminal in visual studio code or equivalent
      </li>
      <li>
       Type in npm run dev
      </li>
      <li>
       Open your browser and go to http://localhost:3000/
      </li>
      <li>
       You should see the website running
      </li>
      </ol>
    </li>
    <li>
    Now you need to create a new Auth0 account https://auth0.com/
    </li>
    <li>
    Login to auth0 
    </li>
    <li>
    Go to applications and create a new application
    </li>
    <li>
    Select Regular Web Application
    </li>
    <li>
    Take note of the <b>Client ID</b> and <b>Client Secret</b>
    </li>
    <li>
    Scroll down to <b>Allowed Callback URLs</b>
    </li>
    <li>
    Add in  https://YOUR-VERCEL-APP-URL/api/auth/callback/auth0, http://localhost:3000/api/auth/callback . You do not need to add in the first one if you did not push       the code to vercel
    </li>
    <li>
    Scroll down and save your changes
    </li>
    <li>
    Now you need to create your MongoDB database
    </li>
    <li>
    Head over to https://www.mongodb.com/ and create a new account
    </li>
    <li>
    Create a new project and name it IOTS
    </li>
    <li>
    Create a new cluster and select <b>shared</b> and change the cluster name to IOTS-database
    </li>
    <li>
    Go to browse collection of IOTS-database
    </li>
    <li>
    Go to collections tab and create a new database
    </li>
    <li>
    Go to collections tab and create a new database
    </li>
    <li>
    Name the <b>database name</b> as IOTS_dashboard and the <b>Collection name</b> as users
    </li>
    <li>
    Hover over IOTS_dashboard and create another collection and name it as users
    </li>
    <li>
    Go over to App Services
    </li>
    <li>
    Go to Authentication tab
    </li>
    <li>
    Click on edit for <b>Custom JWT Authentication</b> 
    </li>
    <li>
    Enable the provider and select <b>Use a JWK URI</b>
    </li>
    <li>
    Under <b>JWK URI</b> go back to auth0 application settings and scroll all the way down to advanced settings
    </li>
    <li>
    Go to the <b>Endpoints</b> tab and copy the JSON Web Key Set. It should look something like https://YOUR-TENANT/.well-known/jwks.json
    </li>
    <li>
    Go back to the MongoDB and paste what you copied to the JWK URI
    </li>
    <li>
    Go to trigger and add a new trigger
    </li>
    <li>
    Set the trigger type to Authentication
    </li>
    <li>
    Name the Trigger AddUserToDatabase
    </li>
    <li>
    Set your <b>Cluster name</b> to IOTS-database
    </li>
    <li>
    Set your <b>Database name</b> to IOTS-dashboard
    </li>
    <li>
    Set your <b>Collection name</b> to users
    </li>
    <li>
    Scroll down and click on <b>select a function</b> and create a new function
    </li>
    <li>
    Name the function addUserToDatabase
    </li>
    <li>
    Copy this code and place it in the function
    
```javascript
exports = function(authEvent) {
  const user = authEvent.user;
  const mongodb = context.services.get("IOTS-database");
  const usersCollection = mongodb.db("IOTS_dashboard").collection("users");
  usersCollection.insertOne({
    ...user
  });
};
```
</li>
    <li>
    Save it and go back to the <b>Authentication</b> tab
    </li>
    <li>
    Click on edit for the API Keys and create a new API Key and name it Door_Auth. Save the API key somewhere safe as you will not see it again. This will be your API key that you will use for the esp32 query
    </li>
    <li>
    While you are saving the api key, on the sidebar, at the top, there is a copy icon. Click on it as save it as that is your app id and you will need it later
    </li>
    go back to the auth0
    <li>
    Go over to APIs and create a new API
    </li>
    <li>
    Name it whatever you want and the identifier is the mongodb app id which you saved and the click create
    </li>
    <li>
    Now if you are running the code on localhost, create a <b>.env</b> file at the <b>root directory</b>. If you are using vercel go over to <b>settings</b> and <b>Environment Variables</b>. Then add this into your env either on vercel or your .env file in your root directory
    
```
AUTH0_CLIENT_ID = <Your auth0 application client ID>
AUTH0_CLIENT_SECRET = <Your auth0 application client secret>
AUTH0_ISSUER = https://<your auth0 application domain> 
NEXTAUTH_URL = <your website url either localhost or the vercel url>
NEXT_PUBLIC_APP_ID= <your mongodb app id that you saved>
AUTH0_AUDIENCE= <your mongodb app id that you saved>
NEXTAUTH_SECRET= <random secret of any length that you can use openssl to generate for you. would recommend 32 characters long>
NEXT_PUBLIC_SALT = <the salt that you will use to hash the users device password. would also recommend to use openssl and 32 characters long to generate the salt>
```
</li>
  <li>
    Go back to mongodb app services
  </li>
  <li>
    Go to HTTPS Endpoints and create a new HTTPS Endpoint 
  </li>
  <li>
    Set the route to be /doorauth
  </li>
   <li>
    Under <b>Operation Type</b> copy the url
  </li>
  <li>
    Set the <b>HTTP Method</b> to post
  </li>
  <li>
    Set the <b>Return Type</b> to JSON
  </li>
   <li>
    Under <b>Function</b> add a new function and copy this code
    
    
```javascript
exports = async function({ query, headers, body}, response) {
  const CryptoJS = require("crypto-js");

    const serialized = body.text();
    const data = JSON.parse(serialized);
    
    const {deviceId, userPassword} = data;
    console.log(deviceId);
    console.log(userPassword)
    const dbPassword = await context.services.get("IOTS-database").db("IOTS_dashboard").collection("iot").findOne(
    {device_id: deviceId},
    {password: 1}
    )
    console.log(dbPassword);
    
    console.log("dbpassword", dbPassword)
    
    if (dbPassword){
      console.log("not null")
       if (dbPassword.password === CryptoJS.PBKDF2(userPassword, "<Your salt that you generated just now>",  {
              keySize: 256 / 32,
              iterations: 1000,
            }).toString()){
              console.log("authorised")
         return "authorised"
       }
        return "Username or Password is invalid"
    }else{
      console.log('invalid')
      return "Username or Password is invalid";
    }

};

```
</li>
  <li>
  Go to your esp32 code and add the API key of the doorauth you saved just now as well as add your http endpoint url to the endpoint variable
  </li>
</ol>

<h5>Circuit Diagram</h5>
<p>The diagram below shows how the components are connected to create the circuit diagram. the tables shows the different pin connections to the Esp32 I/O pins.</p>
<p align="center">
<img src="/img/hardware_circuit_diagram.jpeg" alt="IOTS Circuit Diagram" width="70%" height="70%">
</p>
<h5>Esp32 Code</h5>
<ol>
  <li>Once the circuit has been set up, connect the Esp32 to the computer</li>
  <li>Install the necessary libraries needed:</li>
    <ul>
      <li>keypad by Mark Stanley, Alexander Brevig</li>
      <li>LiquidCrystal I2C by Frank de Brabander</li>
      <li>ESP32Servo by Kevin Harrington, John K. Bennett</li>
    </ul>
  <li>Download and open the program file <a href="IOTSGrp1Esp32Code.ino">Esp32 INO file [6 kB]</a> </li>
  <li>Upload the code</li>
  <li>Once the code is uploaded, hold on the 'boot' button on the Esp32 to run the program in the board</li>
</ol>
<p>if the 'Output' displays an error of the I2C LCD not compatible with Esp32, proceed to file explorer to edit the library</p>
  <ol>
    <li>Go to file explorer/Arduino/libraries/LiquidCrystal_I2C</li>
    <li>open library.properties in notepad</li>
    <li>Include Esp32 to the architechtures. That line of the library property should look like "architectures=avr,esp32"</li>
    <li>save changes and run the code again</li>
  <ol>  
