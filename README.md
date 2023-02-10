# Margo-Solutions
Bacheloroppgave/Studentbedrift

## Git/Github commandoer vi bruker

# Clone repo
```
https://github.com/Margo-Solutions/Margo-Cart.git
```
# For å pulle fra Github når noen har gjort endringer
```
git pull --rebase
```
# For å legge til kode i Github
```
git add -A
git commit -m "skriv melding her"
git push
```

## Første gang du laster ned koden så må du starte et nytt expo prosjekt for appen (for clientside)
```
cd Margo-Cart/Client
npm install
npm start
```

# Dependencies for Client filen
```
npm i express pg cors
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
React paper og vector icons
```
npm install react-native-paper react-native-vector-icons
```
#for Margosolutiontest
Verktøy som ble brukt er nvm (versjonskontroll verktøy for node.js ikke nødvendig)
```
https://github.com/nvm-sh/nvm
```
Installasjon for nvm (velger selv øsnket verson)
```
nvm install && nvm use 
```
Navigation drawer
```
npm install @react-navigation/drawer
```
```
npx expo install react-native-gesture-handler react-native-reanimated
```
Importering av navigation
```
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
```
Sjekk at babek.config.js filen er riktig
```
2	plugins: [
3	      'react-native-reanimated/plugin',
4	      '@babel/plugin-proposal-export-namespace-from',
5	    ],
```
For å starte med navigation drawer for første gang
```
npx expo start --clear 
```
Kommunikasjon med server
```
npm i express pg cors
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
for å laste ned expo i server
```
npm install expo
```
for å starte serveren
```

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
