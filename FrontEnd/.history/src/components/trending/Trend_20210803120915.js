import React from 'react'

export const Trend = ({ trend }) => {
    return (
        <div className="trends-card">
            <h3 className="m-0">{trend.name}</h3>
            <p className="trends-topic m-0">{trend.topic}</p>
            <p className="trend-tweet-count m-0">{trend.tweets} Tweets</p>
        </div>
    )
}
