import React from 'react'
import { View, StyleSheet, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import Svg, {Path, Rect, Polyline } from 'react-native-svg';
import Astar from '../utils/Astar';

export default function InnendørsKart() {
    const [vare, setVare] = useState(["eple", "banan", "pære"]);
    const [cord , setCord] = useState([{ x: "3", y: "1"}, { x: "1", y: "0"},{ x: "2", y: "0"}, { x: "3", y: "0"}, {x: "0", y: "2"}, {x: "0", y: "3"}
    ,{x: "3", y: "2"}, {x: "0", y: "6"},{x: "0", y: "6"}, {x: "1", y: "6"}, {x: "2", y: "6"}, {x: "3", y: "3"}, {x: "3", y: "6"}]);
    const [cord_path , setCord_path] = useState([{ x: "40", y: "1"}, { x: "40", y: "100"},{ x: "100", y: "100"}]);

    const [path, setPath] = useState('0,0 0,0');
    const [hylle, sethylle] = useState([]);
    const arrwidth = 10; const arrheight = 10;
    const Grid = Array(arrheight).fill({x: 0, y: 0, hylle: false, g: 0, f: 0, h: 0, neighbors: [], previous: undefined, start: false, end: false}).map(() => Array(arrwidth).fill({x: 0, y: 0, hylle: false, g: 0, f: 0, h: 0, neighbors: [], previous: undefined, start: false, end: false}));
    
    const node_start_row = 0;
    const node_start_col = 0;
    const node_end_row = 9;
    const node_end_col = 9;
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
      temppath += (path[i].x * 20) + "," + (path[i].y * 25) + " ";
      console.log(path[i].x + "," + path[i].y + " ");
    }
    setPath(temppath);
    return temppath;
    }

    const createNode = (grid) => {
      for (let i = 0; i < arrwidth; i++) {
        for (let j = 0; j < arrheight; j++) {
          grid[i][j] = {x: i, y: j, hylle: false, g: 0, f: 0, h: 0, neighbors: [], previous: undefined, start: false, end: false};
          if (i === node_start_row && j === node_start_col) {
            grid[i][j].start = true;
          }
          if (i === node_end_row && j === node_end_col) {
            grid[i][j].end = true;
          }
        }
      }
    }
  
    const addneighbors = (grid) => {
    for (let i = 0; i < arrwidth; i++) {
      for (let j = 0; j < arrheight; j++) {
        if (i > 0) Grid[i][j].neighbors.push(grid[i - 1][j]);
        if (i < arrwidth - 1) Grid[i][j].neighbors.push(grid[i + 1][j]);
        if (j > 0) Grid[i][j].neighbors.push(grid[i][j - 1]);
        if (j < arrheight - 1) Grid[i][j].neighbors.push(grid[i][j + 1]);
      }
    }
  }
  
    const addPath = (cord) => {
    var path = "";
    for (var i = 0; i < cord.length; i++) {
      path += cord[i].x + "," + cord[i].y + " ";
    }
    setPath(path);
    return path;
  }

  const addhylle = (data) => { 
    var arr = Array(cord.length).fill(0);
    for (var i = 0; i < data.length; i++) {
      var x = data[i].x;
      var y = data[i].y;
      Grid[x][y].hylle = true;
    
      var cord_x = x * 20; // 1 * 20 = 20, 2 * 20 = 40, 3 * 20 = 60
      var cord_y = y * 20; // 1 * 20 = 20, 2 * 20 = 40, 3 * 20 = 60
      var key = i;
      arr[i] = {key: key, x: cord_x, y: cord_y};
    }
    sethylle(arr);
   
  }

  useEffect(() => {
    initgrid();
  }, []);

    return (
    <View style={styles.container}>
        <View style={styles.line} />
          <View style={styles.searchingContainer}>
          <TextInput 
                style={styles.textInput}
                placeholder=""
                placeholderTextColor="#120438"
                onChangeText={(text) => this.setState({text})}
                value={"Kiwi Kongsberg"}
                />
          </View>
            <View style={styles.textconteiner}>
            <View style={styles.textitem}>
            <Text style={{fontSize: 20, textAlign: 'center', color: '#120438'}}>Nå: {vare[0]}</Text>
            <Text style={styles.lineText}>___________________________________________</Text>
            <Text style={{fontSize: 20, textAlign: 'center', color: '#120438'}}>Neste: {vare[1]}</Text>
            </View>
            <Button title="Neste" onPress={() => {addPath(cord_path)} }/>
            </View>
            <Svg height="100%" width="100%" style={styles.Kart}>
            {hylle.map((hylle) => (
       <Rect key = {hylle.key} x = {hylle.x} y = {hylle.y} width = {20} height= {20}  stroke="black" strokeWidth="2" fill="white" />
         ))}
          <Polyline points= {path} stroke="black" strokeWidth="2" fill="none" />
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
        justifyContent:'center',
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