import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState(null);
  const [attempt,setAttempt] =useState(0);
  const [stopAttempt,setStopAttempt] = useState(false)

  const fetchMoviesHandler = useCallback( async () => {
    setIsLoading(true)
    setError(null)
    setStopAttempt(false)
    try {
      const response = await fetch("https://swapi.dev/api/film/")
      if(!response.ok){
        throw new Error("Something went wrong ...Retrying");
      }
      const data = await response.json()
      
      
      const transformedMovies = data.results.map((moviedata) => {
        return {
          id: moviedata.episode_id,
          title: moviedata.title,
          openingText: moviedata.opening_crawl,
          releaseDate: moviedata.release_date
        }
      })
      setMovies(transformedMovies)
    } catch (error) {
      setError(error.message)
      setAttempt(prevAttempt => prevAttempt +1)
    }
    setIsLoading(false)
  },[])

  useEffect( ()=>{
    let timeout;
    if (!stopAttempt) {
      timeout = setTimeout(() => {
        fetchMoviesHandler()
        console.log("retrying");
      }, 5000);
    }
    return ()=>clearTimeout(timeout)
  },[fetchMoviesHandler,attempt,stopAttempt])

  let content = <p>Found no movies!!!</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if(error){
    content = <p>{error}</p>  
  }
  
  if (isLoading) {
    content =<p>Loading....</p>
  }



  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={()=>setStopAttempt(true)}>Cancel</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;