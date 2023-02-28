export class Teams {
    
    constructor() {
        this.teams = [
                {
                name: "Atlanta Hawks",
                abbreviation: "ATL",
                image: "atlanta-hawks.png",
                color: "#FFD700",
                key: "atlanta-hawks"
                },
              {
                name: "Brooklyn Nets",
                abbreviation: "BKN",
                image: "brooklyn-nets.png",
                color: "#FFD700",
                key: "brooklyn-nets"
              },
              {
                name: "Boston Celtics",
                abbreviation: "BOS",
                image: "boston-celtics.png",
                color: "#FFD700",
                key: "boston-celtics" 
              },
              {
                name: "Charlotte Hornets",
                abbreviation: "CHA",
                image: "charlotte-hornets.png",
                color: "#FFD700",
                key: "charlotte-hornets"
              },
              {
                name: "Chicago Bulls",
                abbreviation: "CHI",
                image: "chicago-bulls.png",
                color: "#FFD700",
                key: "chicago-bulls" 
              },
              {
                name: "Cleveland Cavaliers",
                abbreviation: "CLE",
                image: "cleveland-cavaliers.png",
                color: "#FFD700",
                key: "cleveland-cavaliers" 
              },
              {
                name: "Dallas Mavericks",
                abbreviation: "DAL",
                image: "dallas-mavericks.png",
                color: "#FFD700",
                key: "dallas-mavericks" 
              },
              {
                name: "Denver Nuggets",
                abbreviation: "DEN",
                image: "denver-nuggets.png",
                color: "#FFD700",
                key: "denver-nuggets" 
              },
              {
                name: "Detroit Pistons",
                abbreviation: "DET",
                image: "detroit-pistons.png",
                color: "#FFD700",
                key: "detroit-pistons"
              },
              {
                name: "Golden State Warriors",
                abbreviation: "GSW",
                image: "golden-state-warriors.png",
                color: "#FFD700",
                key: "golden-state-warriors"
              },
              {
                name: "Houston Rockets",
                abbreviation: "HOU",
                image: "houston-rockets.png",
                color: "#FFD700",
                key: "houston-rockets"
              },
              {
                name: "Indiana Pacers",
                abbreviation: "IND",
                image: "indiana-pacers.png",
                color: "#FFD700",
                key: "indiana-pacers"
              },
              {
                name: "Los Angeles Clippers",
                abbreviation: "LAC",
                image: "los-angeles-clippers.png",
                color: "#FFD700",
                key: "los-angeles-clippers"
              },
              {
                name: "Los Angeles Lakers",
                abbreviation: "LAL",
                image: "los-angeles-lakers.png",
                color: "#FFD700",
                key: "los-angeles-lakers"
              },
              {
                name: "Memphis Grizzlies",
                abbreviation: "MEM",
                image: "memphis-grizzlies.png",
                color: "#FFD700",
                key: "memphis-grizzlies"
              },
              {
                name: "Miami Heat",
                abbreviation: "MIA",
                image: "miami-heat.png",
                color: "#FFD700",
                key: "miami-heat"
                },
              {
                name: "Milwaukee Bucks",
                abbreviation: "MIL",
                image: "milwaukee-bucks.png",
                color: "#FFD700",
                key: "milwaukee-bucks"
            },
            {
                name: "Minnesota Timberwolves",
                abbreviation: "MIN",
                image: "minnesota-timberwolves.png",
                color: "#FFD700",
                key: "minnesota-timberwolves"
            },
            {
                name: "New Orleans Pelicans",
                abbreviation: "NOP",
                image: "new-orleans-pelicans.png",
                color: "#FFD700",
                key: "new-orleans-pelicans"
            },
            {
                name: "New York Knicks",
                abbreviation: "NYK",
                image: "new-york-knicks.png",
                color: "#FFD700",
                key: "new-york-knicks"
            },
            {
                name: "Oklahoma City Thunder",
                abbreviation: "OKC",
                image: "oklahoma-city-thunder.png",
                color: "#FFD700",
                key: "oklahoma-city-thunder"
            },
            {
                name: "Orlando Magic",
                abbreviation: "ORL",
                image: "orlando-magic.png",
                color: "#FFD700",
                key: "orlando-magic"
            },
            {
                name: "Philadelphia 76ers",
                abbreviation: "PHI",
                image: "philadelphia-76ers.png",
                color: "#FFD700",
                key: "philadelphia-76ers"
            },
            {
                name: "Phoenix Suns",
                abbreviation: "PHX",
                image: "phoenix-suns.png",
                color: "#FFD700",
                key: "phoenix-suns"
            },
            {
                name: "Portland Trail Blazers",
                abbreviation: "POR",
                image: "portland-trail-blazers.png",
                color: "#FFD700",
                key: "portland-trail-blazers"
            },
            {
                name: "Sacramento Kings",
                abbreviation: "SAC",
                image: "sacramento-kings.png",
                color: "#FFD700",
                key: "sacramento-kings"
            },
            {
                name: "San Antonio Spurs",
                abbreviation: "SAS",
                image: "san-antonio-spurs.png",
                color: "#FFD700",
                key: "san-antonio-spurs"
            },
            {
                name: "Toronto Raptors",
                abbreviation: "TOR",
                image: "toronto-raptors.png",
                color: "#FFD700",
                key: "toronto-raptors"
            },
            {
                name: "Utah Jazz",
                abbreviation: "UTA",
                image: "utah-jazz.png",
                color: "#FFD700",
                key: "utah-jazz"
            },
            {
                name: "Washington Wizards",
                abbreviation: "WAS",
                image: "washington-wizards.png",
                color: "#FFD700",
                key: "washington-wizards"
            }

          ];
    
    }
    getAbbByName(name) {
        const teamname = this.teams.find((team) => team.name === name);
        return teamname && teamname.abbreviation ? teamname.abbreviation : 'null';
      }

      getImgByName(name) {
        const teamname = this.teams.find((team) => team.name === name);
        return teamname && teamname.image ? teamname.image : 'null';
      }
    
    

    
    

}