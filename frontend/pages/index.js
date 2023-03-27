import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import useSWR from 'swr'
import moment from 'moment-timezone'
import {SSRProvider} from '@react-aria/ssr'
import React, { useEffect, useState, useCallback } from 'react';
import { Avatar, Loading, Popover,Button, Dropdown, Table, Card, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import {GamesFun} from '../components/table.js'
import { css } from '@emotion/react';

//Barstool sports live links
const endpoints = {
  NBA:
    'https://eu-offering-api.kambicdn.com/offering/v2018/pivuspa/listView/basketball/nba/all/all/matches.json?market=US&market=US&includeParticipants=true&useCombined=true&lang=en_US',
  NCAAB:
    'https://eu-offering-api.kambicdn.com/offering/v2018/pivuspa/listView/basketball/ncaab/all/all/matches.json?market=US&market=US&includeParticipants=true&useCombined=true&lang=en_US',
  NHL:
    'https://eu-offering-api.kambicdn.com/offering/v2018/pivuspa/listView/ice_hockey/nhl/all/all/matches.json?market=US&market=US&includeParticipants=true&useCombined=true&lang=en_US',
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

//DataFetcher that returns the data from Barstool Sports live API or the daily data from the custom backend. Returns data,error,isLoading
// based on words, for the league based on league parameter
function useMainDataFetcher(words,fetchered, league, liveSelected){

  let endpoint = "";
  if (liveSelected === "DAILY") {
    endpoint = 'https://jam-pcynlb5fzq-uc.a.run.app/get'+league+'data';
  } else if (liveSelected === "LIVE") {
    endpoint = endpoints[league];
  }
  const { data, error, isLoading, revalidate } = useSWR(endpoint, fetchered, { refreshInterval: 3000 });

  if (words === 'games') {
    return data;
  }
  if (words === 'error') {
    return error;
  }
  if (words === 'isLoading') {
    return isLoading;
  }
  return { data, error, isLoading }
}


///Creates the header and top dropdown elements that allow for user to switch table data
// also calls gamesFun to create the table based on dropdown elements
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

  const [liveValue, setliveSelected] = React.useState(new Set(["DAILY"]));
  const liveselected = React.useMemo(
    () => Array.from(liveValue).join(", ").replaceAll("_", " "),
    [liveValue]
  );


  const { data: games, error, isLoading } = useMainDataFetcher(
    "gamesss",
    fetcher,
    leagueselected,
    liveselected
  );

  //Dis selection elements for MLB futures
  let disMLB = ""
  if (liveselected === "LIVE"){
    disMLB = "MLBws"
  }
  let disLive = ""
  let disSelection = ""
  if (leagueselected === "MLBws"){
    disLive = "LIVE"
    disSelection = ["moneyline","spread","total"]
  }
  
  //Returns frontend elements
  return (
      <SSRProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Head>
          <title>ARBITRAGE v1.4</title>
          <link rel="icon" href="/basketball.png" />
        </Head>
        <h1 style={{ display: 'flex', alignItems: 'center', marginLeft: 12 }}>
          ARBITRAGE v1.4<Image alt='lebron' src='/lebron.png' style={{ marginLeft: 10 }} width='40' height='70' />
        </h1>
        
        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '14px' }}>
          <Dropdown key="liveOrnot" style={{ marginLeft: '14px' }}>
            <Dropdown.Button color="success" css={{ tt: "capitalize"}}style={{ marginLeft: '20px', marginRight: '14px', marginTop: '18px' }}>
              {liveValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="LIVE-DAILY"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              disabledKeys={[disLive]}
              selectedKey={liveValue}
              onSelectionChange={setliveSelected}
              css={{ backgroundColor: '#8ff2aa'}}
            >
              <Dropdown.Item key="LIVE">LIVE</Dropdown.Item>
              <Dropdown.Item key="DAILY">DAILY</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown key="league" style={{ marginLeft: '14px' }}>
            <Dropdown.Button color="success" css={{ tt: "capitalize"}}style={{ marginLeft: '3px',marginRight: '14px', marginTop: '18px' }}>
              {leagueValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="LEAGUE-DROPDOWN"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              disabledKeys={[disMLB]}
              selectedKey={leagueValue}
              onSelectionChange={setleagueSelected}
              css={{ backgroundColor: '#8ff2aa'}}
            >
              <Dropdown.Item key="NBA">NBA</Dropdown.Item>
              <Dropdown.Item key="NHL">NHL</Dropdown.Item>
              <Dropdown.Item key="MLBws">&apos;23 WS Winner</Dropdown.Item>
              <Dropdown.Item key = "NCAAB">NCAAB</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown key="format">
            <Dropdown.Button color="success" css={{ tt: "capitalize"}}style={{ marginLeft: '3px',marginRight: '14px', marginTop: '18px' }}>
              {formatselected}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="FORMAT-DROPDOWN"
              color="success"
              disallowEmptySelection
              selectionMode="single"
              selectedKey={formatValue}
              disabledKeys={disSelection}
              onSelectionChange={setforSelected}
              css={{ backgroundColor: '#8ff2aa'}}
            >
              <Dropdown.Item key="moneyline">Moneyline</Dropdown.Item>
              <Dropdown.Item key="spread">Spread</Dropdown.Item>
              <Dropdown.Item key="total">Total</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Popover isBordered placement="left-top">
            <Popover.Trigger>
              <Button auto bordered aria-label = "popover Button" color="success" css={{ display: 'flex', position: 'fixed', top: '1%', right: '1%' }}>?</Button>
            </Popover.Trigger>
            <Popover.Content css = {{backgroundColor: '#F0F3F5', padding: '8px'}}><b>LIVE:</b> Updates odds for barstool sportsbook every 5 seconds.<br></br><b>DAILY: </b>Odds are updated once a day at 8:45 PST</Popover.Content>
          </Popover>
          
        </div>
      </div>
      <div style={{ margin: '0px 0' }}></div>
      <ErrorBoundary key={formatselected + leagueselected + liveselected}>
        {
          GamesFun(games, error, isLoading, formatselected, leagueselected, liveselected)
        }
      </ErrorBoundary>
      </SSRProvider>
    
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
