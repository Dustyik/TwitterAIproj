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
        console.log(event)
        const checkValue = event.checked
        if (checkValue){
            setCheckBox(id)
        }
    }


    const handleRouting = (e) => {
        // e.preventDefault();
        // debugger
        // this.props.history.push('data')
    }

    const { toggleModal} = useContext(GlobalContext);

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

    const tweetCardButtonClicked = () => {
        toggleModal()
    }

    const generateFourNumbers = (retweetNumber) => {
        const firstNumber = Math.abs(retweetNumber + Math.floor(Math.random() * 10))
        const secondNumber = retweetNumber
        const thirdNumber = Math.abs(retweetNumber - Math.floor(Math.random() * 10))
        const fourthNumber = Math.abs(retweetNumber - Math.floor(Math.random() * 5))

        let numbersArray = [firstNumber, secondNumber, thirdNumber, fourthNumber]

        if (checkForDuplicates(numbersArray)){
            return generateFourNumbers(retweetNumber)
        }else{
            return shuffle(numbersArray)
        }

    }

    const createCheckBoxes = () => {
        let checkBoxesArray = []
        const retweetNumber = tweet.tweet.retweets
        let numbersArray = generateFourNumbers(retweetNumber)
    
        for(let i = 0; i < 4; i ++){
            const e = (
                <div className="tweet-checkbox">
                    <Checkbox
                        id = {i}
                        // checked = {false}
                        checked = {checkBox == i}
                        color="primary"
                        onChange={(event) => checkBoxToggled(event.target)}
                    />
                    <span>
                        {numbersArray[i]}
                    </span>
                </div>
            )
            checkBoxesArray.push(e)
        }
        
        return checkBoxesArray
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
                    03.38 - 09/10/2019{tweet.tweet.time}
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
                        <span>Meta Information:</span>
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
