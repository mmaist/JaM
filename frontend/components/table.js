import { Radio, Avatar,Dropdown, Loading, Table,Card,Text, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import {Columns} from '../components/oddsColumns.js'
import {MLBcolumns} from '../components/mlbColumns.js'
import {MLBteams} from './MLBteams.js'
import React from "react";

export function GamesFun(games, error, isLoading, selected, league) {
    
    
    if (error) return <div>Failed to load</div>
    if (isLoading) return <Loading size = 'xl' />

    const tableColumns = Columns(selected)
    const MLBtColumns = MLBcolumns(selected)
    const gamesArray1 = Object.values(games)
    const gamesArray2 = sortByCommenceTime(gamesArray1)
    const gamesArray = getGamesWithinSameDay(gamesArray2)
    
    const mlbTeamnames = new MLBteams()
    const mlbTeamMap = mlbTeamnames.getTeamNames()
    const mlbArray = Object.values(mlbTeamMap)

    let pColumns = null
    if (league ==='MLB') {
        pColumns = MLBtColumns

    }else { pColumns = tableColumns
            }

    //returns a completed table of all information regarding games and odds
    return (
    <div>
        
        <div style={{ margin: '10px 0' }}></div>
           
        <Table
        lined
        shadow={false}
        sticked
        aria-label="Example table with dynamic content"
        css={{
            height: "auto",
            minWidth: "100%",    
        }}
        >
        <Table.Header columns={league === 'MLB' ? MLBtColumns : tableColumns}>
            {(column) => (
            <Table.Column key={column.key} align = 'center'>{column.label}</Table.Column>
            )}
        </Table.Header>
        <Table.Body items={league === 'MLB' ? mlbArray : gamesArray}>
        {(item,index) => (
        <Table.Row key={index}>
        {pColumns.map((column) =>
            column.render ? column.render(item, column.key, {selected}, {league},{gamesArray1}) : (
            <Table.Cell key={column.key} align = "center" >{item[column.key]}</Table.Cell>
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