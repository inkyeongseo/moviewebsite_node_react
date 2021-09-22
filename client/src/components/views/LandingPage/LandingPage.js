import React,{useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from './Sections/MainImage'
import GridCards from '../commons/GridCards';
import {Row} from 'antd'


function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMoiveImage, setMainMoiveImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)


    useEffect(() => {
        
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        
        fetchMovies(endPoint)

    }, [])

    const fetchMovies =(endPoint)=>{
        //반복되는 작업 함수로 만들기
        fetch(endPoint)
        .then(response => response.json())
        .then(response => {

            console.log(response)
            console.log(response.results)
            setMovies([...Movies, ...response.results])
            setMainMoiveImage(response.results[0]) //제일 인기있는 영화
            setCurrentPage(response.page)
        })
    }

    const loadMoreItems =()=>{

        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`; // 다음페이지 가져오기
        
        fetchMovies(endPoint)

    }


    return (
        <div style={{width: '100%', margin: '0'}}>
            {/* Main Image */}
            {MainMoiveImage &&
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MainMoiveImage.backdrop_path}`}
                title ={MainMoiveImage.original_title}
                text={MainMoiveImage.overview}
            />
            }   
            <div style={{width: '85%', margin :'1rem auto'}}>
                <h2>Movie by latest</h2>
                <hr />
                {/* Movie Grid Cards */}
                
                <Row gutter={[16,16]}>


                {Movies && Movies.map((movie, index) => (
                //↑영화가 있다면 가져오기   
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                menuId={movie.id}
                                menuName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

            </div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
