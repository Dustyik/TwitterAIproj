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
1. VSM with cosine sim/Euclidean distance
2. tf-idf with cosine sim/Euclidean distance
3. BIM
4. BM25
5. BERT

'''

titles_file_path = r"D:\Desktop\IR_term_8\IR-tweets---disaster-\article_titles_stemmed.csv"
tweets_file_path = r"D:\Desktop\IR_term_8\IR-tweets---disaster-\dataset_scrapped.csv"

class DataProcessor:
	def __init__(self):
		self.titles_data = pd.read_csv(titles_file_path) 
		self.tweets_data = pd.read_csv(tweets_file_path) 
		display(self.tweets_data.head())
		#self.data.title = self.data.title.astype(str)
		#self.porter = PorterStemmer()
		#self.get_clean_data()
		print ("Data Processor up and ready...")

	'''
	Tokenizing of article titles should be done beforehand
	def tokenize_stem_lower(self, text):	
	    tokens = word_tokenize(text)
	    tokens = list(filter(lambda x: x.isalpha(), tokens))
	    tokens = [self.porter.stem(x.lower()) for x in tokens]
	    return ' '.join(tokens)

	def get_clean_data(self):
	    self.data['clean_text'] = self.data.apply(lambda x: self.tokenize_stem_lower(x.title), axis=1)
	    return self.data 
	'''

class CosineSimilarity:

	def __init__(self, data, type='tfidf'):
		self.data = data 
		self.change_matrix_type(type)

	def get_result(self, return_size):
		cos_sim = cosine_similarity(self.matrix, self.matrix)
		top_ind = np.flip(np.argsort(cos_sim[0]))[1:return_size+1]
		top_id = [list(self.matrix.index)[i] for i in top_ind]
		# print(top_10_ind ,top_10_id)
		self.result = []
		for i in top_id:
		    filt = self.data[self.data.document==i]
		    for ind, r in filt.iterrows():
		        rel = r['rel']
		        text = r['text']
		        related = r['topic']
		        score = 0
		        if related==self.query_id and rel>0:
		            score = 1
		        if related==self.query_id and rel==0:
		            score = -1
		        self.result.append({'tweet_id':i, 'text': text, 'related_article':related,'score': score})

	def query(self, query_id, query_text, return_size=10):
		self.query_id = query_id
		term_doc = self.vec.fit_transform([query_text]+list(self.data.clean_text))
		ind = ['query'] + list(self.data.document)
		self.matrix = pd.DataFrame(term_doc.toarray(), columns=self.vec.get_feature_names(), index=ind)
		self.get_result(return_size)
		return pd.DataFrame(self.result)

	def change_matrix_type(self, type):
		if type == 'tfidf':
			self.vec = TfidfVectorizer() 
		elif type == 'dt':
			self.vec = CountVectorizer()
		else:
			print('Type is invalid')

	def get_matrix(self):
		return self.matrix

class EuclideanDistance:

	def __init__(self, data, type='tfidf'):
		self.data = data 
		self.change_matrix_type(type)
		self.matrix = None

	def get_result(self, return_size):
		euclidean = euclidean_distances(self.matrix.values[1:], [self.matrix.values[0]])
		top_ind = np.argsort(euclidean.T[0])[:return_size]
		top_id = [list(self.matrix.index)[i] for i in top_ind]
		# print(sorted(euclidean[:20]),top_10_ind ,top_10_id)
		self.result = []
		for i in top_id:
		    filt = self.data[self.data.document==i]
		    for ind, r in filt.iterrows():
		        rel = r['rel']
		        text = r['text']
		        related = r['topic']
		        score = 0
		        if related==self.query_id and rel>0:
		            score = 1
		        if related==self.query_id and rel==0:
		            score = -1
		        self.result.append({'tweet_id':i, 'text': text, 'related_article':related,'score': score})

	def query(self, query_id, query_text, return_size=10):
		self.query_id = query_id
		term_doc = self.vec.fit_transform([query_text]+list(self.data.clean_text))
		ind = ['query'] + list(self.data.document)
		self.matrix = pd.DataFrame(term_doc.toarray(), columns=self.vec.get_feature_names(), index=ind)
		self.get_result(return_size)
		return pd.DataFrame(self.result)

	def change_matrix_type(self, type):
		if type == 'tfidf':
			self.vec = TfidfVectorizer() 
		elif type == 'dt':
			self.vec = CountVectorizer()
		else:
			print('Type is invalid')

	def get_matrix(self):
		return self.matrix

