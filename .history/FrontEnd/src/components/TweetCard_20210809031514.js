import React, { Component, useContext, useState } from 'react';
import '../styles/TweetCard.css';
import { SmallAvatar } from '../images/avatars'
import { TweetCommentIcon, TweetRetweetIcon, TweetLikeIcon, TweetSendIcon } from '../images/svg/svgs';
import { Link } from 'react-router-dom';
import {Button, Checkbox} from "@material-ui/core";
import { GlobalContext } from '../context/GlobalState'


const TweetCard = (props) => {
    const tweet = props.tweet;
    const profImageurl = 'https://pbs.twimg.com/profile_images/1247964769669136385/KVCROk2D_bigger.jpg';
    const [checkBox, setCheckBox] = useState("nill")

    const checkBoxToggled = (event) => {
        const id = event.id
        const checkValue = event.checked
        if (checkValue){
            setCheckBox(id)
        }
    }

    let retweetGuessArray = [0, 1, 2, 3]


    const { toggleWinModal, toggleLoseModal,setCurrentTweet,setGuess} = useContext(GlobalContext);

    const tweetCardButtonClicked = () => {
        setGuess(checkBox)
        setCurrentTweet(tweet)
        if (tweet.retweets == checkBox){
            toggleWinModal()
        }else{
            toggleLoseModal()
        }
    }

    const createCheckBoxes = () => {
        let checkBoxesArray = []
        const retweetNumber = tweet.tweet.retweets
        retweetGuessArray = tweet.retweetGuessArray

        if (retweetGuessArray){
        return retweetGuessArray.map(e => 
                (
                    <div className="tweet-checkbox"
                    key = {e.toString()}
                    >
                        <Checkbox
                            key = {e.toString()}
                            style={{color:'white'}}
                            id = {e.toString()}
                            // checked = {false}
                            checked = {checkBox == e}
                            color="primary"
                            onChange={(event) => checkBoxToggled(event.target)}
                        />
                        <span>
                            {e}
                        </span>
                    </div>
                )
            )
            
        
            // checkBoxesArray.push(e)
        }
    }
    let dateString, timeString
    let tweetTimeStamp = tweet.timestamp
    if (tweetTimeStamp){
        console.log(tweetTimeStamp)
        dateString = tweet.timestamp
        timeString = tweet.time + ",00"
    }
    // const dateString = tweet.timestamp.slie(0,9)

    const returnEntities = (entities) => {
        if(entities){
            let entitiesArray = []
            let entitiesList = entities.split(";")
            for(let e = 0; e < entitiesList.length; e++){
                let stringArray = entitiesList[e].split(":")
                // console.log(stringArray)
                for(let i = 0; i < stringArray.length; i += 3){
                    entitiesArray.push(stringArray[i])
                    
                    entitiesArray.push("; ")
                }
            }
            return entitiesArray
        }
            return null
    }


    return (
        <div className="tweet-card">
            <div className="left">
                <SmallAvatar width="48" image={tweet.user.image} />
            </div>
            <div className="right">
                <div className="tweet-card-head">
                    <span className="tweet-card-name" >{tweet.user.name}</span>
                </div>
                <span className="tweet-card-handle">{tweet.user.handle}</span>

                <div className="tweet-card-body">
                <div className="tweet-card-content">
                    <p className="m-0">{tweet.tweet.content}</p>
                </div>

                <span className="tweet-card-time"> 
                    {timeString} {dateString}
                    <span className="tweet-card-shotoniphone">
                        Twitter for iPhone
                    </span>
                </span>

                <div className="tweet-middle-border"/>
                <span className="tweet-retweets-likes-number" 
                style = {{
                    fontSize:15,
                    marginLeft:0}}>
                    ?
                </span>
                <span className="tweet-retweets-likes">
                    Retweets 
                </span>
                <span className="tweet-retweets-likes-number">
                    {tweet.tweet.likes}
                </span>

            
                <span className="tweet-retweets-likes">
                        Likes
                </span>
        
                <div className="tweet-middle-border"/>
                    


                
        
                <div className="tweet-card-footer">
                    <span className="flex-align-center"><TweetCommentIcon /> <span className="tweet-cars-icon"></span></span>
                    <span className="flex-align-center"><TweetRetweetIcon /><span className="tweet-cars-icon"></span></span>
                    <span className="flex-align-center"><TweetLikeIcon /><span className="tweet-cars-icon"></span></span>
                    { /*<span className="flex-align-center"><TweetSendIcon /></span> */}
                    </div>
                </div>
                <div>
                    <div className="tweet-meta-information">
                        <h2>Meta Information:</h2>
                    </div>
                    <div className="tweet-meta-information">
                        <span
                        className="tweet-meta-information-inner"
                        >Followers: {tweet.followers}</span>
                    
                        <span className="tweet-meta-information-inner" style = {{marginLeft:10}}>Friends: {tweet.friends}</span>
                    </div>
                    <div className="tweet-meta-information">
                        <span className="tweet-meta-information-inner" >Hashtags: {tweet.hashtags}</span>
                    </div>
                    <div className="tweet-meta-information">
                        <span className="tweet-meta-information-inner" >Entities: {returnEntities(tweet.entities)}</span>
                    </div>
                    <div className="tweet-meta-information">
                        <span className="tweet-meta-information-inner" >Overall Sentiment: {tweet.positiveSentiment + tweet.negativeSentiment}</span>
                    </div>
                    <div className="tweet-meta-information">
                        <span className="tweet-meta-information-inner" >Mentions: {tweet.mentions}</span>
                    </div>
                    <div className="tweet-meta-information">
                        <span className="tweet-meta-information-inner" >URLs: {tweet.urls}</span>
                    </div>
                    
                </div>
                <div className="tweet-middle-border"/>
                <div style = {{display:"flex", justifyContent:"center"}}>
                    <h3>
                    Guess the number of retweets this tweet will have!
                    </h3>
            
                </div>
                <div style = {{display:"flex", flexDirection:"row", marginTop:10, justifyContent:"space-between", }}>
                    {createCheckBoxes()}
                </div>

                <div style = {{display:"flex", justifyContent:"center", marginTop:10}}>
                <Button 
                    onClick = {tweetCardButtonClicked}
                    variant="contained" color="primary">
                    Make a guess!
                </Button>
                </div>
            </div>
        </div>
    )
    
}

export default TweetCard
