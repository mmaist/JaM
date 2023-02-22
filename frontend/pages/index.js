import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import moment from 'moment-timezone'
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Table } from "@nextui-org/react";

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

function Games() {
 
  const { data: games, error, isLoading } = useSWR('http://127.0.0.1:5000/getData', fetcher)

  if (error) return <div>Failed to load</div>
  console.log(JSON.stringify(games))
  console.log('hiiii')
  console.log('heloo')
  if (isLoading) return <div>Loading...</div>
  console.log('heloo')
  const gamesArray = Object.values(games)

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

  //Render for DraftKings. Gathers all the information from 'item' and returns it in a displayable format
  const dkColumnRender = (item) => {
    const searchResult = markSearch(item, "draftkings");
    const h2hmarket = searchResult.markets.find((hmarket) => hmarket.key === 'h2h');
    const spreadmarket = searchResult.markets.find((smarket) => smarket.key === 'spreads');

  
    if (searchResult !== false && spreadmarket && spreadmarket.outcomes) {
    return (
      <Table.Cell>
        {spreadmarket.outcomes.map((outcome) => (
          <div key={outcome.name}>{outcome.price} {outcome.point} {outcome.name}</div>
        ))}
        {h2hmarket.outcomes.map((outcome) => (
          <div key={outcome.name}>{outcome.price} {outcome.name}</div>
        ))}
      </Table.Cell>
    );
  }
  
    return <Table.Cell>N/A</Table.Cell>;
  };

  //Render for barstool. Gathers all the information from 'item' and returns it in a displayable format
  const bsColumnRender = (item) => {
    const searchResult = markSearch(item, "barstool");
    const h2hmarket = searchResult.markets.find((hmarket) => hmarket.key === 'h2h');
    const spreadmarket = searchResult.markets.find((smarket) => smarket.key === 'spreads');

  
    if (searchResult !== false && spreadmarket && spreadmarket.outcomes) {
    return (
      <Table.Cell>
        {spreadmarket.outcomes.map((outcome) => (
          <div key={outcome.name}>{outcome.price} {outcome.point} {outcome.name}</div>
        ))}
        {h2hmarket.outcomes.map((outcome) => (
          <div key={outcome.name}>{outcome.price} {outcome.name}</div>
        ))}
      </Table.Cell>
    );
  }
  
    return <Table.Cell>N/A</Table.Cell>;
  };

  //Render for fanduel. Gathers all the information from 'item' and returns it in a displayable format
  const fdColumnRender = (item) => {
    const searchResult = markSearch(item, "fanduel");
    const h2hmarket = searchResult.markets.find((hmarket) => hmarket.key === 'h2h');
    const spreadmarket = searchResult.markets.find((smarket) => smarket.key === 'spreads');

  
    if (searchResult !== false && spreadmarket && spreadmarket.outcomes) {
    return (
      <Table.Cell>
        {spreadmarket.outcomes.map((outcome) => (
          <div key={outcome.name}>{outcome.price} {outcome.point} {outcome.name}</div>
        ))}
        {h2hmarket.outcomes.map((outcome) => (
          <div key={outcome.name}>{outcome.price} {outcome.name}</div>
        ))}
      </Table.Cell>
    );
  }
  
    return <Table.Cell>N/A</Table.Cell>;
  };


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
      key: "dk",
      label: "Draft Kings",
      render: dkColumnRender
    },
    {
      key: "book",
      label: "Fan Duel",
      render: fdColumnRender
    },
    {
      key: "book",
      label: "Barstool",
      render: bsColumnRender
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
        column.render ? column.render(item) : (
          <Table.Cell key={column.key}>{item[column.key]}</Table.Cell>
        )
      )}
    </Table.Row>
  )}
      </Table.Body>
    </Table>
  );



  //return(disGames(games))
  

 
}

//quick search function to find the desired market inside a matchup
function markSearch(games, searchKey) {
  const bookmaker = games.bookmakers.find((bookmaker) => bookmaker.key === searchKey);
  return bookmaker ? bookmaker : false;
}







///HTML verion of displaying the matchups
function disGames(aGames){

  const gamesArray = Object.values(aGames)

  return (
    <div className={styles.tablecontainer}>
    <table className={styles.myTable}>
        <thead>
          <tr>
            <th>Matchup</th>
            <th className={styles.myC}>{moment.tz('America/Los_Angeles').format('MMM DD, YYYY h:mm A')}</th>
          </tr>
        </thead>
        <tbody>
          {gamesArray.map((game) => (
            <tr key={game.id}>
              <td>{game.away_team} <br /> @ {game.home_team}</td>
              <td className={styles.myC}>{moment.utc(game.commence_time).tz('America/Los_Angeles').format('h:mm A')}</td>
              {disOdds(game)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
//HTML Function to disiplay each games odds
function disOdds(game) {
  const bookmakers = game.bookmakers;
  const columns = bookmakers.map((bookmaker) => {
    return (
      <td key={bookmaker.key}>
        <h2>{bookmaker.title}</h2>
        <table>
          <tbody>
            {bookmaker.markets.map((market) => (
              <React.Fragment key={market.key}>
                <tr>
                  <td colSpan="2"><h3>{market.key}</h3></td>
                </tr>
                {market.outcomes.map((outcome) => (
                  <tr key={outcome.name}>
                    <td>{outcome.name}</td>
                    <td>{outcome.price}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </td>
    );
  });

  return <>{columns}</>;
}

//NEXTUI function to display the matchups
function tabGames(){
  //const gamesArray = Object.values(games) 
  return (
    <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
    </Table>
  );
}


//Next UI function to display the odds
function tabOdds(game) {
  const bookmakers = game.bookmakers;
  const columns = bookmakers.map((bookmaker) => {
    return (
      <Table.Cell key={bookmaker.key}>
        <Table.Cell>{bookmaker.title}</Table.Cell>
        <Table
      striped
      sticked
      aria-label="Example static striped collection table"
      selectionMode="multiple"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      >
          <Table.Body>
            {bookmaker.markets.map((market) => (
              <React.Fragment key={market.key}>
                <Table.Row>
                  <Table.Cell colSpan="2"><h3>{market.key}</h3></Table.Cell>
                </Table.Row>
                {market.outcomes.map((outcome) => (
                  <Table.Row key={outcome.name}>
                    <Table.Cell>{outcome.name}</Table.Cell>
                    <Table.Cell>{outcome.price}</Table.Cell>
                  </Table.Row>
                ))}
              </React.Fragment>
            ))}
          </Table.Body>
        </Table>
      </Table.Cell>
    );
  });

  return <>{columns}</>;
}


///First thing that runs that sets up that page and then calls various functions
export default function Home() {
  return (
    <>
      <Head>
        <title>Sports Betting App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextUIProvider theme = {myDarkTheme}> {/* Wrap your top-level component with NextUIProvider */}
        <div>
          {Games()}
        </div>
      </NextUIProvider>
    </>
  )

}
