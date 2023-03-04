import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import moment from 'moment-timezone'
import React, { useEffect } from 'react';
import { Avatar, Loading, Table, Card, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import {GamesFun} from '../components/table.js'

//Gathers data from our API and puts it into an array that then calls the display functions
const fetcher = (...args) => fetch(...args).then((res) => res.json())

function useDataFetcher(words, fetchered){
const { data: games, error, isLoading } = useSWR('https://jam-pcynlb5fzq-uc.a.run.app/getData', fetchered)
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

function timeDisplayer(timezone) {
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
  const games = useDataFetcher("games",fetcher)
  const error = useDataFetcher("error",fetcher)
  const isLoading = useDataFetcher("isLoading",fetcher)
 



  return (
    <>
      <div>
      <Head>
        <title>ARBITRAGE</title>
        <link rel="icon" href="/basketball.png" />
        </Head>
        <h1 style={{ display: 'flex', alignItems: 'center' }}>ARBITRAGE<img alt='lebron' src='/lebron.png' style={{ marginLeft: 10 }} width='40' height='70' /></h1>
        {//<h3 style={{ position: 'absolute', top: 10, right: 10 }}>Odds last updated:</h3>
        //<h4 style={{ position: 'absolute', top: 40, right: 10 }}>{timeDisplayer('America/Los_Angeles')}</h4>}
      
      <ErrorBoundary>
      {GamesFun(games, error, isLoading)}
      </ErrorBoundary>
      </div>
            
      
    </>
  )

}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}