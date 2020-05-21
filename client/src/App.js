import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdate from "./Movies/MovieUpdate";
import axios from "axios";

const App = () => {
	const [savedMovieList, setSavedMovieList] = useState([]);
	const [movieList, setMovieList] = useState([]);

	const getMovieList = () => {
		axios
			.get("http://localhost:5000/api/movies")
			.then((res) => setMovieList(res.data))
			.catch((err) => console.log(err.response));
	};

	const addToSavedList = (movie) => {
		setSavedMovieList([...savedMovieList, movie]);
	};

	useEffect(() => {
		getMovieList();
	}, []);

	return (
		<>
			<SavedList list={savedMovieList} />

			<Route exact path="/">
				<MovieList movies={movieList} />
			</Route>

			<Route path="/movies/:id">
				<Movie
					addToSavedList={addToSavedList}
					getMovieList={getMovieList}
				/>
			</Route>

			<Route
				path="/update-movie/:id"
				render={() => <MovieUpdate getMovieList={getMovieList} />}
			/>
		</>
	);
};

export default App;
