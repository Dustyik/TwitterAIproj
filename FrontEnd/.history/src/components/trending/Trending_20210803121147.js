import React from 'react';
import '../../styles/Trending.css';
import { SearchIcon } from '../../images/svg/svgs'
import { TrendsList } from './TrendsList';
import { FollowSuggestionsList } from './FollowSuggestionsList';
import { Button } from '@material-ui/core';



export const Trending = () => {
    return (
        <>
            <div>

                <div className="trends-list m-0">
                  
                <TrendsList />
                 
                </div>
                {/*
                <div className="follow-list">
                    <FollowSuggestionsList />
                </div>
                */}

    

 

            <div>
                &nbsp;
            </div>
            <div
             style = {{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
             }}
            >
           
            
            <Button 
                variant="contained" color="primary">
                Apply Filter
            </Button>
            </div>
            </div>
        </>
    )
}
