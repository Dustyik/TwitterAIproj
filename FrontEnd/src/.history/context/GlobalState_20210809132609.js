import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer.js';

//tweets will be mapped to this dataset

function mse(a, b) {
	let error = 0
	for (let i = 0; i < a.length; i++) {
		error += Math.pow((b[i] - a[i]), 2)
	}
	return error / a.length
}

const initialState = {
    currentTweet:null,
    title:"nill",
    searchModels: "", 
    retweetGuessArray:[],
    humanPredictionDifference:[],
    modelPredictionDifference:[],
    guess:null,
    tweets: [
        {
            id: 1,
            user: {
                name: 'AI Twitter Project',
                image: 'https://pbs.twimg.com/profile_images/1059888693945630720/yex0Gcbi_bigger.jpg',
                handle: '@WhiteHouse',
            },
            tweet: {
                content: 'If you are seeing this tweet, it is because the front end is not retrieving tweets from the server. It is likely because you have not started the server. Do start the \
                flask server before you start the front end! if you are sure the server has started, do refresh the page and tweets should be retrieved!',
                image: 'https://pbs.twimg.com/card_img/1246823270524973058/IbkZhS3u?format=jpg&name=small',
                comments: '100',
                retweets: '320',
                likes: '1k',
                relevance: "nil"
            }
        },
    ],
    winModalOpen:false,
    loseModalOpen:false

}

// create context
export const GlobalContext = createContext(initialState);

// provider
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addHumanPredictionDifference(amount){
        dispatch({
            type: "ADD_HUMAN_PREDICITON_DIFFERENCE",
            payload:amount
        })
    }

    function setGuess(payload){
        dispatch({
            type: "SET_GUESS",
            payload:payload
        })
    }

    function removeTweet(tweetKey){
        dispatch({
            type:"REMOVE_TWEET",
            payload: tweetKey
        })
    }
    

    function setCurrentTweet(tweet){
        dispatch({
            type: "SET_CURRENT_TWEET",
            payload:tweet
        })
    }


    function addModelPredictionDifference(amount){
        dispatch({
            type: "ADD_MODEL_PREDICITON_DIFFERENCE",
            payload:amount
        })
    }

    function setSearchModels(model){
        dispatch({
            type: "SET_SEARCH_MODEL",
            payload:model
        })
    }

    function getTweet(id) {
        return state.tweets.find(tweet => tweet.id == id);
    }

    function setTweets(tweets_array) {
        dispatch({
            type: "SET_TWEETS",
            payload: tweets_array
        })
    }

    function addTweet(tweets) {
        dispatch({
            type: 'ADD_TWEET',
            payload: tweets
        })
    }

    function removeAllTweets(){
        dispatch({
            type:"REMOVE_ALL_TWEETS"
        })
    }


    function toggleWinModal(){
        dispatch({
            type: "TOGGLE_WIN_MODAL",
            payload: !state.winModalOpen
        })
    }

    function toggleLoseModal(){
        dispatch({
            type: "TOGGLE_LOSE_MODAL",
            payload: !state.loseModalOpen
        })
    }

    return (
    <GlobalContext.Provider 
        value={{ tweets: state.tweets, 
                retweetGuessArray: state.retweetGuessArray,
                setTweets, 
                getTweet, 
                addTweet,
                title:state.title, 
                setSearchModels,
                removeAllTweets,
                winModalOpen:state.winModalOpen,
                loseModalOpen:state.loseModalOpen,
                removeTweet,
                toggleWinModal,
                toggleLoseModal,
                addHumanPredictionDifference,
                addModelPredictionDifference,
                setGuess,
                guess:state.guess,
                humanPredictionDifference:state.humanPredictionDifference,
                modelPredictionDifference:state.modelPredictionDifference,
                searchModels:state.searchModels,
                setCurrentTweet,
                currentTweet: state.currentTweet
                }}>
        {children}
    </GlobalContext.Provider>)
}
