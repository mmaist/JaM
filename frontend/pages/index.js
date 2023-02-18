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
      myDarkColor: '#ff4ecd'
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
  
  return(disGames(games))
  

 
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
function tabGames(aGames){
const gamesArray=Object.values(aGames)
return(
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
      <Table.Header>
        <Table.Row>
          <Table.Cell>Matchup</Table.Cell>
          <Table.Cell>{moment.tz('America/Los_Angeles').format('MMM DD, YYYY h:mm A')}</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
          {gamesArray.map((game) => (
            <Table.Row key={game.id}>
              <Table.Cell>{game.away_team} <br /> VS. {game.home_team}</Table.Cell>
              <Table.Cell className={styles.myC}>{moment.utc(game.commence_time).tz('America/Los_Angeles').format('h:mm A')}</Table.Cell>
              {tabOdds(game)}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>


      )
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
