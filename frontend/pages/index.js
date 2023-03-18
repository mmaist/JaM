import Head from 'next/head';
import React, { useState, useMemo } from 'react';
import { Dropdown } from '@nextui-org/react';
import moment from 'moment-timezone';
import useSWR from 'swr';
import styles from '@/styles/Home.module.css';
import { GamesFun } from '../components/table.js';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useDataFetcher(words, fetchered, league) {
  const { data: games, error, isLoading } = useSWR(
    `https://jam-pcynlb5fzq-uc.a.run.app/get${league}data`,
    fetchered
  );

  if (words === 'games') {
    return games;
  }
  if (words === 'error') {
    return error;
  }
  if (words === 'isLoading') {
    return isLoading;
  }
  return { games, error, isLoading };
}

export default function Home() {
  const [formatValue, setForSelected] = useState('moneyline');
  const [leagueValue, setLeagueSelected] = useState('NBA');

  const NBAgames = useDataFetcher('games', fetcher, leagueValue);
  const NBAerror = useDataFetcher('error', fetcher, leagueValue);
  const NBAisLoading = useDataFetcher('isLoading', fetcher, leagueValue);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Head>
          <title>ARBITRAGE v1.2</title>
          <link rel="icon" href="/basketball.png" />
        </Head>
        <h1 style={{ display: 'flex', alignItems: 'center', marginLeft: 12 }}>
          ARBITRAGE v1.2
          <img
            alt="lebron"
            src="/lebron.png"
            style={{ marginLeft: 10 }}
            width="40"
            height="70"
          />
        </h1>
        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '14px' }}>
          <DropdownSelection
            label="format"
            value={formatValue}
            options={[
              { key: 'moneyline', label: 'Moneyline' },
              { key: 'spread', label: 'Spread' },
              { key: 'total', label: 'Total' },
            ]}
            onChange={setForSelected}
          />
          <DropdownSelection
            label="league"
            value={leagueValue}
            options={[
              { key: 'NBA', label: 'NBA' },
              { key: 'NHL', label: 'NHL' },
              { key: 'MLBws', label: "Win '23 WS" },
            ]}
            onChange={setLeagueSelected}
          />
        </div>
      </div>
      <div style={{ margin: '0px 0' }}></div>
      <ErrorBoundary key={`${formatValue}${leagueValue}`}>
        {GamesFun(NBAgames, NBAerror, NBAisLoading, formatValue, leagueValue)}
      </ErrorBoundary>
    </>
  );
}

function DropdownSelection({ label, value, options, onChange }) {
  const selectedLabel = useMemo(
    () => options.find((option) => option.key === value)?.label,
    [options, value]
  );

  return (
    <Dropdown key={label}>
      <Dropdown.Button color="success" css={{ tt: 'capitalize' }} style={{ marginLeft: '20px', marginRight: '14px', marginTop: '18px' }}></Dropdown.Button>
    </Dropdown>
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
  
