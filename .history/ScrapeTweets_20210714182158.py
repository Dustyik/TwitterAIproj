import tweepy as tw

consumer_key= 'T7AJo2vnQBDYU3R6b9Yb39iRt'
consumer_secret= 'bXSknwtbDWs3kKZNK66pKByP5ElgMu7XjfcmGiGQRZMVjfnUAT'
access_token= '1411277462630146057-4DhuOrXNy3WzyDJ69Hicj8Jo7XFeSm'
access_token_secret= 'n5IikvQICwEEcXh0MK0r8wvVN0zQfLqqI4x2N07Dt8MSu'
bearer_token= 'AAAAAAAAAAAAAAAAAAAAAOskRQEAAAAAm43eXZjGoLsxd%2FXFLRaWz2sibEc%3DOYfxZ4ZyLm09YS2oBl5OJUJWwzmBzS6S19Kl0GzAAkVRjcGbTn'

auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

def get_tweet(id):
     output = ''
     try:
         output = api.get_status(id=id.document).text
     except:
         pass
     return output
     
df = pd.read_csv('dataset_scrapped.csv', names=['topic','iteration','document','rel', 'text'])


df['text']=df.apply(lambda x:get_tweet(x), axis=1)

# df.head()
# df = df[df.text!='']
# df.to_csv("dataset_scrapped.csv", header=False)

data = pd.read_csv('dataset_scrapped.csv', names=['topic','iteration','document','rel', 'text'])
