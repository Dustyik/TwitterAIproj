import React, { Component, useContext } from 'react';
import '../styles/TweetCard.css';
import { SmallAvatar } from '../images/avatars'
import { TweetCommentIcon, TweetRetweetIcon, TweetLikeIcon, TweetSendIcon } from '../images/svg/svgs';
import { Link } from 'react-router-dom';
import {Button, Checkbox} from "@material-ui/core";
import { GlobalContext } from '../context/GlobalState'


const TweetCard = (props) => {
    const tweet = props.tweet;
    const profImageurl = 'https://pbs.twimg.com/profile_images/1247964769669136385/KVCROk2D_bigger.jpg';

    const handleRouting = (e) => {
        // e.preventDefault();
        // debugger
        // this.props.history.push('data')
    }

    const { toggleModal} = useContext(GlobalContext);

    const tweetCardButtonClicked = () => {
        toggleModal()
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

                <div style = {{display:"flex", flexDirection:"row", marginTop:10}}>
                <div>
                    <Checkbox
                        checked={true}
                        onChange={() => {}}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
                </div>



                <div style = {{display:"flex", justifyContent:"center", marginTop:20}}>
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
