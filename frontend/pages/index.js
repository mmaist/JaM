import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import moment from 'moment-timezone'
import React, { useEffect } from 'react';
import { Avatar, Loading,Dropdown, Table, Card, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import {GamesFun} from '../components/table.js'

//Gathers data from our API and puts it into an array that then calls the display functions
const fetcher = (...args) => fetch(...args).then((res) => res.json())

function useDataFetcher(words, fetchered,league, word){
const { data: games, error, isLoading } = useSWR('https://jam-pcynlb5fzq-uc.a.run.app/get'+league+'data', fetchered)
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

function useDKLiveFetcher(words, fetchered){
  const { data: gamess, errorr, isLoadingg } = useSWR('https://eu-offering-api.kambicdn.com/offering/v2018/pivuspa/listView/basketball/nba/all/all/matches.json?market=US&market=US&includeParticipants=true&useCombined=true&lang=en_US', fetchered);
  if (words === "games"){                        
    return gamess;
  }
  if (words === "error"){
    return errorr;
  }
  if (words === "isLoading"){
    return isLoadingg;
  }
  return [gamess, errorr, isLoadingg];
}


///First thing that runs that sets up that page and then calls various functions
export default function Home() {
 
 
  const [formatValue, setforSelected] = React.useState(new Set(["moneyline"]));
  const formatselected = React.useMemo(
    () => Array.from(formatValue).join(", ").replaceAll("_", " "),
    [formatValue]
  );

  const [leagueValue, setleagueSelected] = React.useState(new Set(["NBA"]));
  const leagueselected = React.useMemo(
    () => Array.from(leagueValue).join(", ").replaceAll("_", " "),
    [leagueValue]
  );

  const NBAgames = useDataFetcher("games",fetcher, leagueselected)
  const NBAerror = useDataFetcher("error",fetcher, leagueselected)
  const NBAisLoading = useDataFetcher("isLoading",fetcher, leagueselected)

  const DKLive = useDKLiveFetcher("games",fetcher)
  //console.log("DKLive" + DKLive)
  //console.log("NBAgames" + NBAgames)

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Head>
          <title>ARBITRAGE v1.2</title>
          <link rel="icon" href="/basketball.png" />
        </Head>
        <h1 style={{ display: 'flex', alignItems: 'center', marginLeft: 12 }}>
          ARBITRAGE v1.2<img alt='lebron' src='/lebron.png' style={{ marginLeft: 10 }} width='40' height='70' />
        </h1>
        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '14px' }}>
          <Dropdown key="format">
            <Dropdown.Button color="success" css={{ tt: "capitalize"}}style={{ marginLeft: '20px',marginRight: '14px', marginTop: '18px' }}>
              {formatselected}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              selectedKey={formatValue}
              onSelectionChange={setforSelected}
              css={{ backgroundColor: '#8ff2aa'}}
            >
              <Dropdown.Item key="moneyline">Moneyline</Dropdown.Item>
              <Dropdown.Item key="spread">Spread</Dropdown.Item>
              <Dropdown.Item key="total">Total</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown key="league" style={{ marginLeft: '14px' }}>
            <Dropdown.Button color="success" css={{ tt: "capitalize"}}style={{ marginLeft: '3px', marginTop: '18px' }}>
              {leagueValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              selectedKey={leagueValue}
              onSelectionChange={setleagueSelected}
              css={{ backgroundColor: '#8ff2aa'}}
            >
              <Dropdown.Item key="NBA">NBA</Dropdown.Item>
              <Dropdown.Item key="NHL">NHL</Dropdown.Item>
              <Dropdown.Item key="MLBws">Win &apos;23 WS</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div style={{ margin: '0px 0' }}></div>
      <ErrorBoundary key={formatselected + leagueselected}>
        {GamesFun(NBAgames, NBAerror, NBAisLoading,formatselected, leagueselected)}
      </ErrorBoundary>
    </>
  );
  

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

function getSelectedLabel(leagueValue) {
  if (leagueValue == "NBA") {
    return "NBA";
  }
  if (leagueValue == "NHL") {
    return "NHL";
  }
  if (leagueValue == "MLBws") {
    return "Win '23 WS";
  }
}