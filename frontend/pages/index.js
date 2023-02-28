import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import moment from 'moment-timezone'
import React, { useEffect } from 'react';
import { Radio, Avatar, Loading, Table, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
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

//sorts the games by commence time
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

//adds pluses to numbers greater than 0
function plusAdder(num){
  if (num > 0){
    return "+" + num
  }
  else return (num)
}

function getGamesWithinSameDay(gamesArray) {
  const currentDate = new Date();
  const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

  return gamesArray.filter((game) => {
    const gameTime = new Date(game.commence_time);
    return gameTime >= startOfDay && gameTime < endOfDay;
  });
}



function gamesFun(logArray, games, error, isLoading) {
  console.log('hi')  
  if (error) return <div>Failed to load</div>
  if (isLoading) return <Loading size = 'xl' />

  const gamesArray1 = Object.values(games)
  const gamesArray2 = sortByCommenceTime(gamesArray1)
  const gamesArray = getGamesWithinSameDay(gamesArray2)
 
  //returns teams
  const matchColumnRender = (item) => (
    <Table.Cell>
      {item['away_team']}<br></br> @ {item['home_team']}
    </Table.Cell>
  );

  //returns matchup time
  const timeColumnRender = (item) => (
    <Table.Cell>
      {moment.utc(item['commence_time']).tz('America/Los_Angeles').format('MMM D, h:mm A')}
    </Table.Cell>
  );

  //returns the avatars with logos for eaach team
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
          color="gradient"
          bordered
          zoomed
        />
      </Tooltip>
      <div> </div>
      <Tooltip content={item['home_team']}
      rounded 
      color="primary">
    <Avatar
          size="lg"
          src={hometeam}
          color="gradient"
          bordered
          zoomed
        />
        </Tooltip>
  </Table.Cell>
    )
  };


  //Render for DraftKings. Gathers all the information from 'item' and returns it in a displayable format
  const bookColumnRender = (item, keystring) => {
    //Finds the specific book for each game, if the isn't found it returns N/A
    const searchResult = item.bookmakers.find((bookmaker) => bookmaker.key === keystring);
    const abbreviation = new Teams();
    if (!searchResult) {
      return <Table.Cell>N/A</Table.Cell>;
    }
  
    const h2hmarket = searchResult.markets.find((hmarket) => hmarket.key === 'h2h');
    const spreadmarket = searchResult.markets.find((smarket) => smarket.key === 'spreads');
    const totalsmarket = searchResult.markets.find((tmarket) => tmarket.key === 'totals');
    let retMes = null;
  
    if (logArray.includes('moneyline') && h2hmarket) {
      retMes = h2hmarket.outcomes.map((outcome) => (
        <div key={outcome.name}><b>{plusAdder(outcome.price)}</b> {plusAdder(outcome.point)} {abbreviation.getAbbByName(outcome.name)}</div>
      ))
    }
  
    if (logArray.includes('spread') && spreadmarket) {
      const outcomes = spreadmarket.outcomes.map((outcome) => (
        <div key={outcome.name}><b>{plusAdder(outcome.price)}</b> {plusAdder(outcome.point)} {abbreviation.getAbbByName(outcome.name)}</div>
      ));
      retMes = retMes ? [...retMes, ...outcomes] : outcomes;
    }

    if (logArray.includes('totals') && totalsmarket) {
      const totoutcomes = totalsmarket.outcomes.map((outcome) => (
        <div key={outcome.name}><b>{plusAdder(outcome.price)}</b> {outcome.point} {outcome.name}</div>
      ))
      retMes = retMes ? [...retMes, ...totoutcomes] : totoutcomes;
    }
  
    if (!retMes) {
      return (
        <Table.Cell>
          <div>Not Available</div>
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
   //constants for the column. Includes key, label and which renderer to use
   const columns = [
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
      key:"images",
      label:"",
      render: imageColumnRender
    },
    {
      key: "bestOddsForGame",
      label: "Best Odds",
      
    },
    {
      key: "draftkings",
      label: "Draft Kings",
      render: bookColumnRender
    },
    {
      key: "fanduel",
      label: "Fan Duel",
      render: bookColumnRender
    },
    {
      key: "barstool",
      label: "Barstool",
      render: bookColumnRender
    },
    {
      label: "William Hill (US)",
      key: "williamhill_us",
      render: bookColumnRender
    
    },
    {
      label: "LowVig.ag",
      key: "lowvig",
      render: bookColumnRender
    },
    {
      key: "betonlineag",
      label: "BetOnline.ag",
      render: bookColumnRender
    },
    {
      label: "WynnBET",
      key: "wynnbet",
      render: bookColumnRender
    },
    {
      key: "bovada",
      label: "Bovada",
      render: bookColumnRender
    },
    {
      key: "betmgm",
      label: "BetMGM",
      render: bookColumnRender
    },
    {
      key: "circasports",
      label: "Circa Sports",
      render: bookColumnRender
    },
    {
      key: "superbook",
      label: "SuperBook",
      render: bookColumnRender
    },
    {
      key: "betus",
      label: "BetUS",
      render: bookColumnRender
    },
    {
      key: "pointsbetus",
      label: "PointsBet (US)",
      render: bookColumnRender
    },
    {
      key: "mybookieag",
      label: "MyBookie.ag",
      render: bookColumnRender
    },
    {
      key: "twinspires",
      label: "Twinspires",
      render: bookColumnRender
    },
    {
      key: "betrivers",
      label: "BetRivers",
      render: bookColumnRender
    },
    {
      key: "unibet_us",
      label: "Unibet",
      render: bookColumnRender
    },
    {
      key: "sugarhouse",
      label: "SugarHouse",
      render: bookColumnRender
    }
    
  ];
 
  
  //returns a completed table of all information regarding games and odds
  return (
    <Table
      lined
      headerLined
      bordered
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
  const [selected, setSelected] = React.useState(['moneyline','spread','totals']);
  const games = dataFetcher("games")
  const error = dataFetcher("error")
  const isLoading = dataFetcher("isLoading")
 



  return (
    <>
      <Head>
        <title>Sports Betting App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/basketball.png" />
        <h1 className={styles.title}>ARBITRAGE   <img src = 'lebron.png' width = '40px' height = '70px'></img></h1>
      </Head>

      <Radio.Group
      color="primary"
      orientation="horizontal"
      value={selected}
      onChange={setSelected}
      key = "checkbox"
      ali
    >
      <Radio value="moneyline">ML</Radio>
      <Radio value="spread">Spread</Radio>
      <Radio value="totals">O/U</Radio>
      {console.log(selected)}
    </Radio.Group>


    
        <div key={selected}>
          <NextUIProvider>{gamesFun(selected, games, error, isLoading)}</NextUIProvider>
        </div>
      
      
    </>
  )

}
