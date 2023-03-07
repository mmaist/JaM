export class NHLteams {
    
    constructor() {
        this.teams = [
                {
                name: "Anaheim Ducks",
                abbreviation: "ANA",
                image: "anaheim-ducks.png",
                color: "#FFD700",
                key: "anaheim-ducks"
                },
              {
                name: "Arizona Coyotes",
                abbreviation: "ARI",
                image: "arizona-coyotes.png",
                color: "#FFD700",
                key: "arizona-coyotes"
              },
              {
                name: "Boston Bruins",
                abbreviation: "BOS",
                image: "boston-bruins.png",
                color: "#FFD700",
                key: "boston-bruins" 
              },
              {
                name: "Buffalo Sabres",
                abbreviation: "BUF",
                image: "buffalo-sabres.png",
                color: "#FFD700",
                key: "buffalo-sabres"
              },
              {
                name: "Calgary Flames",
                abbreviation: "CGY",
                image: "calgary-flames.png",
                color: "#FFD700",
                key: "calgary-flames" 
              },
              {
                name: "Carolina Hurricanes",
                abbreviation: "CAR",
                image: "carolina-hurricanes.png",
                color: "#FFD700",
                key: "carolina-hurricanes" 
              },
              {
                name: "Chicago Blackhawks",
                abbreviation: "CHI",
                image: "chicago-blackhawks.png",
                color: "#FFD700",
                key: "chicago-blackhawks" 
              },
              {
                name: "Colorado Avalanche",
                abbreviation: "COL",
                image: "colorado-avalanche.png",
                color: "#FFD700",
                key: "colorado-avalanche" 
              },
              {
                name: "Columbus Blue Jackets",
                abbreviation: "CBJ",
                image: "columbus-blue-jackets.png",
                color: "#FFD700",
                key: "columbus-blue-jackets"
              },
              {
                name: "Dallas Stars",
                abbreviation: "DAL",
                image: "dallas-stars.png",
                color: "#FFD700",
                key: "dallas-stars"
              },
              {
                name: "Detroit Red Wings",
                abbreviation: "DET",
                image: "detroit-red-wings.png",
                color: "#FFD700",
                key: "detroit-red-wings"
              },
              {
                name: "Edmonton Oilers",
                abbreviation: "EDM",
                image: "edmonton-oilers.png",
                color: "#FFD700",
                key: "edmonton-oilers"
              },
              {
                name: "Florida Panthers",
                abbreviation: "FLA",
                image: "florida-panthers.png",
                color: "#FFD700",
                key: "florida-panthers"
              },
              {
                name: "Los Angeles Kings",
                abbreviation: "LAK",
                image: "los-angeles-kings.png",
                color: "#FFD700",
                key: "los-angeles-kings"
              },
              {
                name: "Minnesota Wild",
                abbreviation: "MIN",
                image: "minnesota-wild.png",
                color: "#FFD700",
                key: "minnesota-wild"
              },
              {
                name: "Montreal Canadiens",
                abbreviation: "MTL",
                image: "montreal-canadiens.png",
                color: "#FFD700",
                key: "montreal-canadiens"
                },
              {
                name: "Nashville Predators",
                abbreviation: "NSH",
                image: "nashville-predators.png",
                color: "#FFD700",
                key: "nashville-predators"
            },
            {
                name: "New Jersey Devils",
                abbreviation: "NJD",
                image: "minnesota-timberwolves.png",
                color: "#FFD700",
                key: "new-jersey-devils"
            },
            {
                name: "New York Islanders",
                abbreviation: "NYI",
                image: "new-york-islanders.png",
                color: "#FFD700",
                key: "new-york-islanders"
            },
            {
                name: "New York Rangers",
                abbreviation: "NYR",
                image: "new-york-rangers.png",
                color: "#FFD700",
                key: "new-york-rangers"
            },
            {
                name: "Ottawa Senators",
                abbreviation: "OTT",
                image: "ottawa-senators.png",
                color: "#FFD700",
                key: "ottawa-senators"
            },
            {
                name: "Philadelphia Flyers",
                abbreviation: "PHI",
                image: "philadelphia-flyers.png",
                color: "#FFD700",
                key: "philadelphia-flyers"
            },
            {
                name: "Pittsburgh Penguins",
                abbreviation: "PIT",
                image: "pittsburgh-penguins.png",
                color: "#FFD700",
                key: "pittsburgh-penguins"
            },
            {
                name: "Seattle Kraken",
                abbreviation: "SEA",
                image: "seattle-kraken.png",
                color: "#FFD700",
                key: "seattle-kraken"
            },
            {
                name: "St. Louis Blues",
                abbreviation: "STL",
                image: "st-louis-blues.png",
                color: "#FFD700",
                key: "st-louis-blues"
            },
            {
                name: "Tampa Bay Lightning",
                abbreviation: "TBL",
                image: "tampa-bay-lightning.png",
                color: "#FFD700",
                key: "tampa-bay-lightning"
            },
            {
                name: "Vancouver Canucks",
                abbreviation: "VAN",
                image: "vancouver-canucks.png",
                color: "#FFD700",
                key: "vancouver-canucks"
            },
            {
                name: "Vegas Golden Knights",
                abbreviation: "VGK",
                image: "vegas-golden-knights.png",
                color: "#FFD700",
                key: "vegas-golden-knights"
            },
            {
                name: "Washington Capitals",
                abbreviation: "WSH",
                image: "washington-capitals.png",
                color: "#FFD700",
                key: "washington-capitals"
            },
            {
                name: "Winnipeg Jets",
                abbreviation: "WPG",
                image: "winnipeg-jets.png",
                color: "#FFD700",
                key: "winnipeg-jets"
            },
            {
                name: "San Jose Sharks",
                abbreviation: "SJS",
                image: "san-jose-sharks.png",
                color: "#FFD700",
                key: "san-jose-sharks"
            },
            {
                name: "Toronto Maple Leafs",
                abbreviation: "TOR",
                image: "toronto-maple-leafs.png",
                color: "#FFD700",
                key: "toronto-maple-leafs"
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