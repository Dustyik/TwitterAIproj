import tweepy as tw
import pandas as pd


consumer_key= "-"
consumer_secret= "-"
access_token= "-"
access_token_secret= "-"
bearer_token= "-"

auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

def get_tweet(row):
    print ("index", row.name)
    output = ''
    try:
        output = api.get_status(id=row.TweetId).text
        print (output)
    except tw.TweepError as e:
        print (row.TweetId)
        print (e)
        pass
    return output
    # "C:\Users\Chia Yik\OneDrive\Desktop\TweetsCOV19pull.xlsx"

df = pd.read_csv(r'D:\Desktop\AI_term_8\twitter\TweetsCOV19_3.tsv', sep='\t',header=None, error_bad_lines=False, names = ['TweetId', 'Username','Timestamp','Followers','Friends','Retweets','Favourites','Entities','Sentiment','Mentions','Hashtags','URLS'])
df = df.iloc[:35000]
df.head()
df['text']=df.apply(lambda x:get_tweet(x), axis=1)
df = df[df.text!='']
df.to_csv("dataset_scrapped_150721.csv", header=False)
