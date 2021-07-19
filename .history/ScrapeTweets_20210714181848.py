import tweepy as tw

# consumer_key= 'LKvavXktNliE3LL52KNK48oWd'
# consumer_secret= 'PsSoEz5JRYdrozOe8uBkgphm3YlTipYREexIyJQi4VDVZv9htI'
# access_token= '1411277462630146057-ATYdgNSGb3EGBFim8w1sQ8kRGOR7QH'
# access_token_secret= 'S3N1R58XNvrucIOgsKIxZY4CSfngnrd6XHIlWCu0k4PaP'
# bearer_token= 'AAAAAAAAAAAAAAAAAAAAAOskRQEAAAAA5JKli8luYWK%2BzRTWfn1kLwjv58s%3DWNBJ8KrY0xEwZBqxqLzCjde2fGWM3wBMeq4uyvWoLX5BNfIHHp'

# auth = tw.OAuthHandler(consumer_key, consumer_secret)
# auth.set_access_token(access_token, access_token_secret)
# api = tw.API(auth, wait_on_rate_limit=True)

# def get_tweet(id):
#     output = ''
#     try:
#         output = api.get_status(id=id.document).text
#     except:
#         pass
#     return output

# df['text']=df.apply(lambda x:get_tweet(x), axis=1)

# df.head()
# df = df[df.text!='']
# df.to_csv("dataset_scrapped.csv", header=False)