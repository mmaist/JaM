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

@app.route('/getData')
def getData():
    
    father_dict = {}
    gamecounter = 0
    db = firestore.Client(project='peppy-sensor-375905')

    query = db.collection(u'NBA').order_by(u'commence_time', direction=firestore.Query.ASCENDING).limit(9).stream()

    for doc in query:
        gamecounter = gamecounter + 1
        father_dict['game'+ (str(gamecounter))] = doc.to_dict()
    
    json_return = json.dumps(father_dict)
    return(json_return)
    
    
    #testing below
    #with open("test.txt", "w") as outfile:
    #   outfile.write(json_return)