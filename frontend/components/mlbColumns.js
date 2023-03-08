import { Radio, Avatar, Loading, Card,Grid, Table, Text, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import moment from 'moment-timezone'
import {MLBteams} from './MLBteams.js'
import styles from '@/styles/Home.module.css'

const matchMLBRender = () => (
    <>
      {MLBteams.map((team) => (
        <Table.Cell key={team}>
          <div className={styles.title}>{team}</div>
        </Table.Cell>
      ))}
    </>
  );

const imageMLBRender = (item, keystring, {selected}, {league}) => {
    const abbreviation = new MLBteams()
    const hometeam = "/"+league+"img/" + abbreviation.getImgByName(item['home_team'])
    const awayteam = "/"+league+"img/" + abbreviation.getImgByName(item['away_team'])

    return(
    <Table.Cell>
        <Tooltip content={item['away_team']} 
        rounded color="primary">
    <Avatar
            size="xl"
            src={awayteam}
            color="success"
            bordered
            zoomed
        />
        </Tooltip>
        <div style={{ height: "20px" }} />
        <Tooltip content={item['home_team']}
        rounded 
        color="primary">
    <Avatar
            size="xl"
            src={hometeam}
            color="success"
            bordered
            zoomed
        />
        </Tooltip>
    </Table.Cell>
    )
};


export const MLBcolumns = (selected)=> {
    return([
    {
        key: "team",
        label: "Team",
        render: matchMLBRender
    },
    {
        key:"images",
        label:"",
        //render: imageMLBRender
    },
    /*{
        key: "bestOddsForGame",
        label: "Best Odds",
        selected: {selected},
        render: bestOddsRender
    },
    {
        key: "draftkings",
        label: "Draft Kings",
        abb: "DK",
        render: futureRender
    },
    {
        key: "fanduel",
        label: "Fan Duel",
        abb: "FD",
        render: futurenRender
    },
    {
        key: "barstool",
        label: "Barstool",
        abb: "BS",
        render: futureRender
    },
    {
        label: "William Hill (US)",
        key: "williamhill_us",
        abb: "WH",
        render: futureRender

    },
    {
        key: "betmgm",
        label: "BetMGM",
        abb: "bMGM",
        render: futureRender
    },
    {
        key: "circasports",
        label: "CircaSports",
        abb: "CS",
        render: futureRender
    },
    {
        key: "betus",
        label: "BetUS",
        abb: "bUS",
        render: futureRender
    },
    {
        key: "foxbet",
        label: "FOX Bet",
        abb: "FB",
        render: futureRender
    },
    {
        key: "bovada",
        label: "Bovada",
        abb: "BOV",
        render: bookColumnRender
    },
    {
        key: "betrivers",
        label: "BetRiver",
        abb: "BR",
        render: bookColumnRender
    }*/

]);}