import React, { useState, useEffect, useContext } from 'react';
import '../styles/Main.css';
import { TweetList } from '../components/TweetList';
import { SearchIcon } from '../images/svg/svgs'
import * as API from "../apifunctions"
import Button from 'react-bootstrap/Button'
import { GlobalContext } from '../context/GlobalState'


export const Home = () => {
    const [titlesState, setTweetsState] = useState([])
    const { title, setTweets } = useContext(GlobalContext);


    useEffect(() => {
        API.getTitles().then(
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
                const url = data.url
                const userid = data.userid

                const keys = Object.keys(entities)
                const titlesData = data.title
                const idData = data.id
                var dataPoints = []
                keys.forEach((key, index) => {
                    let individualRow = {}
                    individualRow.entities = entities[key]
                    individualRow.favourites = favourites[key]
                    individualRow.followers = followers[key]
                    individualRow.friends = friends[key]
                    individualRow.hashtags = hashtags[key]
                    individualRow.mentions = mentions[key]
                    individualRow.retweets = retweets[key]
                    individualRow.timestamp = timestamp[key]
                    individualRow.tweet = tweet[key]
                    individualRow.tweetid = tweetid[key]
                    individualRow.url = url[key]
                    individualRow.userid = userid[key]
                })
                setTweetsState(dataPoints)
                
            }
        ).catch(
            err => console.log("Error fetching titles", err)
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
               {title.title}
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
