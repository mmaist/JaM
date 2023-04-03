export class NBAteams {
    
  //Contains: 
    constructor() {
        this.teams = [
                {
                name: "Atlanta Hawks",
                abbreviation: "ATL",
                image: "atlanta-hawks.png",
                color: "#FFD700",
                key: "atlanta-hawks",
                liveName: "ATL Hawks"
                },
              {
                name: "Brooklyn Nets",
                abbreviation: "BKN",
                image: "brooklyn-nets.png",
                color: "#FFD700",
                key: "brooklyn-nets",
                liveName: "BKN Nets"
              },
              {
                name: "Boston Celtics",
                abbreviation: "BOS",
                image: "boston-celtics.png",
                color: "#FFD700",
                key: "boston-celtics",
                liveName: "BOS Celtics"
              },
              {
                name: "Charlotte Hornets",
                abbreviation: "CHA",
                image: "charlotte-hornets.png",
                color: "#FFD700",
                key: "charlotte-hornets",
                liveName: "CHA Hornets"
              },
              {
                name: "Chicago Bulls",
                abbreviation: "CHI",
                image: "chicago-bulls.png",
                color: "#FFD700",
                key: "chicago-bulls",
                liveName: "CHI Bulls" 
              },
              {
                name: "Cleveland Cavaliers",
                abbreviation: "CLE",
                image: "cleveland-cavaliers.png",
                color: "#FFD700",
                key: "cleveland-cavaliers",
                liveName: "CLE Cavaliers" 
              },
              {
                name: "Dallas Mavericks",
                abbreviation: "DAL",
                image: "dallas-mavericks.png",
                color: "#FFD700",
                key: "dallas-mavericks" ,
                liveName: "DAL Mavericks"
              },
              {
                name: "Denver Nuggets",
                abbreviation: "DEN",
                image: "denver-nuggets.png",
                color: "#FFD700",
                key: "denver-nuggets" ,
                liveName: "DEN Nuggets"
              },
              {
                name: "Detroit Pistons",
                abbreviation: "DET",
                image: "detroit-pistons.png",
                color: "#FFD700",
                key: "detroit-pistons",
                liveName: "DET Pistons"
              },
              {
                name: "Golden State Warriors",
                abbreviation: "GSW",
                image: "golden-state-warriors.png",
                color: "#FFD700",
                key: "golden-state-warriors",
                liveName: "GS Warriors"
              },
              {
                name: "Houston Rockets",
                abbreviation: "HOU",
                image: "houston-rockets.png",
                color: "#FFD700",
                key: "houston-rockets",
                liveName: "HOU Rockets"
              },
              {
                name: "Indiana Pacers",
                abbreviation: "IND",
                image: "indiana-pacers.png",
                color: "#FFD700",
                key: "indiana-pacers",
                liveName: "IND Pacers"
              },
              {
                name: "Los Angeles Clippers",
                abbreviation: "LAC",
                image: "los-angeles-clippers.png",
                color: "#FFD700",
                key: "los-angeles-clippers",
                liveName: "LA Clippers"
              },
              {
                name: "Los Angeles Lakers",
                abbreviation: "LAL",
                image: "los-angeles-lakers.png",
                color: "#FFD700",
                key: "los-angeles-lakers",
                liveName: "LA Lakers"
              },
              {
                name: "Memphis Grizzlies",
                abbreviation: "MEM",
                image: "memphis-grizzlies.png",
                color: "#FFD700",
                key: "memphis-grizzlies",
                liveName: "MEM Grizzlies"
              },
              {
                name: "Miami Heat",
                abbreviation: "MIA",
                image: "miami-heat.png",
                color: "#FFD700",
                key: "miami-heat",
                liveName: "MIA Heat"
                },
              {
                name: "Milwaukee Bucks",
                abbreviation: "MIL",
                image: "milwaukee-bucks.png",
                color: "#FFD700",
                key: "milwaukee-bucks",
                liveName: "MIL Bucks"
            },
            {
                name: "Minnesota Timberwolves",
                abbreviation: "MIN",
                image: "minnesota-timberwolves.png",
                color: "#FFD700",
                key: "minnesota-timberwolves",
                liveName: "MIN Timberwolves"
            },
            {
                name: "New Orleans Pelicans",
                abbreviation: "NOP",
                image: "new-orleans-pelicans.png",
                color: "#FFD700",
                key: "new-orleans-pelicans",
                liveName: "NO Pelicans"
            },
            {
                name: "New York Knicks",
                abbreviation: "NYK",
                image: "new-york-knicks.png",
                color: "#FFD700",
                key: "new-york-knicks",
                liveName: "NY Knicks"
            },
            {
                name: "Oklahoma City Thunder",
                abbreviation: "OKC",
                image: "oklahoma-city-thunder.png",
                color: "#FFD700",
                key: "oklahoma-city-thunder",
                liveName: "OKC Thunder"
            },
            {
                name: "Orlando Magic",
                abbreviation: "ORL",
                image: "orlando-magic.png",
                color: "#FFD700",
                key: "orlando-magic",
                liveName: "ORL Magic"
            },
            {
                name: "Philadelphia 76ers",
                abbreviation: "PHI",
                image: "philadelphia-76ers.png",
                color: "#FFD700",
                key: "philadelphia-76ers",
                liveName: "PHI 76ers"
            },
            {
                name: "Phoenix Suns",
                abbreviation: "PHO",
                image: "phoenix-suns.png",
                color: "#FFD700",
                key: "phoenix-suns",
                liveName: "PHO Suns"
            },
            {
                name: "Portland Trail Blazers",
                abbreviation: "POR",
                image: "portland-trail-blazers.png",
                color: "#FFD700",
                key: "portland-trail-blazers",
                liveName: "POR Trail Blazers"
            },
            {
                name: "Sacramento Kings",
                abbreviation: "SAC",
                image: "sacramento-kings.png",
                color: "#FFD700",
                key: "sacramento-kings",
                liveName: "SAC Kings"
            },
            {
                name: "San Antonio Spurs",
                abbreviation: "SA",
                image: "san-antonio-spurs.png",
                color: "#FFD700",
                key: "san-antonio-spurs",
                liveName: "SA Spurs"
            },
            {
                name: "Toronto Raptors",
                abbreviation: "TOR",
                image: "toronto-raptors.png",
                color: "#FFD700",
                key: "toronto-raptors",
                liveName: "TOR Raptors"
            },
            {
                name: "Utah Jazz",
                abbreviation: "UTA",
                image: "utah-jazz.png",
                color: "#FFD700",
                key: "utah-jazz",
                liveName: "UTA Jazz"
            },
            {
                name: "Washington Wizards",
                abbreviation: "WAS",
                image: "washington-wizards.png",
                color: "#FFD700",
                key: "washington-wizards",
                liveName: "WAS Wizards"
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

    getImgByCombinedName(name) {
      const teamname = this.teams.find((team) => team.liveName === name);
      return teamname && teamname.image ? teamname.image : 'null';
    }
  
}