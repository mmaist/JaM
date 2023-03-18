import React from 'react';
import { Table, Loading } from '@nextui-org/react';
import { Columns } from '../components/oddsColumns.js';
import { MLBcolumns } from '../components/mlbColumns.js';
import { MLBteams } from './MLBteams.js';

export function GamesFun(games, error, isLoading, selected, league) {
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loading size="xl" />;

  const tableColumns = Columns(selected);
  const MLBtColumns = MLBcolumns(selected);

  const gamesArray = getGamesWithinSameDay(sortByCommenceTime(games));
  const mlbArray = sortByBestOdds(addBestOdds(games));

  const pColumns = league === 'MLBws' ? MLBtColumns : tableColumns;

  return (
    <div>
      <div style={{ margin: '10px 0' }}></div>

      <Table
        lined
        shadow={false}
        sticked
        aria-label="Example table with dynamic content"
        css={{
          height: 'auto',
          minWidth: '100%',
        }}
      >
        <Table.Header columns={league === 'MLBws' ? MLBtColumns : tableColumns}>
          {(column) => (
            <Table.Column key={column.key} align="center">
              {column.label}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={league === 'MLBws' ? mlbArray : gamesArray}>
          {(item, index) => (
            <Table.Row key={index}>
              {pColumns.map((column) =>
                column.render ? (
                  column.render(item, column.key, { selected }, { league }, { games })
                ) : (
                  <Table.Cell key={column.key} align="center">
                    {item[column.key]}
                  </Table.Cell>
                )
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
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

function sortByCommenceTime(events) {
  return events.sort((a, b) => a.commence_time - b.commence_time);
}

function sortByBestOdds(events) {
  return events.sort((a, b) => a.price - b.price);
}

function addBestOdds(games) {
  const mlbTeams = new MLBteams();
  const mlbTeamNames = mlbTeams.getTeamNames();
  let resultsArray = [];

  mlbTeamNames.forEach((team) => {
    let maxOdds = 0;
    let maxName = null;

    games[0].bookmakers.forEach((bookmaker) => {
      MLBcolumns().forEach((column) => {
        if (column.key === bookmaker.key) {
          const futureMarket = bookmaker.markets.find((market) => market.key === 'outrights');

          if (futureMarket) {
            futureMarket.outcomes.forEach((outcome) => {
              if (outcome.name === team.name && outcome.price > maxOdds) {
                maxOdds = outcome.price;
                maxName = outcome.name;
              }
            });
          }
        }
      });
    });

    const result = {
      price: maxOdds,
      name: maxName,
      key: maxName,
    };

    resultsArray.push(result);
  });

  return resultsArray;
}
