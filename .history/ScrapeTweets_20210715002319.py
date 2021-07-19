import tweepy as tw
import pandas as pd


consumer_key= 'T7AJo2vnQBDYU3R6b9Yb39iRt'
consumer_secret= 'bXSknwtbDWs3kKZNK66pKByP5ElgMu7XjfcmGiGQRZMVjfnUAT'
access_token= '1411277462630146057-4DhuOrXNy3WzyDJ69Hicj8Jo7XFeSm'
access_token_secret= 'n5IikvQICwEEcXh0MK0r8wvVN0zQfLqqI4x2N07Dt8MSu'
bearer_token= 'AAAAAAAAAAAAAAAAAAAAAOskRQEAAAAAm43eXZjGoLsxd%2FXFLRaWz2sibEc%3DOYfxZ4ZyLm09YS2oBl5OJUJWwzmBzS6S19Kl0GzAAkVRjcGbTn'

auth = tw.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tw.API(auth, wait_on_rate_limit=True)

def get_tweet(row):
    print ("index", row.index)
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

df = pd.read_csv(r'D:\Desktop\AI_term_8\twitter\TweetsCOV19_3.tsv', sep='\t',header=None, error_bad_lines=False)
df = df.iloc[:35000]
df.head()
df['text']=df.apply(lambda x:get_tweet(x), axis=1)
df.to_csv("dataset_scrapped_140721.csv", header=False)

df = df[df.text!='']
df.to_csv("dataset_scrapped_150721.csv", header=False)
