import React, {useEffect, useState} from 'react'
import axios from  "axios"
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async()=>{
        try {
            const response = await axios.get(`${window.location.origin}/${props.category}`)
            console.log(response.data.articles)
            if(response){
                setArticles(response.data.articles)
                setTotalResults(response.data.articles.length)
                setLoading(false)
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    // const updateNews = async ()=> {
    //     props.setProgress(10);
    //     const url = `http://localhost:8080/${props.category}`; 
    //     setLoading(true)
    //     let data = await fetch(url);
    //     props.setProgress(30);
    //     // let parsedData = await data.json()
    //     props.setProgress(70);
    //     setArticles(data)
    //     // setTotalResults(parsedData.totalResults)
    //     setLoading(false)
    //     props.setProgress(100);
    // }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsSaga`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])


    // const fetchMoreData = async () => {   
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    //     setPage(page+1) 
    //     let data = await fetch(url);
    //     console.log(data)
    //     // let parsedData = await data.json()
    //     setArticles(articles.concat(data))
    //     // setTotalResults(parsedData.totalResults)
    //   };

    
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsSaga - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    // next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
