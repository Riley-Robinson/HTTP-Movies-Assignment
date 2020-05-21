import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
	const [movie, setMovie] = useState(null);
	const params = useParams();
	const { push } = useHistory();

	const fetchMovie = (id) => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => setMovie(res.data))
			.catch((err) => console.log(err.response));
	};

	const saveMovie = () => {
		addToSavedList(movie);
	};

	useEffect(() => {
		fetchMovie(params.id);
	}, [params.id]);

	if (!movie) {
		return <div>Loading All Da movie information...</div>;
	}

	const deleteMovie = (e) => {
		e.preventDefault();
		axios
			.delete(`http://localhost:5000/api/movies/${params.id}`)
			.then((res) => {
				getMovieList();
				push("/");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="save-wrapper">
			<MovieCard movie={movie} />

			<div className="save-button" onClick={saveMovie}>
				Save Da Movie
			</div>
			<button onClick={() => push(`/update-movie/${movie.id}`)}>
				Update Da Movie
			</button>
			<button onClick={deleteMovie}>Delete Da Movie</button>
		</div>
	);
}

export default Movie;
