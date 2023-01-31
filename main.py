import requests
import argparse
import json
from google.cloud import firestore
import os
import functions_framework



#from flask import Flask

#app = Flask(__name__)

#app.run(port=int(os.environ.get("PORT", 8080)),host='0.0.0.0',debug=True)
#os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/jackmaistros/peppy-sensor-375905-02f812598a1b.json"

#@app.route("/")
@functions_framework.http
def listen(request):
    nba_scores()
    print("lsitened")

def nba_scores():
    SPORT = 'basketball_nba'
    API_KEY = 'a55ffdec48c698cebf91b35126aa4269'
    REGIONS = 'us'
    MARKETS = 'h2h,spreads,totals'
    ODDS_FORMAT = 'american'
    DATE_FORMAT = 'iso'
    DAYS_FROM = "2"
    EVENT_ID = ''

    odds_response = requests.get(f'https://api.the-odds-api.com/v4/sports/{SPORT}/odds', params={
        'api_key': API_KEY,
        'regions': REGIONS,
        'markets': MARKETS,
        'oddsFormat': ODDS_FORMAT,
        'dateFormat': DATE_FORMAT,
        'eventIds': EVENT_ID,
    })

    if odds_response.status_code != 200:
        return f'Failed to get odds: status_code {odds_response.status_code}, response body {odds_response.text}'
    else:
        odds_json = odds_response.json()
        db = firestore.Client(project='peppy-sensor-375905')
        for jsonitem in odds_json:
            db.collection(u'NBA').document(str(jsonitem["id"])).set(jsonitem)
        return 'Data saved successfully to Firestore.'