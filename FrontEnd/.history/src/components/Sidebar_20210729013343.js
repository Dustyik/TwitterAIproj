import React, {useState, useContext} from 'react';
import { Logo, HomeIcon, ExploreIcon, NotificationIcon, MessageIcon, BookmarkIcon, ListsIcon, MoreIcon } from '../images/svg/svgs';
import { SmallAvatar } from '../images/avatars';
import { Checkbox } from '@material-ui/core';
import { Button } from '@material-ui/core';
import * as API from "../apifunctions"
import { GlobalContext } from '../context/GlobalState'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';


const SEARCH_MODELS = ["Tf-idf w Cosine Sim", "Tf-idf w Euclidean Dist"]

export const Sidebar = () => {
    const profImageurl = 'https://pbs.twimg.com/profile_images/1247964769669136385/KVCROk2D_bigger.jpg';
    const [searchModelsLocalState, setSearchModelsLocalState] = useState([])

    const {setSearchModels, searchModels, title, removeAllTweets, addTweet} = useContext(GlobalContext);

    const checkBoxToggled = (event) => {
        const id = event.id
        const checkValue = event.checked

        if (checkValue){
            setSearchModels(id)
            setSearchModelsLocalState(id)
        }
    }

    const applyFilter = () => {
        API.applySearchFilters(searchModels, title.title, title.id).then(
            res => {
                const data = JSON.parse(res.data);
                removeAllTweets()
                console.log(data)


                const relevanceData = data.relevance
                const tweetData = data.text
                const tweetIdData = data.id
                const relatedArticlesData = data.related_article
                for (let i = 0; i < Object.keys(relevanceData).length; i++){
                    let pxSize = 140 + i*3
                    const newTweet = {
                        name: uniqueNamesGenerator({dictionaries: [adjectives, colors, animals]}),
                        tweet: tweetData[i],
                        relevance: relevanceData[i],
                        image: `https://placeimg.com/${pxSize}/${pxSize}/any`
                    }
                    addTweet(newTweet)
                }
            }
        )
    }

    const createCheckBoxes = () => 
        SEARCH_MODELS.map((e) => {

            return (
                <div>
                <Checkbox
                size = "medium"
                id = {e}
                onChange = {(e) => checkBoxToggled(e.target)}
                checked = {searchModelsLocalState == e}
                >
                </Checkbox>
                {e}
                
                </div>
            )
        }
    )
            

    const checkBoxes = createCheckBoxes()

    return (
        <div>
            <div className="side-nav-header">
                
                <h1>
                <Logo />
                    NewsTweet
                </h1>
            </div>
            <h4>
                Different Search Models, 
                Choose 1
            </h4>

 

            {checkBoxes}

            <div>
                &nbsp;
            </div>
            <div>
                &nbsp;
            </div>
            
            <Button 
                onClick = {applyFilter}
                variant="contained" color="primary">
                Apply Filter
            </Button>

        

        </div>
    )
}
