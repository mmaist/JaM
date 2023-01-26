import requests
import argparse
import json


# An api key is emailed to you when you sign up to a plan
# Get a free API key at https://api.the-odds-api.com/
API_KEY = 'a55ffdec48c698cebf91b35126aa4269'

SPORT = 'basketball_nba' # use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports

REGIONS = 'us' # uk | us | eu | au. Multiple can be specified if comma delimited

MARKETS = 'h2h,spreads,totals' # h2h | spreads | totals. Multiple can be specified if comma delimited

ODDS_FORMAT = 'american' # decimal | american

DATE_FORMAT = 'iso' # iso | unix

DAYS_FROM = "2"

EVENT_ID = '' #insert id for a specific game


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#
# First get a list of in-season sports
#   The sport 'key' from the response can be used to get odds in the next request
#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
def getSportList():
    sports_response = requests.get('https://api.the-odds-api.com/v4/sports', params={
            'api_key': API_KEY
    })


    if sports_response.status_code != 200:
        print(f'Failed to get sports: status_code {sports_response.status_code}, response body {sports_response.text}')

    else:
        print('List of in season sports:', sports_response.json())

   #^^^^^#^^^^#^^^ prints out list of sports and whether they are active or not

    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#
# Now get a list of live & upcoming games for the sport you want, along with odds for different bookmakers
# This will deduct from the usage quota
# The usage quota cost = [number of markets specified] x [number of regions specified]
# For examples of usage quota costs, see https://the-odds-api.com/liveapi/guides/v4/#usage-quota-costs
#
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

def getPastLiveScores():
    pastgames_live = requests.get(f'https://api.the-odds-api.com/v4/sports/{SPORT}/scores', params={
        'api_key': API_KEY,
        'daysFrom': DAYS_FROM,

    })

    #Pastgames_live will print out the games within the past "daysFrom" all the way up to live games going on at time of request
    if pastgames_live.status_code != 200:
        print(f'Failed to get sports: status_code {pastgames_live.status_code}, response body {pastgames_live.text}')
    else:
        print('List of LIVE/PAST games:',json.dumps(pastgames_live.json(),indent = 4))



def getOdds():
    #odds_response will output the odds for a certain region,market and event (if specified)
    odds_response = requests.get(f'https://api.the-odds-api.com/v4/sports/{SPORT}/odds', params={
        'api_key': API_KEY,
        'regions': REGIONS,
        'markets': MARKETS,
        'oddsFormat': ODDS_FORMAT,
        'dateFormat': DATE_FORMAT,
        'eventIds': EVENT_ID,
    })

    if odds_response.status_code != 200:
        print(f'Failed to get odds: status_code {odds_response.status_code}, response body {odds_response.text}')
    else:
        odds_json = odds_response.json()
        print('Number of events:', len(odds_json))
        print(json.dumps(odds_json, indent = 4))

    # Check the usage quota
    print('Remaining requests', odds_response.headers['x-requests-remaining'])
    print('Used requests', odds_response.headers['x-requests-used'])



print("List of available leagues:\n 1. NBA\n 2. NFL \n 3. NHL")
user_input = input("Enter the number of the sport league you would like to view (1,2 or 3): ")
if user_input == 1:
    SPORT = "basketball_nba"
elif user_input == 2: 
    SPORT = "americanfootball_nfl"
elif user_input == 3:
    SPORT = "icehockey_nhl"
else:
    print("Invalid input")



user_input = input("Enter the number of the view you want to see: \n 1. Odds \n 2. Scores (from past 2 days till live): ")

if user_input == "1":
    getOdds()
elif user_input == "2":
    getPastLiveScores()
else:
    print("Invalid input")