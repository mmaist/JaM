export class MLBteams {
    
    constructor() {
        this.teams = [
                {
                name: "Atlanta Braves",
                abbreviation: "ATL",
                image: "atlanta-braves.png",
                color: "#FFD700",
                key: "atlanta-braves"
                },
              {
                name: "Arizona Diamondbacks",
                abbreviation: "ARI",
                image: "arizona-diamondbacks.png",
                color: "#FFD700",
                key: "arizona-diamondbacks"
              },
              {
                name: "Baltimore Orioles",
                abbreviation: "BAL",
                image: "baltimore-orioles.png",
                color: "#FFD700",
                key: "baltimore-orioles" 
              },
              {
                name: "Boston Red Sox",
                abbreviation: "BOS",
                image: "boston-red-sox.png",
                color: "#FFD700",
                key: "boston-red-sox"
              },
              {
                name: "Chicago Cubs",
                abbreviation: "CHC",
                image: "chicago-cubs.png",
                color: "#FFD700",
                key: "chicago-cubs" 
              },
              {
                name: "Chicago White Sox",
                abbreviation: "CHW",
                image: "chicago-white-sox.png",
                color: "#FFD700",
                key: "chicago-white-sox" 
              },
              {
                name: "Cincinnati Reds",
                abbreviation: "CIN",
                image: "cincinnati-reds.png",
                color: "#FFD700",
                key: "cincinnati-reds" 
              },
              {
                name: "Cleveland Guardians",
                abbreviation: "CLE",
                image: "cleveland-guardians.png",
                color: "#FFD700",
                key: "cleveland-guardians" 
              },
              {
                name: "Colorado Rockies",
                abbreviation: "COL",
                image: "colorado-rockies.png",
                color: "#FFD700",
                key: "colorado-rockies"
              },
              {
                name: "Detroit Tigers",
                abbreviation: "DET",
                image: "detroit-tigers.png",
                color: "#FFD700",
                key: "detroit-tigers"
              },
              {
                name: "Houston Astros",
                abbreviation: "HOU",
                image: "houston-astros.png",
                color: "#FFD700",
                key: "houston-astros"
              },
              {
                name: "Kansas City Royals",
                abbreviation: "KC",
                image: "kansas-city-royals.png",
                color: "#FFD700",
                key: "kansas-city-royals"
              },
              {
                name: "Los Angeles Angels",
                abbreviation: "LAA",
                image: "los-angeles-angels.png",
                color: "#FFD700",
                key: "los-angeles-angels"
              },
              {
                name: "Los Angeles Dodgers",
                abbreviation: "LAD",
                image: "los-angeles-dodgers.png",
                color: "#FFD700",
                key: "los-angeles-dodgers"
              },
              {
                name: "Miami Marlins",
                abbreviation: "MIA",
                image: "miami-marlins.png",
                color: "#FFD700",
                key: "miami-marlins"
              },
              {
                name: "Milwaukee Brewers",
                abbreviation: "MIL",
                image: "milwaukee-brewers.png",
                color: "#FFD700",
                key: "milwaukee-brewers"
                },
              {
                name: "Minnesota Twins",
                abbreviation: "MIN",
                image: "minnesota-twins.png",
                color: "#FFD700",
                key: "minnesota-twins"
            },
            {
                name: "New York Mets",
                abbreviation: "NYM",
                image: "new-york-mets.png",
                color: "#FFD700",
                key: "new-york-mets"
            },
            {
                name: "Oakland Athletics",
                abbreviation: "OAK",
                image: "oakland-athletics.png",
                color: "#FFD700",
                key: "oakland-athletics"
            },
            {
                name: "Philadelphia Phillies",
                abbreviation: "PHI",
                image: "philadelphia-phillies.png",
                color: "#FFD700",
                key: "philadelphia-phillies"
            },
            {
                name: "Pittsburgh Pirates",
                abbreviation: "PIT",
                image: "pittsburgh-pirates.png",
                color: "#FFD700",
                key: "pittsburgh-pirates"
            },
            {
                name: "San Diego Padres",
                abbreviation: "SD",
                image: "san-diego-padres.png",
                color: "#FFD700",
                key: "san-diego-padres"
            },
            {
                name: "San Francisco Giants",
                abbreviation: "SF",
                image: "san-francisco-giants.png",
                color: "#FFD700",
                key: "san-francisco-giants"
            },
            {
                name: "Seattle Mariners",
                abbreviation: "SEA",
                image: "seattle-mariners.png",
                color: "#FFD700",
                key: "seattle-mariners"
            },
            {
                name: "St Louis Cardinals",
                abbreviation: "STL",
                image: "st-louis-cardinals.png",
                color: "#FFD700",
                key: "st-louis-cardinals"
            },
            {
                name: "Tampa Bay Rays",
                abbreviation: "TB",
                image: "tampa-bay-rays.png",
                color: "#FFD700",
                key: "tampa-bay-rays"
            },
            {
                name: "Texas Rangers",
                abbreviation: "TEX",
                image: "texas-rangers.png",
                color: "#FFD700",
                key: "texas-rangers"
            },
            {
                name: "Toronto Blue Jays",
                abbreviation: "TOR",
                image: "toronto-blue-jays.png",
                color: "#FFD700",
                key: "toronto-blue-jays"
            },
            {
                name: "Washington Nationals",
                abbreviation: "WSH",
                image: "washington-nationals.png",
                color: "#FFD700",
                key: "washington-nationals"
            },
            {
                name: "New York Yankees",
                abbreviation: "NYY",
                image: "new-york-yankees.png",
                color: "#FFD700",
                key: "new-york-yankees"
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