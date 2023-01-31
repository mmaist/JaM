import requests
import argparse
import json
from google.cloud import storage
from google.cloud import firestore
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/jackmaistros/peppy-sensor-375905-02f812598a1b.json"

def getOdds(SPORT, API_KEY,REGIONS,MARKETS,ODDS_FORMAT,DATE_FORMAT,EVENT_ID):
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
        printJsonListToFile(odds_json)

    # Check the usage quota
    #print('Remaining requests', odds_response.headers['x-requests-remaining'])
    #print('Used requests', odds_response.headers['x-requests-used'])


def printJsonListToFile(jsonlist):
    file = open('test.txt','w')
    db = firestore.Client(project='peppy-sensor-375905')
    for jsonitem in jsonlist:
        db.collection(u'NBA').document(str(jsonitem["id"])).set(jsonitem)
    file.close()


def main():
    
    API_KEY = 'a55ffdec48c698cebf91b35126aa4269'

    SPORT = 'basketball_nba' 

    REGIONS = 'us' 

    MARKETS = 'h2h,spreads,totals' 

    ODDS_FORMAT = 'american'

    DATE_FORMAT = 'iso'

    DAYS_FROM = "2"

    EVENT_ID = '' 
    getOdds(SPORT, API_KEY,REGIONS,MARKETS,ODDS_FORMAT,DATE_FORMAT,EVENT_ID)

main()