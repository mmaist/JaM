import requests
import argparse
import json
from google.cloud import firestore
import os
import functions_framework

# Use a service account.
def getData():
    r=requests()