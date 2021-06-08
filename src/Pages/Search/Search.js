import axios from 'axios'
import { Button, createMuiTheme, Tab, Tabs, TextField, ThemeProvider } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import CustomPagination from '../../Pagination/CustomPagination';
import SingleContent from '../../SingleContent/SingleContent';
import '../Trending/Trending.css'

const Search = () => {
    const [ type, setType ] = useState(0)
    const [ page, setPage ] = useState(1)
    const [ searchText, setSearchText ] = useState('')
    const [ content, setContent ] = useState([])
    const [ numOfPages, setNumOfPages] = useState()

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#fff'
            }
        }
    })

    const fetchSearch = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=f8f43176dca7703cb1305f669a8f38e2&language=en-US&query=${searchText}&page=${page}&include_adult=true`)
        setContent(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        window.scroll(0, 0)
        fetchSearch()
         // eslint-disable-next-line
    }, [type, page])

    return ( 
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: 'flex', margin: '15px 0' }}>
                    <TextField 
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button variant='contained' 
                        style={{ marginLeft: '10'}}
                        onClick={fetchSearch}
                    > <SearchOutlined /> </Button>
                </div>            
                <Tabs value={type} indicatorColor='primary' 
                    textColor='primary'
                    onChange={(event, newValue) => {
                        setType(newValue)
                        setPage(1)
                    }}    
                    style={{ paddingBottom: 5 }}
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>    
            </ThemeProvider>   
            <div className='trending'>
                { content && content.map((movie) => (
                <SingleContent key={movie.id} 
                    id={movie.id} 
                    poster={movie.poster_path} 
                    title={movie.title || movie.name} 
                    date={movie.first_air_date || movie.release_date} 
                    media_type={type ? 'tv' : 'movie'}
                    vote_average={movie.vote_average}
                />
                ))}
                { searchText && !content && (type ? <h2>No Series  Found</h2> : <h2>No Movie Found</h2>) }
            </div>
            { numOfPages && numOfPages > 1 &&
                <CustomPagination setPage={setPage} /> 
            }
                    
        </div>
     );
}
 
export default Search;