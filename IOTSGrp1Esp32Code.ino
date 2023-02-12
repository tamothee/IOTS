/*
  DCPE/FT/3A/25 IOTS Group 1(Timothy, Ron, Joseph)
  Esp32 Door Lock Code
*/

#include <Keypad.h>
#include <LiquidCrystal_I2C.h>
#include <ESP32Servo.h>
#include <HTTPClient.h>
#include <WiFi.h>
#define PIN_SG90 2    // servo output pin
#define ROW_NUM 4     // four rows for keyapd
#define COLUMN_NUM 4  // four columns for keypad

const char *ssid = "Jay-Em iPhone";  // SSID
const char *pass = "A9emvr@966901";  // password

const char *apiKey = "hfu0k4affFquUvpnd5Fuim9jcWLjdkDzT7oP2gESkZVDTUJTvqxFhkbELBbQQuqE";  // API key

Servo sg90;                          //set servo motor
LiquidCrystal_I2C lcd(0x27, 16, 2);  // set the LCD address to 0x27 for a 16 chars and 2 line LCD display
char keys[ROW_NUM][COLUMN_NUM] = {
  { '1', '2', '3', 'A' },
  { '4', '5', '6', 'B' },
  { '7', '8', '9', 'C' },
  { '*', '0', '#', 'D' }
};

byte pin_rows[ROW_NUM] = { 26, 25, 33, 32 };       // D26, D25, D33, D32 connect to the row pins
byte pin_column[COLUMN_NUM] = { 13, 12, 14, 27 };  // D13, D12, D14, D27 connect to the column pins

Keypad keypad = Keypad(makeKeymap(keys), pin_rows, pin_column, ROW_NUM, COLUMN_NUM);

String input_deviceId;
String input_password;

int cursorColumn = 0;

void setup() {
  lcd.init();
  lcd.clear();
  lcd.backlight();

  Serial.begin(115200);        // set buad rate
  input_password.reserve(32);  // maximum input characters is 33

  sg90.setPeriodHertz(50);           // PWM frequency for SG90
  sg90.attach(PIN_SG90, 500, 2400);  // Minimum and maximum pulse width (in µs) to go from 0° to 180°

  // wifi
  Serial.println("Connecting to Wi-Fi...");
  // Loop until WiFi connection is successful
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }


  Serial.println(" ");
  Serial.println("WiFi connected");

  lcd.setCursor(0, 0);
  lcd.print("   ENTER   ");
  lcd.setCursor(1, 1);
  lcd.print("DEVICE ID!");
  delay(5000);
  lcd.clear();

  // Prompt user to enter device ID
  int breakout = 0;

  while (!breakout) {
    char key = keypad.getKey();

    if (key) {
      Serial.println(key);

      if (key == 'A') {
        input_deviceId = "";  // clear input device ID
      } else if (key == '#') {
        Serial.println("dEVICE ID CONFIGURED! ENTER PASSWORD!");
        lcd.setCursor(1, 0);
        lcd.print("DEVICE ID SET!");
        lcd.setCursor(1, 1);
        lcd.print("ENTER PASSWORD!");
        delay(5000);
        lcd.clear();
        input_deviceId = input_deviceId;  // set key as the input device ID
        breakout = 1;                     // once device ID is set, proceed to void loop for password
      } else {
        input_deviceId += key;  // append new character to input device ID string
      }
    }
  }
}

void loop() {
  // Prompt user to enter password
  char key = keypad.getKey();

  if (key) {
    Serial.println(key);

    if (key == 'A') {
      input_password = "";                            // clear input password
    } else if (key == '#') {                          //to unlock the door
      if (getAuth(input_password, input_deviceId)) {  // checks if password and device ID matches with the one in MongoDB
        Serial.println("ACCESS GRANTED! DOOR UNLOCKED!");
        lcd.setCursor(1, 0);
        lcd.print("ACCESS GRANTED!");
        lcd.setCursor(1, 1);
        lcd.print("DOOR UNLOCKED!");
        delay(5000);
        lcd.clear();
        for (int pos = 0; pos <= 180; pos += 1) {
          sg90.write(pos);  // servo unlocks
          delay(10);
        }
      } else {  // password or device ID is incorrect
        Serial.println("DEVICE ID OR PASSWORD INCORRECT!");
        lcd.setCursor(1, 0);
        lcd.print("ACCESS DENIED! ");
        lcd.setCursor(1, 1);
        lcd.print("  TRY AGAIN!   ");
        delay(5000);
        lcd.clear();
      }
      input_password = "";                            // clear input password
    } else if (key == '*') {                          // to lock the door
      if (getAuth(input_password, input_deviceId)) {  // checks if password and device ID matches with the one in MongoDB
        Serial.println("ACCESS GRANTED! DOOR LOCKED!");
        lcd.setCursor(1, 0);
        lcd.print("ACCESS GRANTED!");
        lcd.setCursor(1, 1);
        lcd.print(" DOOR LOCKED! ");
        delay(5000);
        lcd.clear();
        for (int pos = 180; pos >= 0; pos -= 1) {
          sg90.write(pos);  // servo locks
          delay(10);
        }
      } else {  // password or device ID is incorrect
        Serial.println("INCORRECT! TRY AGAIN!");
        lcd.setCursor(1, 0);
        lcd.print("ACCESS DENIED! ");
        lcd.setCursor(1, 1);
        lcd.print("  TRY AGAIN!  ");
        delay(5000);
        lcd.clear();
      }
      input_password = "";  // clear input password
    } else {
      input_password += key;  // append new character to input password string
    }
  }
}

// gets authorization by obtaining password and device ID
bool getAuth(String password, String deviceId) {
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println(password);
    Serial.println(deviceId);
    HTTPClient http;
    http.setTimeout(30000);
    http.begin("https://data.mongodb-api.com/app/data-rmesa/endpoint/doorauth");
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Bearer " + String(apiKey));
    int httpCode = http.POST("{\"deviceId\":" + deviceId + ",\"userPassword\": \"" + password + "\" }");
    if (httpCode > 0) {
      Serial.println(httpCode);
      String payload = http.getString();
      Serial.println(payload);
      if (httpCode == 200) {
        http.end();
        return true;
      }
    } else {
      Serial.println("Error on HTTP request");
    }
    http.end();
    return false;
  }
  delay(5000);
}