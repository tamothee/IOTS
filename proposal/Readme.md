<h1>Proposal</h1>

|  Name |  Admission ID  |
|  -------------  |  -------------  |
|  Leong Ming Liang Timothy  |  P1907799  |
|  Ron Tan Zi Yu |  P1908521  |
|  Tiamzon Joseph Martin |  P1907492  |

<h3>Concept</h3>
The user will use a keypad to enter a code to unlock the door. It also uses an LCD to give prompts to the user. 
Users will also be able to configure their device information through a website.

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

<h3>User Journey</h3>
The first thing the user must do is to create an account on our website. They can use social login which
would not require them to create an account. The next step is to create a new device on the website with a
password. Then save the device ID that they get after a successful device creation. 
Then the user will need to go to their door lock and add in their device id. That’s it for the set up! User will be prompted to type in
their code that they saved earlier in the website and the door will unlock when it is the correct code.

<h3>Why our solution</h3>
Users wouldn't have to stress about forgetting their house keys or losing them by using our Door Entry System. They could even share their home's password for events with the option to subsequently change it. Even if they lost their door system password, they could still access the website and alter it. They would never be locked out of their home.
<br/>
<br/>
Our Door Entry System is quick and easy to set up. Users would be able to manage their device through an easy-to-use website.
Our solution would be secured with the use of Auth0, Vercel and MongoDB.
<br/>
<br/>
Our website uses Auth0 for authentication, and it manages user sessions and user authentication using JWT. Because Auth0 adheres to 
industry security standards, our website is incredibly safe. It complies with PCI DSS, HIPPAA BAA, Gold CSA STAR, ISO27001, SOC 2 TYPE II, 
and ISO27018. Users can use social logins like Google and Microsoft with Auth0 as well. Because of this, people may access our website 
without having to create a new account. 
If they enable two-factor authentication for their social login, they will also be able to use it to access our website.
<br/>
<br/>
Mongodb is used to save our user device information to the cloud. Mongodb uses enterprise level security features such as 
network isolation and access, encryption of data in transit and at rest and granular database auditing. Mongodb is also compliant 
with ISO27001, ISO27017, ISO27018, SOC 2, CSA STAR, PCI DSS,
HIPAA, HITRUST, VPAT (Section 508) and GDPR. Thus, we are confident that user device information is stored securely.
<br/>
<br/>
Our website is hosted in the cloud by Vercel. Our solution is resilient, secure, and highly available thanks to Vercel. Vercel uses 
AWS for high availability, AES 256 for data at rest and HTTPS/TLS 1.3 for data in transit in order to guard against DDoS attacks. 
SOC 2, GDPR, and PCI compliance are all met by Vercel.
<br/>
<br/>
User device password is hashed with PBKDF2 which the hashing algorithm recommended by OWASP.
