import requests
import argparse
import json
from google.cloud import firestore
import os
import functions_framework
from flask import Flask
import datetime

app = Flask(__name__)

# Use a service account.
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/getNBAdata')
def getNBAData():
    
    father_dict = {}
    gamecounter = 0
    db = firestore.Client(project='peppy-sensor-375905')

    query = db.collection(u'NBA').order_by(u'commence_time', direction=firestore.Query.DESCENDING).limit(13).stream()

    for doc in query:
        gamecounter = gamecounter + 1
        father_dict['game'+ (str(gamecounter))] = doc.to_dict()
    
    json_return = json.dumps(father_dict)
    return(json_return)
    
    
    #testing below
    #with open("test.txt", "w") as outfile:
    #   outfile.write(json_return)
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

@app.route('/getNHLdata')
def getNHLData():
    
    father_dict = {}
    gamecounter = 0
    db = firestore.Client(project='peppy-sensor-375905')

    query = db.collection(u'NHL').order_by(u'commence_time', direction=firestore.Query.DESCENDING).limit(16).stream()

    for doc in query:
        gamecounter = gamecounter + 1
        father_dict['game'+ (str(gamecounter))] = doc.to_dict()
    
    json_return = json.dumps(father_dict)
    return(json_return)
    
    
    #testing below
    #with open("test.txt", "w") as outfile:
    #   outfile.write(json_return)
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

@app.route('/getMLBwsdata')
def getMLBwsData():
    
    father_dict = {}
    gamecounter = 0
    db = firestore.Client(project='peppy-sensor-375905')

    query = db.collection(u'MLBf').order_by(u'commence_time', direction=firestore.Query.ASCENDING).limit(1).stream()

    for doc in query:
        gamecounter = gamecounter + 1
        father_dict['game'+ (str(gamecounter))] = doc.to_dict()
    
    json_return = json.dumps(father_dict)
    return(json_return)
    
    
    #testing below
    #with open("test.txt", "w") as outfile:
    #   outfile.write(json_return)
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

@app.route('/getNCAABdata')
def getNCAABData():
    
    father_dict = {}
    gamecounter = 0
    db = firestore.Client(project='peppy-sensor-375905')

    query = db.collection(u'NCAAB').order_by(u'commence_time', direction=firestore.Query.ASCENDING).limit(10).stream()

    for doc in query:
        gamecounter = gamecounter + 1
        father_dict['game'+ (str(gamecounter))] = doc.to_dict()
    
    json_return = json.dumps(father_dict)
    return(json_return)

@app.route('/getMLBdata')
def getMLBData():
    
    father_dict = {}
    gamecounter = 0
    db = firestore.Client(project='peppy-sensor-375905')

    query = db.collection(u'MLB').order_by(u'commence_time', direction=firestore.Query.DESCENDING).limit(30).stream()

    for doc in query:
        gamecounter = gamecounter + 1
        father_dict['game'+ (str(gamecounter))] = doc.to_dict()
    
    json_return = json.dumps(father_dict)
    return(json_return)
    
    
    #testing below
    #with open("test.txt", "w") as outfile:
    #   outfile.write(json_return)
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
    
