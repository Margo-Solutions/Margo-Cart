# Margo-Solutions
Bacheloroppgave/Studentbedrift

## Git/Github commandoer vi bruker

# Clone repo
```
git clone https://github.com/Martinkopland/Margo-Solutions.git
```
# For å pulle fra Github når noen har gjort endringer
```
git pull --rebase
```
# For å legge til kode i Gitbub
```
git add -A
git commit -m "skriv melding her"
git push
```

## Første gang du laster ned koden så må du starte et nytt expo prosjekt for appen (for clientside)
```
npm install
npm start
```

# Dependencies for Client filen
express, pg, og cors er for kommunikasjon med server 
```
npm install install express pg cors 
```
async storage lagring av lokal data
```
 npm install @react-navigation/native @react-navigation/native-stack
```
dotenv brukes for å lagre enviorment variabler
```
npm install dotenv
```
navigation
```
npm install @react-navigation/native
```
```
npx expo install react-native-screens react-native-safe-area-context
```
```
npm install @react-navigation/native-stack
```

## Første gang for server 
skriv inn og trykk enter helt til den sier press Y/N
```
npm init
```
Nodemon er får å kjøre serveren
```
npm install nodemon
```
for å starte serveren
```
npx expo start
```

# Dependencies for server
express, pg, og cors er for kommunikasjon med app 
```
npm install install express pg cors 
```
async storage lagring av lokal data
```
 npm install @react-navigation/native @react-navigation/native-stack
```
dotenv brukes for å lagre enviorment variabler
```
npm install dotenv
```
jsonwebtoken og bcyrpt er for kryptering av passord
```
npm install jsonwebtoken bcyrpt
```
