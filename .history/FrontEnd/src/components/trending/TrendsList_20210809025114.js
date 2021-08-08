import React, {useContext} from 'react';
import { Trend } from '../trending/Trend';
import { SettingsIcon } from '../../images/svg/svgs';
import { GlobalContext } from '../../context/GlobalState'

export const TrendsList = () => {
    const { humanPredictionDifference, modelPredictionDifference} = useContext(GlobalContext);

    console.log("TEST", humanPredictionDifference)
    console.log(modelPredictionDifference)

    const trends = [
        {
            name: '#Your MSLE',
            topic: 'An average of your MSLE aggregated',
            tweets: '0'
        },
        {
            name: '#The Models MSLE',
            topic: 'An average of the models MSLE aggregated',
            tweets: '0'
        }
    ]
    return (
        <div>
            <div className="trends-for-you flex-space-between" style = {{alignItems:"center"}}>
                <h2 className="m-0">Agaisnt our Neural Model!</h2>
                <SettingsIcon />
            </div>
            <div className="trends" >
                {trends.map(trend => (<Trend trend={trend} />))}
            </div>
        </div>
    )
}
