import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
	title: "",
	director: "",
	metascore: "",
	stars: [],
};

const MovieUpdate = (props) => {
	const { push } = useHistory();
	const [item, setItem] = useState(initialItem);
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => {
				// res.data
				setItem(res.data);
			})
			.catch((err) => console.log(err));
	}, [id]);

	const changeHandler = (ev) => {
		ev.persist();
		let value = ev.target.value;

		setItem({
			...item,
			[ev.target.name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.put(`http://localhost:5000/api/movies/${id}`, item)
			.then((res) => {
				props.getMovieList();
				push("/");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h2>Update Da Movie</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Title:
					<input
						type="text"
						name="title"
						onChange={changeHandler}
						placeholder="title"
						value={item.title}
					/>
				</label>
				<label>
					Director:
					<input
						type="text"
						name="director"
						onChange={changeHandler}
						placeholder="director"
						value={item.director}
					/>
				</label>
				<label>
					MetaScore:
					<input
						type="text"
						name="metascore"
						onChange={changeHandler}
						placeholder="metascore"
						value={item.metascore}
					/>
				</label>
				<label>
					Stars:
					<input
						type="string"
						name="stars"
						onChange={changeHandler}
						placeholder="stars"
						value={item.stars}
					/>
				</label>

				<button className="md-button form-button">
					{" "}
					Update Da Movie{" "}
				</button>
			</form>
		</div>
	);
};

export default MovieUpdate;
