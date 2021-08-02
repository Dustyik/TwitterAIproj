import json
import os
from flask import Flask, Response, request
from flask_cors import CORS
from ML_engine import *


app = Flask(__name__)
CORS(app)
dataProcessor = DataProcessor() 

@app.route('/getTweets', methods= ['GET'])
def getTweets():
    try:
        print("Requesting for some tweets\n", request)
        data = dataProcessor.get_some_tweets()
        data = data.to_json() #converts pandas df to json
        js = json.dumps(data)
        response = Response(js, status=200, mimetype='application/json')
        return response

    except Exception as e:
        print ("EROR", e)
        errMsg = "Something went wrong! ERROR: " + str(e) 
        js = json.dumps(errMsg)
        response = Response(js, status=400, mimetype='application/json')
        return response


@app.route('/applySearchModels', methods= ['GET', "POST"]) #needs to return relevant tweets and corresponding precision scores
def applySearchModels():
    try:
        jsonData = request.get_json()
        print (jsonData)
        searchModel = jsonData["data"]
        articleTitle = jsonData["queryTitle"]
        articleId = jsonData["articleId"]
        data = returnTweetsBasedOnSearchModel(dataProcessor = dataProcessor, articleId = articleId, articleTitle = articleTitle, searchModel = searchModel)
        data = data.to_json()
        js = json.dumps(data)
        response = Response(js, status=200, mimetype='application/json')
        return response

    except Exception as e:
        print ("EROR", e)
        errMsg = "Something went wrong! ERROR: " + str(e) 
        js = json.dumps(errMsg)
        response = Response(js, status=400, mimetype='application/json')
        return response


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)