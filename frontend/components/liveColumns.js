import { Radio, Avatar, Loading,Image,  Card,Grid, Table, Text, NextUIProvider, Tooltip, Spinner} from "@nextui-org/react";
import moment from 'moment-timezone'
import {NBAteams} from './NBAteams.js'
import {NHLteams} from './NHLteams.js'
import {MLBteams} from './MLBteams.js'
import styles from '@/styles/Home.module.css'


const matchColumnRender = (item) => {
 
    return(
        <Table.Cell css={{textAlign: 'center'}}   >
           <Text>{timeColumnRender(item)}</Text>
            <div style={{ height: "15" }} />
            <Text css = {{fontFamily: "futura", marginLeft: "22px"}}>{item.event.awayName}<br></br> @ {item.event.homeName}</Text>
        </Table.Cell>
    )
};


  //returns matchup time
function timeColumnRender(item){
    const shape = (<svg width = "17" height = "18">
    <g fill="none" fill-rule= "evenodd">
    <circle cx="8" cy="9" r="4" fill = "#CC0202" />
    <circle cx="8" cy="9" r="7.5" stroke = "#E95353" />
  </g></svg>)

    if (item.event.state === "NOT_STARTED") {
        const startTime = new Date(item.event.start)
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const formattedStartTime = startTime.toLocaleString('en-US', {
          timeZone: userTimeZone,
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      
        return (
          <>{formattedStartTime}</>
        )
      
    }else{
    if (!item.liveData.matchClock){
        let inning = inningConverter(item.liveData.score.info)
        return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{shape} <Text size = {15} css = {{marginLeft: "5px"}}>{inning}</Text></div>)
    }else{
    let minutes = item.liveData.matchClock.minutesLeftInPeriod;
    let seconds = item.liveData.matchClock.secondsLeftInMinute;
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{shape} <Text size = {15} css = {{marginLeft: "5px"}}>{"  " + periodConverter(item.liveData.matchClock.period)} · {item.liveData.matchClock.minutesLeftInPeriod}:{seconds}</Text></div>)
}}
return(<div>N/A</div>)
};

const scoreRender = (item) => {
    if (item.event.state === "STARTED"){
    return(
        <Table.Cell >
            {scoreCardRender(item.liveData.score.away)}
            <div style={{ height: "15px" }} />
            {scoreCardRender(item.liveData.score.home)}
        </Table.Cell>
    )
    }
    return (<Table.Cell></Table.Cell>)
    };


//returns the avatars with logos for eaach team
const imageColumnRender = (item, keystring, {selected}, {league}, live, timeInterval) => {
    let abbreviation;
        if (league === "NHL") {
            abbreviation = new NHLteams();
        } else if (league === "MLB"){
            abbreviation = new MLBteams();
        }else
         {
            abbreviation = new NBAteams();
        }
    const hometeam = "/"+league+"img/" + abbreviation.getImgByCombinedName(item.event.homeName)
    const awayteam = "/"+league+"img/" + abbreviation.getImgByCombinedName(item.event.awayName)
    return(
    <Table.Cell css = {{Align: 'center'}} key = {hometeam + awayteam}>
    <div css={{ margin: '0 auto' }}>
    <Image
            src={awayteam}
            alt = {item['away_team']}
            width = {70}
            height = {70}
        />
        <div style={{ height: "15px" }} />
    <Image
            src={hometeam}
            alt = {item['home_team']}
            width = {70}
            height = {70}
        />
       </div>
    </Table.Cell>
    )
};


//Render for DraftKings. Gathers all the information from 'item' and returns it in a displayable format
const MLColumnRender = (item, keystring, {selected},league) => {
    //Finds the specific book for each game, if the isn't found it returns N/A
    let abbreviation;
    if (league === "NHL") {
            abbreviation = new NHLteams();
    } else {
            abbreviation = new NBAteams();
    }
    const h2hResult = item.betOffers.find((offer) => offer.betOfferType.name === "Match");
    let retMes = null;
      
    if (h2hResult) {
        const sortOutcomes1 = sortOutcomesByTeamName(h2hResult.outcomes,item);
        const outcomes1 = sortOutcomes1.map((outcome) => (
            h2hRender(plusAdder(outcome.oddsAmerican))
        ))
        if (outcomes1.length > 1) {
            outcomes1.splice(1, 0, <div style={{ height: "15px" }} />);
          }
          retMes = retMes ? [...retMes, ...outcomes1] : outcomes1;

    }

    if (!retMes) {
        return (
        <Table.Cell>
        {h2hRender('-')}
        <div style={{ height: "15px" }} />
        {h2hRender('-')}
        </Table.Cell>
        )
    }

    return (
        <Table.Cell css = {{textAlign: 'center'}}>
        {retMes}
        </Table.Cell>
    );
    };



const SPColumnRender = (item, keystring, {selected},league) => {

   //Finds the specific book for each game, if the isn't found it returns N/A
   let abbreviation;
   if (league === "NHL") {
           abbreviation = new NHLteams();
   } else {
           abbreviation = new NBAteams();
   }
   const spreadResult = item.betOffers.find((offer) => offer.betOfferType.name === "Handicap");

  
   let retMes = null;


   if (spreadResult) {
       const sortOutcomes2 = sortOutcomesByTeamName(spreadResult.outcomes,item);
       const outcomes1 = sortOutcomes2.map((outcome) => (
       spreadRender(plusAdder(lineConverter(outcome.line)),plusAdder(outcome.oddsAmerican))
       ));
       if (outcomes1.length > 1) {
        outcomes1.splice(1, 0, <div style={{ height: "15px" }} />);
      }
       retMes = retMes ? [...retMes, ...outcomes1] : outcomes1;
   }

   if (!retMes) {
       return (
       <Table.Cell css = {{textAlign: 'center'}}>
       {h2hRender('-')}
       <div style={{ height: "15px" }} />
       {h2hRender('-')}
       </Table.Cell>
       )
   }

   return (
       <Table.Cell css = {{textAlign: 'center'}}>
       {retMes}
       </Table.Cell>
   );
};




const OUColumnRender = (item, keystring, {selected},league, live, timeInterval) => {

   //Finds the specific book for each game, if the isn't found it returns N/A
   let abbreviation;
   if (league === "NHL" && timeInterval) {
           abbreviation = new NHLteams();
   } else {
           abbreviation = new NBAteams();
   }
   const totalResult = item.betOffers.find((offer) => offer.betOfferType.name === "Over/Under");
   let retMes = null;

   if (totalResult) {
       const outcomes2 = totalResult.outcomes.map((outcome) => (
       totRender(lineConverter(outcome.line),plusAdder(outcome.oddsAmerican), outcome.label )
       ))
       if (outcomes2.length > 1) {
        outcomes2.splice(1, 0, <div style={{ height: "15px" }} />);
      }
       retMes = retMes ? [...retMes, ...outcomes2] : outcomes2;
   }

   if (!retMes) {
       return (
       <Table.Cell css = {{Align: 'center'}}>
       {h2hRender('-')}
       <div style={{ height: "15px" }} />
       {h2hRender('-')}
       </Table.Cell>
       )
   }

   return (
       <Table.Cell css = {{Align: 'center'}}>
       {retMes}
       </Table.Cell>
   );
};


   //constants for the column. Includes key, label and which renderer to use
export const liveColumns = (selected)=> {
    return([
    {
        key: "away_team",
        label: "Barstool Sportsbook Live Odds",
        align: 'center',
        render: matchColumnRender
    },
    {
        key:"images",
        label:"",
        align: 'center',
        render: imageColumnRender,
    },
    {
        key: "scores",
        label: "Current Score",
        align: 'center',
        render: scoreRender
    },
    {
        key: "barstoolML",
        label: "ML",
        abb: "BSMl",
        render: MLColumnRender
    },
    {
        key: "barstoolSpread",
        label: "Spread",
        abb: "BSSp",
        render: SPColumnRender
    },
    {
        key: "barstoolO/U",
        label: "O/U",
        abb: "BSOu",
        render: OUColumnRender
    },


]);}

function plusAdder(num){
    if (parseInt(num) > 0){
        return "+" + num;
    } else {
        return parseInt(num);
    }
}

function sortOutcomesByTeamName(outcomes, items) {
    return outcomes.slice().sort((a, b) => {
      if (a.participant === items.event.homeName) return 1;
      if (b.participant === items.event.homeName) return -1;
      return 0;
    });
  }

function lineConverter(line) {
    return Math.round(line / 1000 * 10) / 10;
  }

function periodConverter(period) {
    if (period === "1st period"){
        return "1ST PRD"
    }
    if (period === "2nd period"){
        return "2ND PRD"
    }
    if (period === "3rd period"){
        return "3RD PRD"
    }
    if (period === "1st overtime"){
        return "1OT"
    }
    if (period === "1st Quarter"){
        return "1ST QTR"
    }
    if (period === "2nd Quarter"){
        return "2ND QTR"
    }
    if (period === "3rd Quarter"){
        return "3RD QTR"
    }
    if (period === "4th Quarter"){
        return "4TH QTR"
    }

    return period;
}
function spreadRender(spreadNum, spreadPrice) {
    return (
      <Card variant="bordered"
        css={{ width: "100px", height: "73px", margin: 'auto' }}
        isHoverable>
        <Card.Body css={{ height: '73px', justifyContent: "center", overflow: "hidden", display: 'flex', flexDirection: 'column' }}>
          <Text
            size={25}
            css={{ textAlign: 'center', lineHeight: '1.3' }}>
                <b>{spreadNum}</b>
          </Text>
          <Text
            size={14}
            css={{ textAlign: 'center', lineHeight: '1.5' }}>
                {spreadPrice}
          </Text>
        </Card.Body>
      </Card>
    );
}

function h2hRender(h2hPrice) {

    return (
            <Card variant="bordered"
            css={{ width: "100px", height: "73px", margin: 'auto' }}
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

function scoreCardRender(score) {

    return (
        <Card variant="flat"
        css={{ width: "75px", height: "73px", marginBottom: '10px', margin: 'auto' }}
        >
            <Card.Body css = {{height: '73px', justifyContent: "center", overflow: "hidden", backgroundColor: "#696969"}}>
                <Text 
                    size={25}
                    css = {{textAlign:'center', color: 'white'}}>
                       <b> {score}</b>
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
        css={{ width: "100px", height: "73px", margin: 'auto' }}
        isHoverable>
            <Card.Body css={{ height: '73px', justifyContent: "center", overflow: "hidden", display: 'flex', flexDirection: 'column' }}>
                <Text
                size={22}
                css={{ textAlign: 'center', lineHeight: '1.7'}}>
                    <b>{ou}{totNum}</b>
                </Text>
                <Text
                size={14}
                css={{ textAlign: 'center', lineHeight: '1.2' }}>
                    {totPrice}
                </Text>
            </Card.Body>
        </Card>
    );
}

function inningConverter(str){
    const innings = str.split(' | ');
    const numInnings = innings.length;
    let inningSuffix;
  
    switch (numInnings) {
      case 1:
        inningSuffix = 'st';
        break;
      case 2:
        inningSuffix = 'nd';
        break;
      case 3:
        inningSuffix = 'rd';
        break;
      default:
        inningSuffix = 'th';
        break;
    }
  
    return `${numInnings}${inningSuffix} Inning`;
  }


