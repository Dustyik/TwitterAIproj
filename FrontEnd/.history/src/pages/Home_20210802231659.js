import React, { useState, useEffect, useContext } from 'react';
import '../styles/Main.css';
import { TweetList } from '../components/TweetList';
import { SearchIcon } from '../images/svg/svgs'
import * as API from "../apifunctions"
import Button from 'react-bootstrap/Button'
import { GlobalContext } from '../context/GlobalState'


export const Home = () => {
    const { setTweets } = useContext(GlobalContext);


    useEffect(() => {
        API.getTweets().then(
            res => {
                const data = JSON.parse(res.data);
                const entities = data.entities
                const favourites = data.favourites
                const followers = data.followers
                const friends = data.friends
                const hashtags = data.hashtags
                const mentions = data.mentions
                const retweets = data.retweets
                const timestamp = data.timestamp
                const tweet = data.tweet
                const tweetid = data.tweetid
                const url = data.urls
                const userid = data.userid

                const keys = Object.keys(entities)

                {
                    id: 1,
                    user: {
                        name: 'The White House',
                        image: 'https://pbs.twimg.com/profile_images/1059888693945630720/yex0Gcbi_bigger.jpg',
                        handle: '@WhiteHouse',
                    },
                    tweet: {
                        content: 'On World Health Day, 2020, "we reaffirm our commitment to do our part to stop the spread of this virus, care for the sick, and protect the health and well-being of our fellow Americans."',
                        image: 'https://pbs.twimg.com/card_img/1246823270524973058/IbkZhS3u?format=jpg&name=small',
                        comments: '100',
                        retweets: '320',
                        likes: '1k',
                        relevance: "nill"
                    }
                }

                var dataPoints = []
                keys.forEach((key, index) => {
                    let individualRow = {}
                    individualRow.id = key
                    individualRow.user.name = ""
                    individualRow.user.image = ""
                    individualRow.user.handle = ""
                    individualRow.user.handle = ""
                    individualRow.tweet.content = tweet[key]
                    individualRow.tweet.retweets = retweets[key]
                    individualRow.tweet.likes = favourites[key]
                    individualRow.entities = entities[key]
                    
                    individualRow.followers = followers[key]
                    individualRow.friends = friends[key]
                    individualRow.hashtags = hashtags[key]
                    individualRow.mentions = mentions[key]
                    individualRow.retweets = retweets[key]
                    individualRow.timestamp = timestamp[key]
                    individualRow.tweetid = tweetid[key]
                    individualRow.url = url[key]
                    individualRow.userid = userid[key]
                    dataPoints.push(individualRow)
                })
            console.log(dataPoints)
            setTweets(dataPoints)
            }
        ).catch(
            err => console.log("Error fetching tweets", err)
        )
    }, [])
    
    return (
        <div>
              {/*
            <div style = {{display:"flex", flexDirection:"row"}}> 

        
            <div className="search-box flex-align-center">
                    <SearchIcon />
                    <input placeholder="Search Our Corpus Using Headlines" className="search-input w-100" type="text" />
            </div>
            </div>
               */}
            

            <h2 style = {{display:"flex", justifyContent:"center"}}>
            </h2>
                {/*
            <NewTweet />
                */}
            <div className="tweets">
                <TweetList />
            </div>
        </div>
    )
}
