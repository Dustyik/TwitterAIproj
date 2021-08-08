import React, { useState, useEffect, useContext } from 'react';
import '../styles/Main.css';
import { TweetList } from '../components/TweetList';
import { SearchIcon } from '../images/svg/svgs'
import * as API from "../apifunctions"
import { GlobalContext } from '../context/GlobalState'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { Modal } from '@material-ui/core';
import winGif from "../images/you_win.gif"
import loseGif from "../images/try-again.gif"


const RANDOM_HYPERPARAM = [10, 15, 20]

export const Home = () => {
    const { setTweets, removeAllTweets, winModalOpen, toggleWinModal, loseModalOpen, toggleLoseModal, currentTweet } = useContext(GlobalContext);
    
    const handleWinCancel = () => {
        toggleWinModal()
    };

    const handleLoseCancel = () => {
        toggleLoseModal()
    };

    function shuffle(array) {
        var currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
          // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function checkForDuplicates(array) {
        let valuesAlreadySeen = [] 
        for (let i = 0; i < array.length; i++) {
            let value = array[i]
            if (valuesAlreadySeen.indexOf(value) !== -1) {
            return true
            }
            valuesAlreadySeen.push(value)
        }
        return false
    }

    const generateFourNumbers = (retweetNumber) => {
        const firstNumber = retweetNumber

        const secondPlusOrMinusRandom = Math.random() < 0.5 ? -1 : 1;
        const secondNumber = Math.abs(retweetNumber + Math.floor(Math.random() * RANDOM_HYPERPARAM[0]) * secondPlusOrMinusRandom)

        const thirdPlusOrMinusRandom = Math.random() < 0.5 ? -1 : 1;
        const thirdNumber = Math.abs(retweetNumber + Math.floor(Math.random() * RANDOM_HYPERPARAM[1])  * thirdPlusOrMinusRandom)

        const fourthPlusOrMinusRandom = Math.random() < 0.5 ? -1 : 1;
        const fourthNumber = Math.abs(retweetNumber + Math.floor(Math.random() * RANDOM_HYPERPARAM[2]) * fourthPlusOrMinusRandom)

        let numbersArray = [firstNumber, secondNumber, thirdNumber, fourthNumber]

        if (checkForDuplicates(numbersArray)){
            return generateFourNumbers(retweetNumber)
        }else{
            return shuffle(numbersArray)
        }

    }

    //missing col, entities, 


    useEffect(() => {
        API.getTweets().then(
            res => {
                const data = JSON.parse(res.data);

                console.log(data)
                // const entities = data.entities
                // const hashtags = data.Hashtags
                // const mentions = data.mentions
                // const timestamp = data.timestamp
                // const userid = data.userid
                
                const modelRetweetPredictions = data["Final predicted Retweets"]
                const favourites = data.Favourites
                const followers = data.Followers
                const friends = data.Friends
                const retweets = data["Actual Retweets"]
                const timestamp = data.timestamp
                const tweet = data.Tweets
                const tweetid = data.tweetid
                // const urls = data.urls

                const negativeSentiment = data.Negative_Sentiment
                const positiveSentiment = data.Positive_Sentiment


                const keys = Object.keys(tweet)

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
                    individualRow.followers = followers[key]
                    individualRow.friends = friends[key]
                    // individualRow.entities = entities[key]
                    // individualRow.hashtags = hashtags[key]
                    // individualRow.mentions = mentions[key]
                    individualRow.retweets = retweets[key]
                    // individualRow.timestamp = timestamp[key]
                    // individualRow.tweetid = tweetid[key]
                    // individualRow.urls = urls[key]
                    // individualRow.userid = userid[key]

                    individualRow.negativeSentiment = negativeSentiment[key] 
                    individualRow.negativeSentiment = negativeSentiment[key]
                    individualRow.retweetGuessArray = generateFourNumbers(retweets[key])

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
            {console.log(currentTweet)}
            <Modal
            open={winModalOpen}
            onClose={handleWinCancel}
            style = {{display:"flex", alignItems:"center", justifyContent:"center"}}
            ><div> 
                <span>
                    Your Guess: 
                </span>
                <span>
                    Our Models Guess: 
                </span>
                <img src={winGif} alt="loading..." /> 
            </div>

            </Modal>

            <Modal
            open={loseModalOpen}
            onClose={handleLoseCancel}
            style = {{display:"flex", alignItems:"center", justifyContent:"center"}}
            ><div>
                <div style = {{padding:10, display:"flex", flexDirection:"column", alignItems:"center"}}>
                <h3>
                    Your Guess: 
                </h3>
                <h3>
                    Our Models Guess: 
                </h3> 
                <h3>
                    The Correct Answer: 
                </h3> 
                </div>
                <div >
                <img src={loseGif} alt="loading..." /> 
                </div>
            </div>

            </Modal>


        </div>
    )
}
