#include "WiFi.h"

const char *ssid = "A101-FESB";
const char *password = "123456789";

IPAddress local_IP(192,168,4,22);
IPAddress gateway(192,168,4,9);
IPAddress subnet(255,255,255,0);

void setup()
{
  Serial.begin(115200);
  Serial.println();

  Serial.print("Postavljanje konfiguracije AP-a... ");
  Serial.println(WiFi.softAPConfig(local_IP, gateway, subnet) ? "Ready" : "Failed!");

  Serial.print("Postavljanje AP-a...");
  Serial.println(WiFi.softAP(ssid, password) ? "Ready" : "Failed!");
  
  Serial.print("IP adresa = ");
  Serial.println(WiFi.softAPIP());
}

void loop() {
  Serial.println(WiFi.softAPIP());

  delay(500);
}

