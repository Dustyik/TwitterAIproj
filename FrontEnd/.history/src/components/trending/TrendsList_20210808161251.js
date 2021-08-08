import React from 'react';
import { Trend } from '../trending/Trend';
import { SettingsIcon } from '../../images/svg/svgs';

export const TrendsList = () => {
    const trends = [
        {
            name: '#Your MSLE',
            topic: 'An average of your MSLE aggregated',
            tweets: '3,700k'
        },
        {
            name: '#The Models MSLE',
            topic: 'Description',
            tweets: '37k'
        }
    ]
    return (
        <div>
            <div className="trends-for-you flex-space-between">
                <h2 className="m-0">Agaisnt our Neural Model!</h2>
                <SettingsIcon />
            </div>
            <div className="trends">
                {trends.map(trend => (<Trend trend={trend} />))}
            </div>
        </div>
    )
}
