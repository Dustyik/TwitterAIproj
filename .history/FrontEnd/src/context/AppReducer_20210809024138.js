const MAX = 30
const MIN = 0

export default (state, action) => {
    switch (action.type) {
        case "REMOVE_TWEET":{
            return {
                ...state,
                tweets: state.tweets.filter(tweet => tweet.id !== action.payload)
                
            }
        }

        case "SET_GUESS":
            return {
                ...state,
                guess: action.payload
            }

        case "ADD_HUMAN_PREDICITON_DIFFERENCE":
            return {
                ...state,
                humanPredictionDifference: [...state.humanPredictionDifference, action.payload]
            }

        case "MODEL_HUMAN_PREDICITON_DIFFERENCE":
            return {
                ...state,
                modelPredictionDifference: [...state.modelPredictionDifference, action.payload]
            }

        case "TOGGLE_WIN_MODAL":
            return {
                ...state,
                winModalOpen: action.payload
            }

        case "TOGGLE_LOSE_MODAL":
            return {
                ...state,
                loseModalOpen: action.payload
            }

        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        case 'ADD_TWEET':
            const newTweet = {
                user: {
                    name: action.payload.name,
                    image: action.payload.image,
                    handle: `@${action.payload.name}`,
                },
                tweet: {
                    content: action.payload.tweet,
                    image: null,
                    comments: Math.floor(Math.random()*(MAX-MIN)+MIN),
                    retweets: Math.floor(Math.random()*(MAX-MIN)+MIN),
                    likes: Math.floor(Math.random()*(MAX-MIN)+MIN),
                    relevance: action.payload.relevance
                }
            };
            return {
                ...state,
                tweets: [...state.tweets, newTweet]
            }

        case "SET_TWEETS":
            return {
            ...state,
            tweets: action.payload
        }

        case "SET_SEARCH_MODEL":
            return {
            ...state,
            searchModels: action.payload
        }

        case "REMOVE_ALL_TWEETS":
            return {
            ...state,
            tweets: []
        }

        case "SET_CURRENT_TWEET":
            return {
                ...state,
                currentTweet: action.payload
            }


        default:
            return state
    }
}