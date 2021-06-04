import React, { useState, useEffect } from "react";
import { Storage, Firestore, timestamp } from "../firebase/config";

const UploadForm = () => {
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");

	useEffect(() => {
		if (file != null) {
			var name = file.name;
			const storageRef = Storage.ref(name);
			const collectionRef = Firestore.collection("images");

			storageRef.put(file).on(
				"state_changed",
				(snap) => {},
				(err) => {
					console.log(err);
					setError(err);
				},
				async () => {
					const url = await storageRef.getDownloadURL();
					const createdAt = timestamp();
					var img = new Image();
					img.onload = async function () {
						// for getting the height and width
						var height = img.height;
						var width = img.width;
						// then send it to firestore
						await collectionRef.add({
							name,
							url,
							title,
							desc,
							height,
							width,
							createdAt,
						});
					};
					img.src = url;
				}
			);
		}
	}, [file]);
	const types = ["image/png", "image/jpeg"];

	const HandleChange = (e) => {
		let selected = e.target.files[0];

		if (selected && types.includes(selected.type)) {
			setFile(selected);
			setError("");
		} else {
			setFile(null);
			setError("Please select an image file (png or jpg)");
		}
	};

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleDesc = (e) => {
		setDesc(e.target.value);
	};

	return (
		<form>
			<label>Title:</label>
			<input type="text" onChange={handleTitle}></input>
			<br></br>
			<label>Description:</label>
			<textarea rows="4" cols="50" onChange={handleDesc}></textarea>
			<br></br>
			<label>
				<input type="file" onChange={HandleChange} />
			</label>
			<div className="output">
				{/* {error && <div className="error">{error}</div>} */}
				{file && <div>SUCCESS!</div>}
				<p>{title}</p>
				<p>{desc}</p>
			</div>
		</form>
	);
};

export default UploadForm;
