import React, {useEffect} from 'react'
import {API_URL, API_KEY} from '../../Config';

function MovieDetail(props) {

    let movieId = props.match.params.movieId //url에서 movieId 가져오기

    useEffect(() => {

        let endpointCres = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })


    }, [])


    return (
        <div>
            
        </div>
    )
}

export default MovieDetail
