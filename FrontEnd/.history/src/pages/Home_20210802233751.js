import React, { useState, useEffect, useContext } from 'react';
import '../styles/Main.css';
import { TweetList } from '../components/TweetList';
import { SearchIcon } from '../images/svg/svgs'
import * as API from "../apifunctions"
import Button from 'react-bootstrap/Button'
import { GlobalContext } from '../context/GlobalState'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';


export const Home = () => {
    const { setTweets, removeAllTweets } = useContext(GlobalContext);


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

                var dataPoints = []
                keys.forEach((key, index) => {
                    let individualRow = {user:{}, tweet:{}}
                    individualRow.id = key
                    individualRow.user.name = ""
                    let pxSize = 140 + Math.random(0, 50)
                    individualRow.user.image = `https://placeimg.com/${pxSize}/${pxSize}/any`;
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
            removeAllTweets()
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
