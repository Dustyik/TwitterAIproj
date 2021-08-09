import pandas as pd
import numpy as np
from IPython.display import display, HTML


tweets_file_path = "./GUIDataset_Final.csv"
RANDOM_SAMPLE_AMOUNT = 50 #how many tweets to fetch to the front end

class DataProcessor:
	def __init__(self):
		self.tweets_data = pd.read_csv(tweets_file_path) 
		# self.tweets_data = self.tweets_data.reset_index(drop = True)
		self.tweets_data = self.tweets_data.dropna()
		self.tweets_data = self.tweets_data.reset_index()
		self.random_sample_amount = RANDOM_SAMPLE_AMOUNT
		display(self.tweets_data)

		print ("Data Processor up and ready...")
	
	def get_some_tweets(self): #function to send tweets to the front end
		fraction_dataset = self.tweets_data.sample(n = self.random_sample_amount)
		return fraction_dataset

#dataProcessor = DataProcessor()
#display (dataProcessor.get_some_tweets())

#for column in dataProcessor.tweets_data:
#    print (column)