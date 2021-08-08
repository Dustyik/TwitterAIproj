import pandas as pd
import numpy as np
from IPython.display import display


tweets_file_path = r"D:\Desktop\AI_term_8\twitter\TwitterAIprojectgithub\api\dataset_scrapped.csv"
columns = ["TweetID", "UserID", "TimeStamp", "Followers", "Friends", "Retweets", "Favourites", "Entities", "Mentions", "Hashtags", "URLS", "Tweet"]
SEARCH_MODELS = {
	}

def returnTweetsBasedOnSearchModel(dataProcessor, articleId, articleTitle, searchModel):
	#accepts a search model, article title, and article id, returns n most relevant results	
	return

class DataProcessor:
	def __init__(self):
		self.tweets_data = pd.read_csv(tweets_file_path, names = columns) 
		self.tweets_data = self.tweets_data.dropna()

		print ("Data Processor up and ready...")


dataProcessor = DataProcessor()
display(dataProcessor.tweets_data.head())