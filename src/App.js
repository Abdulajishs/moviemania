import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovies from './components/AddMovies';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("https://react-http-4b164-default-rtdb.firebaseio.com/movies.json")
      if (!response.ok) {
        throw new Error("Something went wrong ...Retrying");
      }
      const data = await response.json()
      console.log(data);
 
      const loadedMovies =[]
      for (const key in data) {
        loadedMovies.push({
          id : key ,
          title : data[key].title,
          openingText : data[key].openingText,
          releaseDate : data[key].releaseDate,
        })
      }
      setMovies(loadedMovies)
    } 
    catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  const addMovieHandler = async (movie)=>{
    const response = await fetch("https://react-http-4b164-default-rtdb.firebaseio.com/movies.json",{
    method : "POST",
    body : JSON.stringify(movie),
    headers : {
      "Content-Type" : "application/json"
    } })
    const data = await response.json();

    console.log(data);
  }

  const deleteMovieHandler = async (movieId)=>{
    await fetch(`https://react-http-4b164-default-rtdb.firebaseio.com/movies/${movieId}.json`,{
    method : "DELETE",
  });
  setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
}

  let content = <p>Found no movies!!!</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDeleteMovies={deleteMovieHandler} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading....</p>
  }



  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie ={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;