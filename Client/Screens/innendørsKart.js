import React from 'react'
import { View, StyleSheet, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRef, useEffect, useState, useContext } from 'react';
import Svg, { Path, Rect, Polyline, Marker } from 'react-native-svg';
import Astar from '../utils/Astar';
//import sortertHandleliste from '../utils/sorterHandleliste';
import { handContext } from '../context/listeHandler';
export default function InnendørsKart({ route }) {
  const { butikk_id } = route.params; // henter ut butikk_id fra forrige skjerm som bruker til å hente varer
  const { handleliste} = useContext(handContext); // henter ut handleliste fra context
  const [vare_navn, setVare_navn] = useState([]);  // varene som brukeren skal hente ut i fra handlelisten dems
  const [vareAntall, setVareAntall] = useState([]); // antall av hver vare som skal hentes ut
  const [butikkvarer, setButikkvarer] = useState([]); // varene som er i butikken
  const [cord, setCord] = useState([]); // koordinater til hylle
  const [path, setPath] = useState('0,0 0,0'); // pathen som skal tegnes
  const [hylle, sethylle] = useState([]); // hylle som skal tegnes
  const arrwidth = 20; const arrheight = 20; // størrelsen på griden
  const Grid = Array(arrheight).fill({ x: 0, y: 0, hylle: false, g: 0, f: 0, h: 0, neighbors: [], previous: undefined, start: false, end: false, test: false }).map(() => Array(arrwidth).fill({ x: 0, y: 0, hylle: false, g: 0, f: 0, h: 0, neighbors: [], previous: undefined, start: false, end: false, test: false }));
  const [node_start_row, setStartRow] = useState(1);
  const [node_start_col, setStartCol] = useState(13);
  const [node_end_row, setEndRow] = useState(1);
  const [node_end_col, setEndCol] = useState(13);
  const [vareNr, setVareNr] = useState(0); // hvilken vare som skal hentes ut  
  const isFirstRender = useRef(true); // for å ikke kjøre useEffect første gang siden det er tomme arrays
  const [sortertHandleliste, setSortertHandleliste] = useState([]); // sortert handleliste

  const sorterHandleliste = (grid) => { // sorterer handlelisten etter korteste path
    let temp = [];
    let tempcord = [];
    let startNode = grid[1][13];
    let endNode = grid[1][1];
    for (let j = 0; j < butikkvarer.length; j++) {
      for (let i = 0; i < butikkvarer.length; i++) {
        if (butikkvarer[i].check == true) {
          continue;
        }
        else if (j == 0) { // sjekker fra start pos i butikken
          startNode = grid[1][13];
          endNode = grid[butikkvarer[i].x][butikkvarer[i].y];
          endNode.hylle = false;
          startNode.hylle = false;
          let path = Astar(startNode, endNode);
          if (i == 0) { // første gangen
            tempcord.push(path.length);
            temp.push(butikkvarer[i]);
          } else {
            if (path.length < tempcord[j]) {
              tempcord[j] = path.length;
              temp[j] = butikkvarer[i];
            }
          }
        } else {
          startNode.x = temp[j-1].x;
          startNode.y = temp[j-1].y;
          endNode = grid[butikkvarer[i].x][butikkvarer[i].y];
          startNode.hylle = false;
          endNode.hylle = false;
          let path = Astar(startNode, endNode);
          if (i == 0 || temp[j] == undefined) { // første gangen
            tempcord.push(path.length);
            temp.push(butikkvarer[i]);
          } else {
            if (path.length < tempcord[j]) {
              tempcord[j] = (path.length);
              temp[j] = butikkvarer[i];
            }
          }
        }
      }
      butikkvarer[temp[j].id].check = true;
    }
    temp.push({antall:" ", check: false, id: butikkvarer.length + 1, pathlengde: 0, vare_navn: " ", x: 1, y: 13}); 
    for (let i = 0; i < butikkvarer.length; i++) {
      butikkvarer[i].check = false;
    }
    setSortertHandleliste(temp);
    varetelling(temp);
  };


  const Listcoord = async () => { // listing items
    try {
      const response = await fetch("http://10.0.2.2:5000/margodatabase/koordinater");
      const cord = await response.json();
      setCord(cord);
    }
    catch (err) {
      console.error(err.message);
    }
  };
  const checkHandleliste = async (handleliste) => { // se om du skal bruke handleliste eller ha en enkel vare
    let temp = [];
    let temp2 = [];
    if (handleliste == '') {
      setVare_navn(" ", " ", " ");
      setVareAntall(" "," " ," " );
    }
    else {
      for (let i = 0; i < handleliste.length; i++) {
        temp.push(handleliste[i].vare_navn);
        temp2.push(handleliste[i].antall);
      }
      setVare_navn(temp);
      setVareAntall(temp2);
    }
  };

  const SearchVarer = async (butikk_id, handleliste) => { // searching for items
    let temp = [];
    const ar = Array({ id: 0, x: 0, y: 0, vare_navn: " ", check: false, pathlengde: 0 });
    for (let i = 0; i < handleliste.length; i++) {
      try {
        const response = await fetch(`http://10.0.2.2:5000/margodatabase/koordinater/varer/${butikk_id}/${handleliste[i].vare_navn}`);
        const varer = await response.json();
        temp.push(varer);
        ar[i] = { id: i, x: varer.x, y: varer.y, vare_navn: varer.vare_navn, check: false, pathlengde: 0, antall: handleliste[i].antall};
      }
      catch (err) {
        console.error(err.message);
      }
    }
    setButikkvarer(ar);
    setEndCol(temp[0].y);
    setEndRow(temp[0].x);
    setVareNr(0);
  };

  const initgrid = () => {
    createNode(Grid);
    addneighbors(Grid);
    addhylle(cord);
    const startNode = Grid[node_start_row][node_start_col];
    const endNode = Grid[node_end_row][node_end_col];
    startNode.hylle = false;
    endNode.hylle = false;
    let path = Astar(startNode, endNode);
    var temppath = "";
    for (let i = 0; i < path.length; i++) {
      // console.log(path[i].x + " " + path[i].y); //var a = (((x + 1) * 20) -10)/x + 1 + "," + (((y + 1) * 20) -10)/y + 1 + " ";
      temppath += (path[i].x + 1) * (((path[i].x + 1) * 20) - 10) / (path[i].x + 1) + "," + (path[i].y + 1) * (((path[i].y + 1) * 20) - 10) / (path[i].y + 1) + " ";
    }
    setPath(temppath);
    return temppath;
  };

  const createNode = (grid) => {
    for (let i = 0; i < arrwidth; i++) {
      for (let j = 0; j < arrheight; j++) {
        grid[i][j] = { x: i, y: j, hylle: false, g: 0, f: 0, h: 0, neighbors: [], previous: undefined, start: false, end: false, start: false, test: false };
        if (i === node_start_row && j === node_start_col) {
          grid[i][j].start = true;
        }
        if (i === node_end_row && j === node_end_col) {
          grid[i][j].end = true;
        }
      }
    }
  };

  const addneighbors = (grid) => {
    for (let i = 0; i < arrwidth; i++) {
      for (let j = 0; j < arrheight; j++) {
        if (i > 0) Grid[i][j].neighbors.push(grid[i - 1][j]);
        if (i < arrwidth - 1) Grid[i][j].neighbors.push(grid[i + 1][j]);
        if (j > 0) Grid[i][j].neighbors.push(grid[i][j - 1]);
        if (j < arrheight - 1) Grid[i][j].neighbors.push(grid[i][j + 1]);
      }
    }
  };

  const addhylle = async (data) => {
    try {
      var arr = Array(data.length).fill(0);
      for (var i = 0; i < data.length; i++) {
        var x = data[i].x;
        var y = data[i].y;
        Grid[x][y].hylle = true;
        //console.log(Grid[x][y].hylle);

        var cord_x = x * 20; // 1 * 20 = 20, 2 * 20 = 40, 3 * 20 = 60
        var cord_y = y * 20; // 1 * 20 = 20, 2 * 20 = 40, 3 * 20 = 60
        var key = i;
        arr[i] = { key: key, x: cord_x, y: cord_y };
      }
      sethylle(arr);
    } catch (err) {
      console.error(err.message);

    }
  }
  const varetelling = (sortertHandleliste) => {
    let temp = vareNr;
    if (sortertHandleliste.length === 0) {
      return;
    } else {
    if (temp === sortertHandleliste.length - 1) {
      temp = 0;
    }
    if (temp <= 0) {
      setStartCol(13);
      setStartRow(1);
      setEndRow(sortertHandleliste[temp].x);
      setEndCol(sortertHandleliste[temp].y);
    } else {
      setStartRow(sortertHandleliste[temp - 1].x);
      setStartCol(sortertHandleliste[temp - 1].y);
      setEndRow(sortertHandleliste[temp].x);
      setEndCol(sortertHandleliste[temp].y);
    }
  }
  }
  const counter = () => {
    let temp = vareNr;
    if (temp === handleliste.length - 1) {
      temp = 0;
      setVareNr(temp);
      setStartCol(13);
      setStartRow(1);
      setEndRow(sortertHandleliste[temp].x);
      setEndCol(sortertHandleliste[temp].y);
    } else {
      temp++;
      setStartRow(sortertHandleliste[temp - 1].x);
      setStartCol(sortertHandleliste[temp - 1].y);
      setEndRow(sortertHandleliste[temp].x);
      setEndCol(sortertHandleliste[temp].y);
      setVareNr(temp);
    }
  }

  useEffect(() => {
    checkHandleliste(sortertHandleliste);
    SearchVarer(butikk_id, handleliste);
    Listcoord();
  }, [handleliste]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    initgrid();
    sorterHandleliste(Grid);
  }, [butikkvarer]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } 
    initgrid();
    checkHandleliste(sortertHandleliste);
    varetelling(sortertHandleliste);
  }, [sortertHandleliste]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    initgrid();
  }, [node_start_row, node_start_col, node_end_row, node_end_col]);


  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.searchingContainer}>
        <TextInput
          style={styles.textInput}
          placeholder=""
          placeholderTextColor="#120438"
          onChangeText={(text) => this.setState({ text })}
          value={"Meny Karsches gate 3"}
        />
      </View>
      <View style={styles.textconteiner}>
        <View style={styles.textitem}>
          <Text style={{ fontSize: 20, textAlign: 'center', color: '#120438' }}>Nå:{vareAntall[vareNr]}{"x "}{vare_navn[vareNr]}</Text>
          <Text style={styles.lineText}>___________________________________________</Text>
          <Text style={{ fontSize: 20, textAlign: 'center', color: '#120438' }}>Hvor: {"nederste hylle"}</Text>
        </View>
        <Button title="Neste" onPress={() => { counter() }} />
      </View>
      <Svg height="100%" width="100%" style={styles.Kart}>
        {hylle.map((hylle) => (
          <Rect key={hylle.key} x={hylle.x} y={hylle.y} width={20} height={20} stroke="black" strokeWidth="2" fill="white" />
        ))}
        <Marker
          id="arrow"
          refX={3}
          refY={3}
          markerWidth="1"
          markerHeight="1"
          orient="auto"
        >
          <Path d="M 0 2 L 3 3 L 0 4 z" fill={'red'} />
        </Marker>
        <Polyline points={path} stroke="red" strokeWidth="2" fill="none" markerEnd='url(#arrow)' />
      </Svg>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66A2BA',
  },
  line: { // top line style
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    bottom: 25,
  },
  listContainer: { //base container
    flex: 1,
    backgroundColor: "#CADCFF",
    justifyContent: 'center',
  },
  searchingContainer: { // searching input bar container
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: { // text input style for search container
    width: 350,
    height: 35,
    borderColor: '#e4d0ff',
    backgroundColor: '#CADCFF',
    color: '#120438',
    borderWidth: 1,
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 20,
  },
  Kart: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#535A71',
  },
  textconteiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },

  textitem: {
    backgroundColor: '#66A2BA',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 2,
  },
  lineText: { // line style for line
    textAlign: 'center',
  },
});