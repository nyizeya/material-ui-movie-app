import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import useGenre from "../../hooks/useGenre";
import CustomPagination from "../../Pagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";
import '../Trending/Trending.css'


const Series = () => {
    const [ page, setPage ] = useState(1)
    const [ content, setContent ] = useState([])
    const [ numOfPages, setNumOfPages ] = useState()

    const [ genres, setGenres ] = useState([])
    const [ selectedGenres, setSelectedGenres ] = useState([])

    const genreforURL = useGenre(selectedGenres)

    const fetchMovies = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=f8f43176dca7703cb1305f669a8f38e2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
        setContent(data.results)
        setNumOfPages(data.total_pages)
        // console.log(data);
    }

    useEffect(() => {
        fetchMovies()
         // eslint-disable-next-line
    }, [page, genreforURL])

    return ( 
        <div>
            <span className='pageTitle'>Series</span>
            <Genres 
                type='tv'
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className='trending'>
                { content && content.map((movie) => (
                <SingleContent key={movie.id} 
                    id={movie.id} 
                    poster={movie.poster_path} 
                    title={movie.title || movie.name} 
                    date={movie.first_air_date || movie.release_date} 
                    media_type='tv'
                    vote_average={movie.vote_average}
                />
                ))}
            </div>
            { numOfPages && numOfPages > 1 && <CustomPagination setPage={setPage} numberOfPages={numOfPages} /> }
        </div>
     );
}
 
export default Series;