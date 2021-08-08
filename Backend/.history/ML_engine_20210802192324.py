import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics.pairwise import euclidean_distances
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
from IPython.display import display

'''
Functions to write:
1. tf-idf with cosine sim/Euclidean distance
- represent terms in each document with its tf-idf weights, 
2. VSM with cosine sim/Euclidean distance
3. BIM
4. BM25
5. BERT

'''

titles_file_path = r"D:\Desktop\IR_term_8\IR-tweets---disaster-\article_titles_stemmed.csv"
tweets_file_path = r"D:\Desktop\IR_term_8\IR-tweets---disaster-\tweets_data_stemmed.csv"

SEARCH_MODELS = {
	"tfcs": "Tf-idf w Cosine Sim", 
	"tfed": "Tf-idf w Euclidean Dist"
	}

def returnTweetsBasedOnSearchModel(dataProcessor, articleId, articleTitle, searchModel):
	#accepts a search model, article title, and article id, returns n most relevant results	
	if searchModel == SEARCH_MODELS["tfcs"]:
		return dataProcessor.cosineSimilarity.query(articleId, articleTitle)
	if searchModel == SEARCH_MODELS["tfed"]:
    		return dataProcessor.euclideanDistance.query(articleId, articleTitle)

class DataProcessor:
	def __init__(self):
		self.titles_data = pd.read_csv(titles_file_path) 
		self.tweets_data = pd.read_csv(tweets_file_path) 
		self.titles_data = self.titles_data.dropna()
		self.tweets_data = self.tweets_data.dropna()

		self.cosineSimilarity = CosineSimilarity(self.titles_data, self.tweets_data)
		self.euclideanDistance = EuclideanDistance(self.titles_data, self.tweets_data)
		print ("Data Processor up and ready...")

class CosineSimilarity:
	def __init__(self, titles, tweets, type='tfidf'):
		self.titles = titles  #contains titles data
		self.tweets = tweets #contains tweets data
		self.vectorizer = self.change_matrix_type(type)

	def get_result(self, return_size):
		cos_sim = cosine_similarity(self.matrix, self.matrix)
		top_ind = np.flip(np.argsort(cos_sim[0]))[1:return_size+1]
		top_id = [list(self.matrix.index)[i] for i in top_ind]
		self.result = []
		for i in top_id:
			filt = self.tweets[self.tweets.tweet==i]
			for ind, r in filt.iterrows():
				rel = r['relevance_score']
				text = r['tweet']
				id = r["tweet_id"]
				related = r['article_id']
				#score = 0
			   # if related==self.query_id and rel>0:
			   #     score = 1
			   # if related==self.query_id and rel==0:
			   #     score = -1
				self.result.append({'tweet_id':id, 'text': text, 'related_article':related, "relevance": rel})
				#'score': score})

	def query(self, query_id, query_text, return_size=30):
		self.query_id = query_id
		term_doc = self.vectorizer.fit_transform([query_text]+list(self.tweets.clean_text)) #returns document term matrix
		ind = ["query"] + list(self.tweets.tweet)
		self.matrix = pd.DataFrame(term_doc.toarray(), columns=self.vectorizer.get_feature_names(), index=ind) #indexes are the tweets, columns is the entire vocab
		self.get_result(return_size)
		return pd.DataFrame(self.result)

	def change_matrix_type(self, type):
		if type == 'tfidf':
			return TfidfVectorizer() 
		elif type == 'dt':
			return CountVectorizer() #transforms the entire word matrix into a set of vectors
		else:
			print('Type is invalid')

	def get_matrix(self):
		return self.matrix

class EuclideanDistance:
	def __init__(self, titles, tweets, type='tfidf'):
		self.titles = titles  #contains titles data
		self.tweets = tweets #contains tweets data
		self.vectorizer = self.change_matrix_type(type)

	def get_result(self, return_size):
		euclidean = euclidean_distances(self.matrix.values[1:], [self.matrix.values[0]])
		top_ind = np.argsort(euclidean.T[0])[:return_size]
		top_id = [list(self.matrix.index)[i] for i in top_ind]
		self.result = []
		for i in top_id:
			filt = self.tweets[self.tweets.tweet==i]
			for ind, r in filt.iterrows():
				rel = r['relevance_score']
				text = r['tweet']
				id = r["tweet_id"]
				related = r['article_id']
				#score = 0
				#if related==self.query_id and rel>0:
				#	score = 1
				#if related==self.query_id and rel==0:
					#score = -1
				self.result.append({'tweet_id':id, 'text': text, 'related_article':related, "relevance": rel})

	def query(self, query_id, query_text, return_size=10):
		self.query_id = query_id
		term_doc = self.vectorizer.fit_transform([query_text]+list(self.tweets.clean_text))
		ind = ['query'] + list(self.tweets.tweet)
		self.matrix = pd.DataFrame(term_doc.toarray(), columns=self.vectorizer.get_feature_names(), index=ind)
		self.get_result(return_size)
		return pd.DataFrame(self.result)

	def change_matrix_type(self, type):
		if type == 'tfidf':
			return TfidfVectorizer() 
		elif type == 'dt':
			return CountVectorizer()
		else:
			print('Type is invalid')

	def get_matrix(self):
		return self.matrix

	

'''
sample_query_id = "f7ca322d-c3e8-40d2-841f-9d7250ac72ca"
sample_query_text = "Worcester breakfast club for veterans gives hunger its marching orders"

cosine_similarity_obj = CosineSimilarity(titles = titles, tweets = tweets)
result = cosine_similarity_obj.query(sample_query_id, sample_query_text)
print (display(result.head()))

Test Titles:
f7ca322d-c3e8-40d2-841f-9d7250ac72ca Worcester breakfast club for veterans gives hunger its marching orders
609772bc-0672-4db5-8516-4c025cfd54ca Jumpshot Gives Marketers Renewed Visibility Into Paid and Organic Keywords With Launch of Jumpshot Elite
1aa9d1b0-e6ba-4a48-ad0c-66552d896aac The Return Of The Nike Air Max Sensation Has 80â€™s Babies Hyped!
719699f9-47be-4bc7-969b-b53a881c95ae This New Dating App Will Ruin Your Internet Game
'''
