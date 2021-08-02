import axios from 'axios';

export const getTitles = () => {
    return axios.get("http://localhost:5000/getTweets")
}   

export const applySearchFilters = (data, title, id) => {
    return axios.post("http://localhost:5000/applySearchModels", {
            data: data,
            queryTitle: title,
            articleId: id

        }
    )
}
