import { useRef } from "react";

const AddMoviesForm = () => {
    const titleRef = useRef("");
    const openingTextRef = useRef("");
    const releaseDateRef = useRef("");

    const addMoviesHandler = (event) => {
        event.preventDefault();

        let NewMovieObj = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value
        }
        console.log(NewMovieObj);
        titleRef.current.value = ""
        openingTextRef.current.value = ""
        releaseDateRef.current.value = ""
    }
    return (
        <form onSubmit={addMoviesHandler}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={titleRef} />
            </div>
            <div>
                <label htmlFor="texts">Opening Text  </label>
                <input type="text" id="texts" ref={openingTextRef} />
            </div>
            <div>
                <label htmlFor="date">Release Date</label>
                <input type="text" id="date" ref={releaseDateRef} />
            </div>
            <div>
                <button type="submit">Add Movie</button>
            </div>
        </form>
    )
}

export default AddMoviesForm;