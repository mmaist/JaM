import { Radio, Avatar, Loading, Card,Grid, Table, Text, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import moment from 'moment-timezone'
import {MLBteams} from './MLBteams.js'
import styles from '@/styles/Home.module.css'

const matchMLBRender = (item) => (
    <Table.Cell>
        <Text h4>{item.name}</Text>
        </Table.Cell>
        );

const imageMLBRender = (item, keystring, {selected}, {league}) => {
    const abbreviation = new MLBteams()
    //const hometeam = "/"+league+"img/" + abbreviation.getImgByName(item['home_team'])
    //const awayteam = "/"+league+"img/" + abbreviation.getImgByName(item['away_team'])

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

const futureRender = (item, keystring, {selected},league, futArray) => {
    const searchResult = futArray.gamesArray1[0].bookmakers.find((bookmaker) => bookmaker.key === keystring);
    if(!searchResult) return(<Table.Cell>N/A</Table.Cell>)

    const futuremarket = searchResult.markets.find((market) => market.key === 'outrights');


    const searchResult1 = futuremarket.outcomes.find((outcome) => outcome.name === item.name);

    return(
        <Table.Cell>
            {h2hRender(plusMinusAdder(searchResult1.price))}
        </Table.Cell>
    )

    

   return (<Table.Cell>hi</Table.Cell>)

};

const bestOddsRender = (item, keystring, {selected},league, futArray) => {

    let MLmax = 0;
    let MLmaxName = 'hi';
    
    futArray.gamesArray1[0].bookmakers.forEach((bookmaker) => {
        MLBcolumns(selected).forEach((column) => {
            if (column.key === bookmaker.key) {
                const futuremarket = bookmaker.markets.find((market) => market.key === 'outrights');

                if (futuremarket){
                    futuremarket.outcomes.forEach((outcome) => {
                        if (outcome.name === item.name && (outcome.price > MLmax)) {
                        MLmax = outcome.price;
                        MLmaxName = column.abb;
                        }
                    });
                    }
            }
        })
    })






    return(
        <Table.Cell css={{ backgroundColor: '#f2f2f2'}} >
        {bestFutureRender(plusMinusAdder(MLmax), MLmaxName)}
        </Table.Cell>
    )





}

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
    {
        key: "bestOddsForGame",
        label: "Best Odds",
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
        render: futureRender
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
        key: "foxbet",
        label: "FOX Bet",
        abb: "FB",
        render: futureRender
    },
    {
        key: "bovada",
        label: "Bovada",
        abb: "BOV",
        render: futureRender
    },
    {
        key: "betrivers",
        label: "BetRiver",
        abb: "BR",
        render: futureRender
    }
  ]);
}
function plusMinusAdder(num){
    if (num > 0){
        return "+" + num
    }
    else return ("-" + num)
}

function h2hRender(h2hPrice) {

    return (
            <Card variant="bordered"
            css={{ width: "115px", height: "73px", margin: '10px', marginLeft: '17px', marginRight: '0' }}
            isHoverable>
                <Card.Body css = {{height: '73px', justifyContent: "center", overflow: "hidden",}}>
                    <Text 
                        size={25}
                        css = {{textAlign:'center'}}>
                           <b> {h2hPrice}</b>
                    </Text>
                </Card.Body>
            </Card>
      );

}

function bestFutureRender(spreadNum, spreadPrice) {
    return (
      <Card variant="bordered"
        css={{ width: "115px", height: "73px", margin: '10px', marginLeft: '17px', marginRight: '0' }}
        isHoverable>
        <Card.Body css={{ height: '73px', justifyContent: "center", overflow: "hidden", display: 'flex', flexDirection: 'column' }}>
          <Text
            size={25}
            css={{ textAlign: 'center', lineHeight: '1.3' }}>
                <b>{spreadNum}</b>
          </Text>
          <Text
            size={14}
            textAlign="center"
            css={{ textAlign: 'center', lineHeight: '1.5' }}>
                {spreadPrice}
          </Text>
        </Card.Body>
      </Card>
    );
}