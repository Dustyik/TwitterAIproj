import React, { useState, useEffect, useContext } from 'react';
import '../styles/Main.css';
import { TweetList } from '../components/TweetList';
import { SearchIcon } from '../images/svg/svgs'
import * as API from "../apifunctions"
import { GlobalContext } from '../context/GlobalState'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { Modal, Button } from 'antd';



export const Home = () => {
    const { setTweets, removeAllTweets, modalOpen } = useContext(GlobalContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };



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
                const urls = data.urls
                const userid = data.userid

                console.log(tweet)

                const keys = Object.keys(entities)

                var dataPoints = []

                keys.forEach((key, index) => {
                    let individualRow = {user:{}, tweet:{}}
                    individualRow.id = key
                    let randomName = uniqueNamesGenerator({dictionaries: [adjectives, colors, animals]});
                    individualRow.user.name = randomName
                    individualRow.user.handle =  `@${randomName}`
                    let pxSize = 140 + Math.floor((Math.random() * 50))
                    individualRow.user.image = `https://placeimg.com/${pxSize}/${pxSize}/any`;
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
                    individualRow.urls = urls[key]
                    individualRow.userid = userid[key]
                    dataPoints.push(individualRow)
                })
            removeAllTweets()
            setTweets(dataPoints)
            }
        ).catch(
            err => console.log("Error fetching tweets", err)
        )
    }, [])
    
    return (
        <div>
            <div style = {{textAlign:"center", marginBottom:-20, width:"100%"}}>
            <span style = {{
                fontStyle:"italic",
                }}>
                A Project by Austin Tay, James Gan, Lewin Sim, Tan Chia Yik
                </span>

                </div>
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

            <Modal title="Basic Modal" visible={modalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
        </div>
    )
}
