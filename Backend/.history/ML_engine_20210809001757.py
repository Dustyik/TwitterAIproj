import pandas as pd
import numpy as np
from IPython.display import display


tweets_file_path = "./dataset_scrapped.csv"
columns = ["tweetid", "userid", "timestamp", "followers", "friends", "retweets", "favourites", "entities", "mentions", "hashtags", "urls", "tweet"]
RANDOM_SAMPLE_AMOUNT = 50 #how many tweets to fetch to the front end

class DataProcessor:
	def __init__(self):
		self.tweets_data = pd.read_csv(tweets_file_path, names = columns) 
		self.tweets_data = self.tweets_data.dropna()
		self.random_sample_amount = RANDOM_SAMPLE_AMOUNT

		print ("Data Processor up and ready...")
	
	def get_some_tweets(self): #function to send tweets to the front end
		fraction_dataset = self.tweets_data.sample(n = self.random_sample_amount)
		return fraction_dataset
