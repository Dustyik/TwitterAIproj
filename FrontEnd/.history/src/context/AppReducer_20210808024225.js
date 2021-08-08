const MAX = 30
const MIN = 0

export default (state, action) => {
    switch (action.type) {
        case "TOGGLE_MODAL":
            return {
                ...state,
                modal: action.payload
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


        default:
            return state
    }
}