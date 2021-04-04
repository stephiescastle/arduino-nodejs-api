/* Basis for arduino code
** Each pin should be read and printed on the same line
** main.js construction of allPins from pins[] should correspond with the order of the pins in this arduino code
*/

int knobPin = A0;
int knobValue = 0;

int sensorPin = A1;
int sensorValue = 0;

int buttonPin = 2;
int buttonValue = 0;

// init more pin and value vars as needed

void setup() {
  // set pinModes as needed (digital pins)
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  // read each pint and print everything on a single line separated by \t and ending with \n

  // A0
  // will be pins[0] in main.js
  knobValue = analogRead(knobPin);
  Serial.print(knobValue);
  Serial.print("\t");

  // A1
  // will be pins[1] in main.js
  sensorValue = analogRead(sensorPin);
  Serial.print(sensorValue);
  Serial.print("\t");

  // D2
  // will be pins[2] in main.js
  buttonValue = digitalRead(buttonPin);
  Serial.print(buttonValue);
  Serial.print("\t");

  // read/print more pins as needed

  Serial.println(); // \n
  
}
