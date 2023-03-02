import { Radio, Avatar, Loading, Table,Card,Text, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import {Columns} from '../components/columns.js'
import React from "react";

export function gamesFun(games, error, isLoading) {
    const [selected, setSelected] = React.useState("moneyline");
    console.log('hi')  
    if (error) return <div>Failed to load</div>
    if (isLoading) return <Loading size = 'xl' />

    const tableColumns = Columns(selected)

    const gamesArray1 = Object.values(games)
    const gamesArray2 = sortByCommenceTime(gamesArray1)
    const gamesArray = getGamesWithinSameDay(gamesArray2)

    //returns a completed table of all information regarding games and odds
    return (
    <div>
        <Radio.Group
        color="primary"
        orientation="horizontal"
        value={selected}
        onChange={setSelected}
        key = "checkbox"
        >
            <Radio value="moneyline">ML</Radio>
            <Radio value="spread">Spread</Radio>
            <Radio value="totals">O/U</Radio>
        </Radio.Group> 
           
        
        <Table
        lined
        key={selected}
        headerLined
        bordered
        shadow={false}
        aria-label="Example table with dynamic content"
        css={{
            height: "auto",
            minWidth: "100%",
        }}
        
        >
        
        <Table.Header columns={tableColumns}>
            {(column) => (
            <Table.Column key={column.key} align = 'center'>{column.label}</Table.Column>
            )}
        </Table.Header>
        <Table.Body items={gamesArray}>
        {(item) => (
        <Table.Row key={item.key}>
        {tableColumns.map((column) =>
            column.render ? column.render(item, column.key, {selected}) : (
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