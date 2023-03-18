import { Radio, Avatar, Loading, Image, Card, Grid, Table, Text, NextUIProvider, Tooltip, Spinner } from "@nextui-org/react";
import moment from "moment-timezone";
import { NBAteams } from "./NBAteams.js";
import { NHLteams } from "./NHLteams.js";
import styles from "@/styles/Home.module.css";

const matchColumnRender = (item) => (
  <Table.Cell>
    <div className={styles.title}>
      {item["away_team"]}
      <br />@ {item["home_team"]}
    </div>
  </Table.Cell>
);

//returns the avatars with logos for eaach team
const imageColumnRender = (item, league) => {
  const abbreviation =
    league === "NHL" ? new NHLteams() : new NBAteams();

  const hometeam =
    "/" + league + "img/" + abbreviation.getImgByName(item["home_team"]);
  const awayteam =
    "/" + league + "img/" + abbreviation.getImgByName(item["away_team"]);

  return (
    <Table.Cell>
      <Image
        src={awayteam}
        alt={item["away_team"]}
        width={70}
        height={70}
      />
      <div style={{ height: "15px" }} />
      <Image
        src={hometeam}
        alt={item["home_team"]}
        width={70}
        height={70}
      />
    </Table.Cell>
  );
};


//Render for DraftKings. Gathers all the information from 'item' and returns it in a displayable format
const bookColumnRender = (item, keystring, selected, league) => {
  let abbreviation;
  if (league === "NHL") {
    abbreviation = new NHLteams();
  } else {
    abbreviation = new NBAteams();
  }

  const searchResult = item.bookmakers.find((bookmaker) => bookmaker.key === keystring);

  if (!searchResult) {
    return (
      <Table.Cell>
        {h2hRender('-')}
        {h2hRender('-')}
      </Table.Cell>
    )
  }

  const h2hmarket = searchResult.markets.find((hmarket) => hmarket.key === 'h2h');
  const spreadmarket = searchResult.markets.find((smarket) => smarket.key === 'spreads');
  const totalsmarket = searchResult.markets.find((tmarket) => tmarket.key === 'totals');

  let renderedOutcomes = [];

  if (selected === "moneyline" && h2hmarket) {
    const sortedOutcomes = sortOutcomesByTeamName(h2hmarket.outcomes, item);
    renderedOutcomes = sortedOutcomes.map((outcome) => h2hRender(plusAdder(outcome.price)));
  }

  if (selected === "spread" && spreadmarket) {
    const sortedOutcomes = sortOutcomesByTeamName(spreadmarket.outcomes, item);
    const spreadOutcomes = sortedOutcomes.map((outcome) => spreadRender(plusAdder(outcome.point), plusAdder(outcome.price)));
    renderedOutcomes = [...renderedOutcomes, ...spreadOutcomes];
  }

  if (selected === "total" && totalsmarket) {
    const totalOutcomes = totalsmarket.outcomes.map((outcome) => totRender(outcome.point, plusAdder(outcome.price), outcome.name));
    renderedOutcomes = [...renderedOutcomes, ...totalOutcomes];
  }

  if (renderedOutcomes.length === 0) {
    return (
      <Table.Cell>
        {h2hRender('-')}
        {h2hRender('-')}
      </Table.Cell>
    )
  }

  return (
    <Table.Cell>
      {renderedOutcomes}
    </Table.Cell>
  );
};

const getBestOdds = (item, marketKey, outcomePredicate) => {
  let bestOdds = {
    value: null,
    price: null,
    bookmaker: null,
  };

  item.bookmakers.forEach((bookmaker) => {
    const market = bookmaker.markets.find((m) => m.key === marketKey);
    if (market) {
      market.outcomes.forEach((outcome) => {
        if (outcomePredicate(outcome)) {
          const isNewBest = !bestOdds.value ||
            outcome.point > bestOdds.value ||
            (outcome.point === bestOdds.value && outcome.price > bestOdds.price);

          if (isNewBest) {
            bestOdds = {
              value: outcome.point,
              price: outcome.price,
              bookmaker: bookmaker.key,
            };
          }
        }
      });
    }
  });

  return bestOdds;
};

const bestOddsRender = (item, keystring, { selected }) => {
  const awayTeam = item['away_team'];
  const homeTeam = item['home_team'];

  const bestOdds = {
    moneyline: {
      away: getBestOdds(item, 'h2h', (outcome) => outcome.name === awayTeam),
      home: getBestOdds(item, 'h2h', (outcome) => outcome.name === homeTeam),
    },
    spread: {
      away: getBestOdds(item, 'spreads', (outcome) => outcome.name === awayTeam),
      home: getBestOdds(item, 'spreads', (outcome) => outcome.name === homeTeam),
    },
    total: {
      over: getBestOdds(item, 'totals', (outcome) => outcome.name === 'Over'),
      under: getBestOdds(item, 'totals', (outcome) => outcome.name === 'Under'),
    },
  };

  const bestOddsCell = (outcome) => {
    const bookmaker = Columns(selected).find((column) => column.key === outcome.bookmaker);
    const abbreviation = bookmaker?.abb || '-';
    const value = outcome.value !== null ? plusAdder(outcome.value) : '-';
    const price = outcome.price !== null ? plusAdder(outcome.price) : '-';

    return (
      <div>
        {value} ({price}) <small>{abbreviation}</small>
      </div>
    );
  };

  const renderCell = () => {
    switch (selected) {
      case 'moneyline':
        return (
          <Table.Cell css={{ backgroundColor: '#f2f2f2', margin: 'auto', textAlign: 'center' }}>
            {bestOddsCell(bestOdds.moneyline.away)}
            {bestOddsCell(bestOdds.moneyline.home)}
          </Table.Cell>
        );
      case 'total':
        return (
          <Table.Cell css={{ backgroundColor: '#f2f2f2', margin: 'auto', textAlign: 'center' }}>
            {bestOddsCell(bestOdds.total.over)}
            {bestOddsCell(bestOdds.total.under)}
          </Table.Cell>
        );
      case 'spread':
        return (
          <Table.Cell css={{ backgroundColor: '#f2f2f2', margin: 'auto', textAlign: 'center' }}>
            {bestOddsCell(bestOdds.spread.away)}
            {bestOddsCell(bestOdds.spread.home)}
          </Table.Cell>
        );
      default:
        return (
          <Table.Cell>
            Best Odds N/A
          </Table.Cell>
        );
    }
  };

  return renderCell();
}

  
   //constants for the column. Includes key, label and which renderer to use
const Columns = (selected) => [
  {
    key: "away_team",
    label: "Matchup",
    render: matchColumnRender,
  },
  {
    key: "commence_time",
    label: "Time",
    render: timeColumnRender,
  },
  {
    key: "images",
    label: "",
    render: imageColumnRender,
  },
  {
    key: "bestOddsForGame",
    label: "Best Odds",
    selected: { selected },
    render: bestOddsRender,
  },
  {
    key: "draftkings",
    label: "Draft Kings",
    abb: "DK",
    render: bookColumnRender,
  },
  {
    key: "fanduel",
    label: "Fan Duel",
    abb: "FD",
    render: bookColumnRender,
  },
  {
    key: "barstool",
    label: "Barstool",
    abb: "BS",
    render: bookColumnRender,
  },
  {
    label: "William Hill (US)",
    key: "williamhill_us",
    abb: "WH",
    render: bookColumnRender,
  },
  {
    key: "betmgm",
    label: "BetMGM",
    abb: "bMGM",
    render: bookColumnRender,
  },
  {
    key: "superbook",
    label: "SuperBook",
    abb: "SB",
    render: bookColumnRender,
  },
  {
    key: "betus",
    label: "BetUS",
    abb: "bUS",
    render: bookColumnRender,
  },
  {
    key: "pointsbetus",
    label: "PointsBet (US)",
    abb: "PB",
    render: bookColumnRender,
  },
  {
    key: "mybookieag",
    label: "MyBookie.ag",
    abb: "MB.ag",
    render: bookColumnRender,
  },
  {
    key: "unibet_us",
    label: "Unibet",
    abb: "Uni",
    render: bookColumnRender,
  },
];

export { Columns };

const plusAdder = (num) => (num > 0 ? "+" + num : num);

const sortOutcomesByTeamName = (outcomes, items) => {
  return outcomes.slice().sort((a, b) => {
    if (a.name === items["home_team"]) return 1;
    if (b.name === items["home_team"]) return -1;
    return 0;
  });
};

const CardComponent = ({ children, ...props }) => (
  <Card
    variant="bordered"
    css={{
      width: "85px",
      height: "73px",
      margin: "10px",
      marginLeft: "17px",
      marginRight: "0",
    }}
    isHoverable
    {...props}
  >
    <Card.Body
      css={{
        height: "73px",
        justifyContent: "center",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Card.Body>
  </Card>
);
const CardComponent = ({ children, ...props }) => (
  <Card
    variant="bordered"
    css={{
      width: "85px",
      height: "73px",
      margin: "10px",
      marginLeft: "17px",
      marginRight: "0",
    }}
    isHoverable
    {...props}
  >
    <Card.Body
      css={{
        height: "73px",
        justifyContent: "center",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Card.Body>
  </Card>
);

const spreadRender = (spreadNum, spreadPrice) => (
  <CardComponent>
    <Text size={25} css={{ textAlign: "center", lineHeight: "1.3" }}>
      <b>{spreadNum}</b>
    </Text>
    <Text size={14} css={{ textAlign: "center", lineHeight: "1.5" }}>
      {spreadPrice}
    </Text>
  </CardComponent>
);

const h2hRender = (h2hPrice) => (
  <CardComponent>
    <Text size={25} css={{ textAlign: "center" }}>
      <b>{h2hPrice}</b>
    </Text>
  </CardComponent>
);

const totRender = (totNum, totPrice, totName) => {
  const ou = totName === "Under" ? "u" : "o";

  return (
    <CardComponent>
      <Text size={22} css={{ textAlign: "center", lineHeight: "1.7" }}>
        <b>
          {ou}
          {totNum}
        </b>
      </Text>
      <Text size={14} css={{ textAlign: "center", lineHeight: "1.2" }}>
        {totPrice}
      </Text>
    </CardComponent>
  );
};

const bestTotRender = (totNum, totPrice, totName, totName2) => {
  let ou = "";
  if (totName2 === "Under") {
    ou = "u";
  } else if (totName2 === "Over") {
    ou = "o";
  }

  return (
    <CardComponent>
      <Text size={21} css={{ textAlign: "center", lineHeight: "1.3" }}>
        <b>
          {ou}
          {totNum}
        </b>
      </Text>
      <Text size={17} css={{ textAlign: "center", lineHeight: "1.2" }}>
        {totPrice}
      </Text>
      <Text size={13} css={{ textAlign: "center", lineHeight: "1.3" }}>
        {totName}
      </Text>
    </CardComponent>
  );
};
