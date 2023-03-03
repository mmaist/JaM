import { Radio, Avatar,Dropdown, Loading, Table,Card,Text, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import {Columns} from '../components/columns.js'
import React from "react";

export function gamesFun(games, error, isLoading) {
    const [selectedValue, setSelected] = React.useState(new Set(["moneyline"]));
    const selected = React.useMemo(
      () => Array.from(selectedValue).join(", ").replaceAll("_", " "),
      [selectedValue]
    );
    
    if (error) return <div>Failed to load</div>
    if (isLoading) return <Loading size = 'xl' />

    const tableColumns = Columns(selected)
    const gamesArray1 = Object.values(games)
    const gamesArray2 = sortByCommenceTime(gamesArray1)
    const gamesArray = getGamesWithinSameDay(gamesArray2)

    //returns a completed table of all information regarding games and odds
    return (
    <div>
        
        <Dropdown key = "ddown">
        <Dropdown.Button shadow color="success" css={{ tt: "capitalize"}}style={{ marginLeft: '14px' }}>
            {selectedValue}
        </Dropdown.Button>
        <Dropdown.Menu
            aria-label="Single selection actions"
            color="success"
            disallowEmptySelection
            selectionMode="single"
            variant="shadow"
            selectedKey={selectedValue}
            onSelectionChange={setSelected}
            css={{ backgroundColor: '#8ff2aa'}}
            >
            <Dropdown.Item key="moneyline">Moneyline</Dropdown.Item>
            <Dropdown.Item key="spread">Spread</Dropdown.Item>
            <Dropdown.Item key="totals">O/U</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        <div style={{ margin: '10px 0' }}></div>
           
        <Table
        lined
        key={selected}
        shadow={false}
        sticked
        aria-label="Example table with dynamic content"
        css={{
            height: "auto",
            minWidth: "100%",    
        }}
        >
            {console.log("hih" + selected,{selected})}
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