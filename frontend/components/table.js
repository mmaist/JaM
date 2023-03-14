import { Radio, Avatar,Dropdown, Loading, Table,Card,Text, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import {Columns} from '../components/oddsColumns.js'
import {MLBcolumns} from '../components/mlbColumns.js'
import {liveColumns} from '../components/liveColumns.js'
import {MLBteams} from './MLBteams.js'
import React from "react";
import { SSRProvider } from "@react-aria/ssr";
import { v4 as uuidv4 } from "uuid";


export function GamesFun(games, error, isLoading, selected, league, liveJSON) {
    if (error) return <div>Failed to load</div>
    if (isLoading || !games) return <Loading size = 'xl' />
    if (liveJSON === 'LIVE') {
      console.log(games.events)
    }

    let gamesArray = null;
    let newLiveArray = null;
    let gamesArray2 = null;
    let gamesArray1 = null;
    
    const tableColumns = Columns(selected)
    const MLBtColumns = MLBcolumns(selected)
    const liveorNotColumns = liveColumns(selected)
   if (games){
    gamesArray1 = Object.values(games)
    gamesArray2 = sortByCommenceTime(gamesArray1)
    gamesArray = getGamesWithinSameDay(gamesArray2) 
    console.log("games" + gamesArray)
    if (liveJSON === 'LIVE') {
      const liveOrNotArray = Object.values(games);
      const [firstObject] = liveOrNotArray;
       newLiveArray = [firstObject];
    //console.log("idTest" + newLiveArray[0,0].event.id)

    console.log("NWA" + newLiveArray)
    }
   }
    // Use map() to add a unique id to eah object in newLiveArray
    
   
    
    


    let mlbArray = null;
    if (league ==='MLBws' && liveJSON === 'DAILY') {
    const mlbArray2 =  addBestOdds("", gamesArray1,"")
    mlbArray = sortByBestOdds(mlbArray2)
    }

    //console.log("oldLiveArray" + oldLiveArray);
    //console.log("newLiveArray" + newLiveArray)
   // console.log("gamesArray" + gamesArray)

    
    let pColumns = tableColumns

    if (liveJSON === 'LIVE') {
        pColumns = liveorNotColumns
    }else
    if (league ==='MLBws' && liveJSON) {
        pColumns = MLBtColumns
    }

    //returns a completed table of all information regarding games and odds
    return (
    <SSRProvider>
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
          <Table.Header columns={league === 'MLBws' ? (liveJSON === 'LIVE' ? liveorNotColumns : MLBtColumns) : (liveJSON === 'LIVE' ? liveorNotColumns : tableColumns)} >
              {(column) => (
              <Table.Column key={column.key} align = 'center'>{column.label}</Table.Column>
              )}
          </Table.Header>
          <Table.Body items={league === 'MLBws' ? (liveJSON === 'LIVE' ? newLiveArray[0] : mlbArray) : (liveJSON === 'LIVE' ? newLiveArray[0] : gamesArray)} >
          {(item,index) => (
          <Table.Row key={uuidv4()}>
          {pColumns.map((column, index) =>
              column.render ? column.render(item, column.key, {selected}, {league},{gamesArray1}) : (
              <Table.Cell key={column.key} align = "center" >{column.key}</Table.Cell>
              )
          )}
          </Table.Row>
      )}
          </Table.Body>
          </Table>
      
      </div>
    </SSRProvider>
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

 
function sortByBestOdds(events) {
    return events.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });
  }

function addBestOdds(mlbArray, futArray, events){
    let mlbTeamnamessamp = new MLBteams()
    let mlbTeamMapsamp = mlbTeamnamessamp.getTeamNames()
    let resultsArray = [];
    
    mlbTeamMapsamp.forEach((item) => {
        let MLmax = 0;
        let MLmaxName = null;
        futArray[0].bookmakers.forEach((bookmaker) => {
        MLBcolumns().forEach((column) => {
            if (column.key === bookmaker.key) {
                const futuremarket = bookmaker.markets.find((market) => market.key === 'outrights');

                if (futuremarket){
                    futuremarket.outcomes.forEach((outcome) => {
                        if (outcome.name === item.name && (outcome.price > MLmax)) {
                        MLmax = outcome.price;
                        MLmaxName = outcome.name;
                        }
                    });
                    }
            }
        })
    })
    
    const result = {
        price: MLmax,
        name: MLmaxName,
        key: MLmaxName
      };
      
      
      resultsArray.push(result);
    
});

return (resultsArray)

}