
import axios from '../../axios-movie-instance'
import { useState, useEffect } from 'react'
import Footer from '../../component/footer/Footer'
import Filter from '../../component/filter/Filter'
import Pagination from '../../component/pagination/Pagination'
import MovieGird from '../../component/movies/MovieGird'
import Header from '../../component/header/Header'
import Spiner from '../../component/ui/Spiner/Spiner'
import Modal from '../../component/ui/Modal/Modal'
import Backdrop from '../../component/ui/Backdrop/Backdrop'
import Movie from '../../component/movies/single-movie/Movie'
const API_KEY = "1fb360d3b2bfd65d7ebf3188fb4f3a5c";

export default function Movies() {
    //for pagination
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [paginationID, setPaginationID] = useState(1);
    const itemsPerPage = 8;

    const [disabledButtonValue, setDisabledButtonValue] = useState(false);
    const [update, setUpdate] = useState(true);
    //pagination end
    const [updateMovies, setUpdateMovies] = useState([]);
    const [modalVal, setModalVal] = useState(false);
    const [movieValue, setMovieValue] = useState(true);
    const [loading, setLoading] = useState(false);
    const [singleMovieItem, setSingleMovieItem] = useState([]);
    const [movieItem, setMovieItem] = useState([]);
    useEffect(() => {
        axios.get('discover/movie?sort_by=popularity.desc&page=1&api_key=' + API_KEY)
            .then(response => {
                setMovieItem(response.data.results);
                setUpdateMovies(response.data.results);
                setUpdate(!update)
            })
            .catch(error => {
                console.log(error.response.data.error)
            })
    }, []);
    const modalController = (movieID) => {
        axios.get('https://api.themoviedb.org/3/movie/' + movieID + '?api_key=' + API_KEY)
            .then(response => {
                console.log(response.data)
                setSingleMovieItem(response.data);
                setLoading(true);
            })
            .catch(error => {
                console.log(error.response.data.error)
            })
        setModalVal(!modalVal);
    }
    let singleMovieData = <Spiner />
    if (loading) {
        singleMovieData = <Movie singleMovieItem={singleMovieItem} />
    }
    const backdropHandler = () => {
        setModalVal(!modalVal);
    }
    let movieGird = <Spiner />
    if (!movieValue) {
        movieGird = <MovieGird
            modalController={modalController}
            movieItems={currentItems}
        />
    }
    //for pagination function start
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(currentItems.concat(updateMovies.slice(itemOffset, endOffset)));
        setPageCount(Math.ceil(updateMovies.length / itemsPerPage));
        setMovieValue(false)
    }, [update, itemOffset]);

    // Invoke when user click to request another page.
    const handlePageClick = ({ id }) => {
        const newOffset = (id * itemsPerPage) % updateMovies.length;
        setItemOffset(newOffset);
        setUpdate(!update)
        setPaginationID(paginationID + 1)
    }
    let disableValue = ((itemOffset + itemsPerPage) >= updateMovies.length) ? "invisible" : null;
    //pagination end

    //for search function start
    const [searchValueResults, setSearchValueResults] = useState([]);
    const searchMovieItemFunc = (searchValue) => {
        if(searchValue){
            axios.get('search/movie?api_key='+API_KEY + '&query=' + searchValue)
            .then(response => {
                setUpdateMovies(response.data.results)
                setCurrentItems([]);
                setItemOffset(0);
                setUpdate(!update)
            })
            .catch(error => {
                console.log(error.response.data.error)
            })
        }else{
            setUpdateMovies(movieItem);
            setCurrentItems([]);
            setItemOffset(0);
            setUpdate(!update);
        }
    }
    //for search function end

    //sort function start
        const sortFilter = (sortValue) => {
            if(sortValue){
                axios.get('discover/movie?sort_by='+sortValue+'&page=1&api_key=' + API_KEY)
                .then(response => {
                    setUpdateMovies(response.data.results)
                    setCurrentItems([]);
                    setItemOffset(0);
                    setUpdate(!update)
                })
                .catch(error => {
                    console.log(error.response.data.error)
                })
            }else{
                setUpdateMovies(movieItem);
                setCurrentItems([]);
                setItemOffset(0);
                setUpdate(!update);
            }
        }
    //sort function end
    return (
        <div className="bg-white">
            <main className="pb-24">
                <Backdrop show={modalVal} backdropHandler={backdropHandler} />
                {
                    modalVal
                        ?
                        <Modal >
                            {singleMovieData}
                        </Modal>
                        : null
                }
                <Header />

                {/* Filters */}
                <Filter searchMovieItem={searchMovieItemFunc} sortFilter={sortFilter}/>

                {/* Product grid */}
                
                {movieGird}

                {/* Pagination */}
                <div className={`grid justify-items-center ${disableValue}`}>
                    <button
                        id={paginationID}
                        className="inline-flex items-center 
                    px-6 py-3 border 
                    shadow-sm  font-medium rounded-md 
                    text-gray-700 bg-white hover:bg-gray-50 mt-14 "
                        onClick={(event) => handlePageClick(event.target)}
                    >
                        Load More
                    </button>
                </div>

                {/* <Pagination length={movieItem.length} /> */}
            </main>

            <Footer />
        </div>
    )
}
