import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import moment from 'moment-timezone'
import React, { useEffect } from 'react';
import { Checkbox, Avatar, Loading, Table, NextUIProvider, Tooltip} from "@nextui-org/react";
import {Teams} from './teams.js'


// 1. Import `createTheme`
import { createTheme, Text } from "@nextui-org/react"

// 2. Call `createTheme` and pass your custom values
const myDarkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      // brand colors
      background: '#1d1d1d',
      text: '#fff',
      // you can also create your own color
      myDarkColor: '#ff4ecd',
      candyRed: "D21404"
      // ...  more colors
    },
    space: {},
    fonts: {}
  }
})


//Gathers data from our API and puts it into an array that then calls the display functions
const fetcher = (...args) => fetch(...args).then((res) => res.json())

function dataFetcher(words){
const { data: games, error, isLoading } = useSWR('http://127.0.0.1:5000/getData', fetcher)
  if (words === "games"){
    return games
  }
  if (words === "error"){
    return error
  }
  if (words === "isLoading"){
    return isLoading
  }
  return (games,error,isLoading)

}

function sortByCommenceTime(events) {
  return events.sort((a, b) => {
    if (a.commence_time < b.commence_time) {
      return -1;
    }
    if (a.commence_time > b.commence_time) {
      return 1;
    }
    return 0;
  });
}

function plusAdder(num){
  if (num > 0){
    return "+" + num
  }
  else return (num)
}


function gamesFun(logArray, games, error, isLoading) {
  console.log('hi')  
  if (error) return <div>Failed to load</div>
  if (isLoading) return <Loading size = 'xl' />

  const gamesArray1 = Object.values(games)
  const gamesArray = sortByCommenceTime(gamesArray1)
 

  const matchColumnRender = (item) => (
    <Table.Cell>
      {item['away_team']}<br></br> @ {item['home_team']}
    </Table.Cell>
  );

  const timeColumnRender = (item) => (
    <Table.Cell>
      {moment.utc(item['commence_time']).tz('America/Los_Angeles').format('MMM D, h:mm A')}
    </Table.Cell>
  );

  const imageColumnRender = (item) => {
    const abbreviation = new Teams();
    const hometeam = "/TeamIMG/" + abbreviation.getImgByName(item['home_team'])
    const awayteam = "/TeamIMG/" + abbreviation.getImgByName(item['away_team'])

    return(
    <Table.Cell>
      <Tooltip content={item['away_team']} 
      rounded color="primary">
    <Avatar
          size="lg"
          src={awayteam}
          color="primary"
        />
      </Tooltip>
      <Text></Text>
      <Tooltip content={item['home_team']} rounded color="primary">
    <Avatar
          size="lg"
          src={hometeam}
          color="primary"
        />
        </Tooltip>
  </Table.Cell>
    )
  };


  //Render for DraftKings. Gathers all the information from 'item' and returns it in a displayable format
  const dkColumnRender = (item, keystring) => {
    const searchResult = item.bookmakers.find((bookmaker) => bookmaker.key === keystring);
    const abbreviation = new Teams();
    if (!searchResult) {
      return <Table.Cell>N/A</Table.Cell>;
    }
  
    const h2hmarket = searchResult.markets.find((hmarket) => hmarket.key === 'h2h');
    const spreadmarket = searchResult.markets.find((smarket) => smarket.key === 'spreads');
    let retMes = null;
  
    if (logArray.includes('moneyline') && h2hmarket) {
      retMes = h2hmarket.outcomes.map((outcome) => (
        <div key={outcome.name}><b>{outcome.price}</b> {plusAdder(outcome.point)} {abbreviation.getAbbByName(outcome.name)}</div>
      ))
    }
  
    if (logArray.includes('spread') && spreadmarket) {
      const outcomes = spreadmarket.outcomes.map((outcome) => (
        <div key={outcome.name}><b>{outcome.price}</b> {plusAdder(outcome.point)} {abbreviation.getAbbByName(outcome.name)}</div>
      ));
      retMes = retMes ? [...retMes, ...outcomes] : outcomes;
    }
  
    if (!retMes) {
      return (
        <Table.Cell>
          <div>No {logArray.includes('moneyline') ? 'H2H' : 'ML'} {logArray.includes('spread') ? 'Spread' : 'Spread'} Available</div>
        </Table.Cell>
      )
    }
  
    return (
      <Table.Cell>
        {retMes}
      </Table.Cell>
    );
  
  };
  

  //constants for the column. Includes key, label and which renderer to use
  const columns = [
    {
      key:"images",
      label:"",
      render: imageColumnRender
    },
    {
      key: "away_team",
      label: "Matchup",
      render: matchColumnRender
    },
    {
      key: "commence_time",
      label: "Time",
      render: timeColumnRender
    },
    {
      key: "draftkings",
      label: "Draft Kings",
      render: dkColumnRender
    },
    {
      key: "fanduel",
      label: "Fan Duel",
      render: dkColumnRender
    },
    {
      key: "barstool",
      label: "Barstool",
      render: dkColumnRender
    },
    
  ];
 
  
  //returns a completed table of all information regarding games and odds
  return (
    <Table
      lined
      headerLined
      shadow={false}
      aria-label="Example table with dynamic content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={gamesArray}>
      {(item) => (
    <Table.Row key={item.key}>
      {columns.map((column) =>
        column.render ? column.render(item, column.key) : (
          <Table.Cell key={column.key}>{item[column.key]}</Table.Cell>
        )
      )}
    </Table.Row>
  )}
      </Table.Body>
    </Table>
  );

}


///First thing that runs that sets up that page and then calls various functions
export default function Home() {
  const [selected, setSelected] = React.useState(["moneyline", "spread"]);
  const games = dataFetcher("games")
  const error = dataFetcher("error")
  const isLoading = dataFetcher("isLoading")
  return (
    <>
      <Head>
        <title>Sports Betting App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Checkbox.Group
      color="secondary"
      label="Select category"
      orientation="horizontal"
      value={selected}
      onChange={setSelected}
      key = "checkbox"
    >
      <Checkbox value="moneyline">moneyline</Checkbox>
      <Checkbox value="spread">spread</Checkbox>
      {console.log(selected)}
    </Checkbox.Group>
    <Text>You're going to visit: {selected.join(', ')}</Text>


      <NextUIProvider theme = {myDarkTheme}r> 
      {
     
        gamesFun(selected, games,error,isLoading)
      }
      </NextUIProvider>
      
    </>
  )

}
