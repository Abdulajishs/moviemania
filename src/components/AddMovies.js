import { useRef } from "react";

import classes from "./AddMovies.module.css"

const AddMovies = (props) => {
    const titleRef = useRef("");
    const openingTextRef = useRef("");
    const releaseDateRef = useRef("");

    const submitHandler = (event) => {
        event.preventDefault();
        let NewMovieObj = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value
        }
        // console.log(NewMovieObj);
        props.onAddMovie(NewMovieObj)

        titleRef.current.value = ""
        openingTextRef.current.value = ""
        releaseDateRef.current.value = ""
    }
    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={titleRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor="texts">Opening Text  </label>
                <textarea rows="5" id="texts" ref={openingTextRef} ></textarea>
            </div>
            <div className={classes.control}>
                <label htmlFor="date">Release Date</label>
                <input type="text" id="date" ref={releaseDateRef} />
            </div>
            <button type="submit">Add Movie</button>
        </form>
    )
}

export default AddMovies;