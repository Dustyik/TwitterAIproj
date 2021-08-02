import React, { useContext } from 'react'
import TweetCard from './TweetCard'
import { GlobalContext } from '../context/GlobalState'

export const TweetList = () => {
    const { tweets } = useContext(GlobalContext);

    function returnRenderUrls(){
        if(this.tweet.urls.length == 0){
            return (
                <span>URLs: null</span>
            )
        }else{
            return (
                <span>URLs: {this.tweet.urls}:</span>
            )
        }
    }

    return (
        <>
            {tweets.map((tweet, index) => (<TweetCard key={index} tweet={tweet} />))}
        </>
    )
}
