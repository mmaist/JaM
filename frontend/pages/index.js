import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import moment from 'moment-timezone'
import React, { useEffect } from 'react';
import { Avatar, Loading, Table, Card, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import {gamesFun} from '../components/table.js'


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

function timeDisplayer() {
  const timezone = 'America/Los_Angeles'; // Pacific Time Zone (PST)
  const now = moment().tz(timezone); // Get the current time in the specified timezone
  const today = now.format('YYYY-MM-DD');
  const today845 = moment(`${today} 08:45:00`, 'YYYY-MM-DD HH:mm:ss').tz(timezone);
  const yesterday = now.clone().subtract(1, 'day').format('YYYY-MM-DD');
  const yesterday845 = moment(`${yesterday} 08:45:00`, 'YYYY-MM-DD HH:mm:ss').tz(timezone);
  const targetTime = now.isAfter(today845) ? today845 : yesterday845;
  const formattedTime = targetTime.format('dddd, MMMM D YYYY, h:mm A z');
  return <div>{formattedTime}</div>;
}

///First thing that runs that sets up that page and then calls various functions
export default function Home() {
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
        <h3 style={{ position: 'absolute', top: 10, right: 10 }}>Odds last updated:</h3>
        <h4 style={{ position: 'absolute', top: 40, right: 10 }}>{timeDisplayer()}</h4>
      </Head>
      <div>
        <NextUIProvider>{gamesFun(games, error, isLoading)}</NextUIProvider>
      </div>
      
      
    </>
  )

}
