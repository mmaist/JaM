import { Radio, Avatar, Loading, Card,Grid, Table, Text, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
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
            size="xl"
            src={awayteam}
            color="gradient"
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
   
    let retMes = null;

    if (!searchResult) {
        return (
            <Table.Cell>
            {h2hRender('-')}
            {h2hRender('-')}
            </Table.Cell>
            )
    }
    if (searchResult){
        const h2hmarket = searchResult.markets.find((hmarket) => hmarket.key === 'h2h');
        const spreadmarket = searchResult.markets.find((smarket) => smarket.key === 'spreads');
        const totalsmarket = searchResult.markets.find((tmarket) => tmarket.key === 'totals');
        
    if (selected=="moneyline" && h2hmarket) {
        const sortOutcomes1 = sortOutcomesByTeamName(h2hmarket.outcomes,item);
        retMes = sortOutcomes1.map((outcome) => (
            h2hRender(plusAdder(outcome.price))
        ))
    }

    if (selected=="spread" && spreadmarket) {
        const sortOutcomes2 = sortOutcomesByTeamName(spreadmarket.outcomes,item);
        const outcomes1 = sortOutcomes2.map((outcome) => (
        spreadRender(plusAdder(outcome.point),plusAdder(outcome.price))
        ));
        retMes = retMes ? [...retMes, ...outcomes1] : outcomes1;
    }

    if (selected=="totals" && totalsmarket) {
        const outcomes2 = totalsmarket.outcomes.map((outcome) => (
        totRender(outcome.point,plusAdder(outcome.price), outcome.name )
        ))
        retMes = retMes ? [...retMes, ...outcomes2] : outcomes2;
    }

    if (!retMes) {
        return (
        <Table.Cell>
        {h2hRender('-')}
        {h2hRender('-')}
        </Table.Cell>
        )
    }

    return (
        <Table.Cell>
        {retMes}
        </Table.Cell>
    );
    }

};


const bestOddsRender = (item, keystring, {selected}) => {
    let MLmax = 0;
    let MLmaxName = null;
    let foundPositivePrice = false;
    let MLmin = -100000000;
    let MLminName = null;

    let SPmax = 0;
    let SPmaxName = null;
    let foundPositiveSpread = false;
    let SPmin = -100000000;
    let SPminName = null;
    let SPmaxPrice = -10000000;
    let SPminPrice = -1000000;

    let TOmax = 100000000;
    let TOmaxName = null;
    let foundPositiveTotal = false;
    let TOmin = 0.0;
    let TOminName = null; 
    let TOmaxPrice = -10000000;
    let TOminPrice = -1000000;

  
    item.bookmakers.forEach((bookmaker) => { 
     Columns(selected).forEach((column) => {
        if (column.key === bookmaker.key) {
            const h2hmarket = bookmaker.markets.find((hmarket) => hmarket.key === 'h2h');
            if (h2hmarket){
            h2hmarket.outcomes.forEach((outcome) => {
                if (outcome.price > 0 && (outcome.price > MLmax || !foundPositivePrice)) {
                MLmax = outcome.price;
                MLmaxName = column.abb;
                foundPositivePrice = true;
                }
                if (outcome.price < 0 && (outcome.price > MLmin )){
                MLmin = outcome.price;
                MLminName = column.abb;
                }
            });
            }
            const spreadmarket = bookmaker.markets.find((smarket) => smarket.key === 'spreads');
            if (spreadmarket){
            spreadmarket.outcomes.forEach((outcome) => {
                if (outcome.point > 0 && (outcome.point > SPmax || !foundPositiveSpread || (outcome.point === SPmax && outcome.price > SPmaxPrice))) {
                SPmaxPrice = outcome.price;
                SPmax = outcome.point;
                SPmaxName = column.abb;
                foundPositiveSpread = true;
                }
                if (outcome.point < 0 && (outcome.point > SPmin || (outcome.point === SPmin && outcome.price > SPminPrice) )){
                SPminPrice = outcome.price;  
                SPmin = outcome.point;
                SPminName = column.abb;
                }
            });
            }
            const totalsmarket = bookmaker.markets.find((tmarket) => tmarket.key === 'totals');
            if (totalsmarket){
            totalsmarket.outcomes.forEach((outcome) => {
                if ((outcome.name ==='Over') && ((outcome.point < TOmax)|| (outcome.price > TOmaxPrice && outcome.point === TOmax))){
                TOmax = outcome.point;
                TOmaxName = column.abb;
                TOmaxPrice = outcome.price;
                }
                if ((outcome.name ==='Under') && ((outcome.point > TOmin) || (outcome.price > TOminPrice && outcome.point === TOmin))){
                TOmin = outcome.point;
                TOminName = column.abb;
                TOminPrice = outcome.price;
                }

            })
        }
    }}
)});
    if (selected == "moneyline"){
        return(
            <Table.Cell css={{ backgroundColor: '#f2f2f2',margin: 'auto',textAlign: 'center'}} >
                 {spreadRender(plusAdder(MLmax),MLmaxName)}
                 {spreadRender(plusAdder(MLmin),MLminName)}
            </Table.Cell>
        )
    }
    if (selected == "totals"){
        return(
            <Table.Cell css={{ backgroundColor: '#f2f2f2',margin: 'auto',textAlign: 'center'}} >
                {bestTotRender(TOmax,TOmaxPrice,TOmaxName,"Over")}
                {bestTotRender(TOmin,TOminPrice,TOminName,"Under")}
            </Table.Cell>
        )
        }
    if (selected == "spread"){
        return(
            <Table.Cell css={{ backgroundColor: '#f2f2f2',margin: 'auto',textAlign: 'center'}} >
                {bestTotRender(plusAdder(SPmax),SPmaxPrice,SPmaxName,"")}
                {bestTotRender(plusAdder(SPmin),SPminPrice,SPminName,"")}
            </Table.Cell>
        )
    }
  
    return (
      <Table.Cell>
        <b>ML:</b>{MLmaxName}  {plusAdder(MLmax)}<br></br>
                {MLminName}  {MLmin}<br></br>
        <b>Spread:</b> {SPmaxName}  {plusAdder(SPmax)}<br></br>
                      {SPminName}  {SPmin}<br></br>
         <b>Over:</b>{TOmaxName}  {(TOmax)}  {TOmaxPrice}<br></br>
         <b>Under:</b>{TOminName}  {TOmin}   {TOminPrice}
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
        selected: {selected},
        render: bestOddsRender
    },
    {
        key: "draftkings",
        label: "Draft Kings",
        abb: "DK",
        render: bookColumnRender
    },
    {
        key: "fanduel",
        label: "Fan Duel",
        abb: "FD",
        render: bookColumnRender
    },
    {
        key: "barstool",
        label: "Barstool",
        abb: "BS",
        render: bookColumnRender
    },
    {
        label: "William Hill (US)",
        key: "williamhill_us",
        abb: "WH",
        render: bookColumnRender

    },
    {
        key: "betmgm",
        label: "BetMGM",
        abb: "bMGM",
        render: bookColumnRender
    },
    {
        key: "superbook",
        label: "SuperBook",
        abb: "SB",
        render: bookColumnRender
    },
    {
        key: "betus",
        label: "BetUS",
        abb: "bUS",
        render: bookColumnRender
    },
    {
        key: "pointsbetus",
        label: "PointsBet (US)",
        abb: "PB",
        render: bookColumnRender
    },
    {
        key: "mybookieag",
        label: "MyBookie.ag",
        abb: "MB.ag",
        render: bookColumnRender
    },
    {
        key: "unibet_us",
        label: "Unibet",
        abb: "Uni",
        render: bookColumnRender
    }

]);}

function plusAdder(num){
    if (num > 0){
        return "+" + num
    }
    else return (num)
}

function sortOutcomesByTeamName(outcomes, items) {
    console.log(items['home_team']);
    return outcomes.slice().sort((a, b) => {
      if (a.name === items['home_team']) return 1;
      if (b.name === items['home_team']) return -1;
      return 0;
    });
  }

function spreadRender(spreadNum, spreadPrice) {
    return (
      <Card variant="bordered"
        css={{ width: "85px", height: "73px", margin: '10px', marginLeft: '17px', marginRight: '0' }}
        isHoverable>
        <Card.Body css={{ height: '73px', justifyContent: "center", overflow: "hidden", display: 'flex', flexDirection: 'column' }}>
          <Text
            size={25}
            css={{ textAlign: 'center', lineHeight: '1.5' }}>
                <b>{spreadNum}</b>
          </Text>
          <Text
            size={15}
            textAlign="center"
            css={{ textAlign: 'center', lineHeight: '1.2' }}>
                {spreadPrice}
          </Text>
        </Card.Body>
      </Card>
    );
}

function h2hRender(h2hPrice) {

    return (
            <Card variant="bordered"
            css={{ width: "85px", height: "73px", margin: '10px', marginLeft: '17px', marginRight: '0' }}
            isHoverable>
                <Card.Body css = {{height: '73px', justifyContent: "center", overflow: "hidden"}}>
                    <Text 
                        size={25}
                        css = {{textAlign:'center'}}>
                           <b> {h2hPrice}</b>
                    </Text>
                </Card.Body>
            </Card>
      );

}
function totRender(totNum, totPrice, totName) {
    let ou = "o"
    if (totName === "Under"){
        ou = "u"
    }

    return (
        <Card variant="bordered"
        css={{ width: "85px", height: "73px", margin: '10px', marginLeft: '17px', marginRight: '0' }}
        isHoverable>
            <Card.Body css={{ height: '73px', justifyContent: "center", overflow: "hidden", display: 'flex', flexDirection: 'column' }}>
                <Text
                size={21}
                css={{ textAlign: 'center', lineHeight: '1.5' }}>
                    <b>{ou}{totNum}</b>
                </Text>
                <Text
                size={11}
                textAlign="center"
                css={{ textAlign: 'center', lineHeight: '1.2' }}>
                    {totPrice}
                </Text>
            </Card.Body>
        </Card>
    );
}

function bestTotRender(totNum, totPrice, totName, totName2) {
    let ou = ""
    if (totName2 === "Under"){
        ou = "u"
    }
    if (totName2 === "Over"){
        ou = "o"
    }

    return (
        <Card variant="bordered"
        css={{ width: "85px", height: "73px", margin: '10px', marginLeft: '17px', marginRight: '0' }}
        isHoverable>
            <Card.Body css={{ height: '73px', justifyContent: "center", overflow: "hidden", display: 'flex', flexDirection: 'column' }}>
                <Text
                size={21}
                css={{ textAlign: 'center', lineHeight: '1.3' }}>
                    <b>{ou}{totNum}</b>
                </Text>
                <Text
                size={17}
                textAlign="center"
                css={{ textAlign: 'center', lineHeight: '1.2' }}>
                    {totPrice}
                </Text>
                <Text
                size={11}
                textAlign="center"
                css={{ textAlign: 'center', lineHeight: '1.3' }}>
                    {totName}
                </Text>
            </Card.Body>
        </Card>
    );
}