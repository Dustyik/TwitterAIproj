import React from 'react';
import '../../styles/Trending.css';
import { SearchIcon } from '../../images/svg/svgs'
import { TrendsList } from './TrendsList';
import { FollowSuggestionsList } from './FollowSuggestionsList';


export const Trending = () => {
    return (
        <>
            <div>

                <div className="trends-list m-0">
                    {/*
                    <TrendsList />
                    */}
                </div>
                {/*
                <div className="follow-list">
                    <FollowSuggestionsList />
                </div>
                */}

            <span>
                Tune the hyperparameters!
            </span>

 

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
        </>
    )
}
