import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({ type, selectedGenres, setSelectedGenres, genres, setGenres, setPage }) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter(g => g.id !== genre.id))
        setPage(1)
    }

    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id))
        setGenres([...genres, genre])
        setPage(1)
    }


    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=f8f43176dca7703cb1305f669a8f38e2&language=en-US`)
        setGenres(data.genres)
        console.log(data.genres);
    }

    useEffect(() => {
        fetchGenres()
        return () => {
            setGenres([])
        }
         // eslint-disable-next-line
    }, [])

    return ( 
        <div style={{ padding: "6px 0" }}>
            {selectedGenres && selectedGenres.map((genre) => (
                <Chip  
                    key={genre.id}
                    label={genre.name}
                    style={{ margin: 2 }}
                    clickable
                    size='sm'
                    color='secondary'
                    onDelete={() => handleRemove(genre)}
                />
            ))}

            {genres && genres.map((genre) => (
                <Chip  
                    key={genre.id}
                    label={genre.name}
                    style={{ margin: 2 }}
                    size='sm'
                    clickable
                    onClick={() => handleAdd(genre)}
                />
            ))}
        </div>
     );
}
 
export default Genres;