import { Radio, Avatar, Loading, Table, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import moment from 'moment-timezone'
import {Teams} from '../components/teams.js'

const matchColumnRender = (item) => (
    <Table.Cell>
      {item['away_team']}<br></br> @ {item['home_team']}
    </Table.Cell>
);

  //returns matchup time
const timeColumnRender = (item) => (
    <Table.Cell>
        {moment.utc(item['commence_time']).tz('America/Los_Angeles').format('MMM D, h:mm A')}
    </Table.Cell>
);

//returns the avatars with logos for eaach team
const imageColumnRender = (item) => {
    const abbreviation = new Teams();
    const hometeam = "/TeamIMG/" + abbreviation.getImgByName(item['home_team'])
    const awayteam = "/TeamIMG/" + abbreviation.getImgByName(item['away_team'])

    return(
    <Table.Cell>
        <Tooltip content={item['away_team']} 
        rounded color="primary">
    <Avatar
            size="lg"
            src={awayteam}
            color="gradient"
            bordered
            zoomed
        />
        </Tooltip>
        <div> </div>
        <Tooltip content={item['home_team']}
        rounded 
        color="primary">
    <Avatar
            size="lg"
            src={hometeam}
            color="gradient"
            bordered
            zoomed
        />
        </Tooltip>
    </Table.Cell>
    )
};


//Render for DraftKings. Gathers all the information from 'item' and returns it in a displayable format
const bookColumnRender = (item, keystring, {selected}) => {
    //Finds the specific book for each game, if the isn't found it returns N/A
    const abbreviation = new Teams();

    const searchResult = item.bookmakers.find((bookmaker) => bookmaker.key === keystring);
    const h2hmarket = searchResult.markets.find((hmarket) => hmarket.key === 'h2h');
    const spreadmarket = searchResult.markets.find((smarket) => smarket.key === 'spreads');
    const totalsmarket = searchResult.markets.find((tmarket) => tmarket.key === 'totals');

    let retMes = null;

    if (!searchResult) {
        return <Table.Cell>N/A</Table.Cell>;
    }

    if (selected=="moneyline" && h2hmarket) {
        retMes = h2hmarket.outcomes.map((outcome) => (
        <div key={outcome.name}><b>{plusAdder(outcome.price)}</b> {plusAdder(outcome.point)} {abbreviation.getAbbByName(outcome.name)}</div>
        ))
    }

    if (selected=="spread" && spreadmarket) {
        const outcomes = spreadmarket.outcomes.map((outcome) => (
        <div key={outcome.name}><b>{plusAdder(outcome.price)}</b> {plusAdder(outcome.point)} {abbreviation.getAbbByName(outcome.name)}</div>
        ));
        retMes = retMes ? [...retMes, ...outcomes] : outcomes;
    }

    if (selected=="totals" && totalsmarket) {
        const totoutcomes = totalsmarket.outcomes.map((outcome) => (
        <div key={outcome.name}><b>{plusAdder(outcome.price)}</b> {outcome.point} {outcome.name}</div>
        ))
        retMes = retMes ? [...retMes, ...totoutcomes] : totoutcomes;
    }

    if (!retMes) {
        return (
        <Table.Cell>
            <div>Not Available</div>
        </Table.Cell>
        )
    }

    return (
        <Table.Cell>
        {retMes}
        </Table.Cell>
    );

};
  
   //constants for the column. Includes key, label and which renderer to use
export const Columns = (selected)=> {
    return([
    {
        key: "away_team",
        label: "Matchup",
        render: matchColumnRender
    },
    {
        key: "commence_time",
        label: "Time",
        render: timeColumnRender
    },
    {
        key:"images",
        label:"",
        render: imageColumnRender
    },
    {
        key: "bestOddsForGame",
        label: "Best Odds",
        
    },
    {
        key: "draftkings",
        label: "Draft Kings",
        selected: {selected},
        render: bookColumnRender
    },
    {
        key: "fanduel",
        label: "Fan Duel",
        render: bookColumnRender
    },
    {
        key: "barstool",
        label: "Barstool",
        render: bookColumnRender
    },
    {
        label: "William Hill (US)",
        key: "williamhill_us",
        render: bookColumnRender

    },
    {
        label: "LowVig.ag",
        key: "lowvig",
        render: bookColumnRender
    },
    {
        key: "betonlineag",
        label: "BetOnline.ag",
        render: bookColumnRender
    },
    {
        label: "WynnBET",
        key: "wynnbet",
        render: bookColumnRender
    },
    {
        key: "bovada",
        label: "Bovada",
        render: bookColumnRender
    },
    {
        key: "betmgm",
        label: "BetMGM",
        render: bookColumnRender
    },
    {
        key: "circasports",
        label: "Circa Sports",
        render: bookColumnRender
    },
    {
        key: "superbook",
        label: "SuperBook",
        render: bookColumnRender
    },
    {
        key: "betus",
        label: "BetUS",
        render: bookColumnRender
    },
    {
        key: "pointsbetus",
        label: "PointsBet (US)",
        render: bookColumnRender
    },
    {
        key: "mybookieag",
        label: "MyBookie.ag",
        render: bookColumnRender
    },
    {
        key: "twinspires",
        label: "Twinspires",
        render: bookColumnRender
    },
    {
        key: "betrivers",
        label: "BetRivers",
        render: bookColumnRender
    },
    {
        key: "unibet_us",
        label: "Unibet",
        render: bookColumnRender
    },
    {
        key: "sugarhouse",
        label: "SugarHouse",
        render: bookColumnRender
    }

]);}

function plusAdder(num){
    if (num > 0){
        return "+" + num
    }
    else return (num)
}