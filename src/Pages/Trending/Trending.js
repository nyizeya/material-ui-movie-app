import axios from 'axios'
import { useEffect, useState } from 'react'
import CustomPagination from '../../Pagination/CustomPagination'
import SingleContent from '../../SingleContent/SingleContent'
import './Trending.css'

const Trending = () => {
    const [ content, setContent ] = useState()
    const [ page, setPage ] = useState(1)

    const fetchTrending = async () => {     
        const  {data}  = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=f8f43176dca7703cb1305f669a8f38e2&page=${page}`)
        setContent(data.results);  
        // console.log(data.results);
    }
     
    useEffect(() => {
        fetchTrending()
         // eslint-disable-next-line
    }, [page])
    
    return ( 
        <div>
            <span className='pageTitle'>Trending</span>
            <div className='trending'>
                { content && content.map((movie) => (
                <SingleContent key={movie.id} 
                    id={movie.id} 
                    poster={movie.poster_path} 
                    title={movie.title || movie.name} 
                    date={movie.first_air_date || movie.release_date} 
                    media_type={movie.media_type}
                    vote_average={movie.vote_average}
                />
                ))}
            </div>
            <CustomPagination setPage={setPage} />
        </div>
     );
}
 
export default Trending;