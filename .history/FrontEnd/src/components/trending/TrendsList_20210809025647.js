import React, {useContext} from 'react';
import { Trend } from '../trending/Trend';
import { SettingsIcon } from '../../images/svg/svgs';
import { GlobalContext } from '../../context/GlobalState'

export const TrendsList = () => {
    const { humanPredictionDifference, modelPredictionDifference} = useContext(GlobalContext);

    function mse(a) {
        let error = 0
        for (let i = 0; i < a.length; i++) {
            error += Math.pow((a[i]), 2)
        }
        return error / a.length
    }

    let HPD, MPD

    if (humanPredictionDifference.length > 0){
        HPD = mse(humanPredictionDifference)
        MPD = mse(modelPredictionDifference)
    }else{
        HPD = 0
        MPD = 0
    }

    const trends = [
        {
            name: '#Your MSLE',
            topic: 'An average of your mean squared error aggregated',
            tweets: HPD
        },
        {
            name: '#The Models MSE',
            topic: 'An average of the models mean squared error aggregated',
            tweets: MPD
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
