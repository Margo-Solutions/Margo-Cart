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
Innendørs navigation
```
npm install react-native-svg
npm install react-native-fabric    
npm install react-native-webview  
```

#for Margosolutiontest

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
#For Maps
```
npx expo install react-native-maps
```
```
npm i react-native-google-places-autocomplete
```
```
npm i react-native-maps-directions
```
```
npm i react-native-maps
```
```
npx expo install expo-location![image](https://user-images.githubusercontent.com/113107099/220368898-fb1b9a14-f724-4e1e-b27f-2a7b78523d80.png)
```

## Første gang for server 
gå inn i server mappe
```
cd cd Margo-Cart/Server/server
```
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
npx expo start
```

# Dependencies for server
express, pg, og cors er for kommunikasjon med app 
```
npm install express pg cors 
```
dotenv brukes for å lagre enviorment variabler
```
npm install dotenv
```
jsonwebtoken og bcyrpt er for kryptering av passord
```
npm install jsonwebtoken bcrypt
```

# Starte Server
For å starte server
```
npx nodemon
```

