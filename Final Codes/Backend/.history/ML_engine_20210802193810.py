import pandas as pd
import numpy as np

tweets_file_path = r"D:\Desktop\AI_term_8\twitter\TwitterAIprojectgithub\api\dataset_scrapped.csv"

SEARCH_MODELS = {
	}

def returnTweetsBasedOnSearchModel(dataProcessor, articleId, articleTitle, searchModel):
	#accepts a search model, article title, and article id, returns n most relevant results	
	if searchModel == SEARCH_MODELS["tfcs"]:
		return dataProcessor.cosineSimilarity.query(articleId, articleTitle)
	if searchModel == SEARCH_MODELS["tfed"]:
    		return dataProcessor.euclideanDistance.query(articleId, articleTitle)

class DataProcessor:
	def __init__(self):
		self.tweets_data = pd.read_csv(tweets_file_path) 
		self.tweets_data = self.tweets_data.dropna()

		print ("Data Processor up and ready...")

