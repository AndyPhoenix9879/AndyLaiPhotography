import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Firestore } from "../../firebase/config";

import "../../Pages.css";

export default function HK() {
	const [dbdata, setDBdata] = useState([]);
	const [selectedImg, setSelectedImg] = useState(null);
	var data = [];

	const hideModal = (e) => {
		if (e.target.classList.contains("backdrop")) {
			setSelectedImg(null);
		}
	};

	useEffect(() => {
		Firestore.collection("hk")
			.orderBy("createdAt", "desc")
			.onSnapshot((snap) => {
				data = [];
				snap.forEach((doc) => {
					// documents.push({ ...doc.data(), id: doc.id });
					// console.log(doc.data());
					data.push(doc.data());
				});
				setDBdata(data);
				// setDocs(documents);
			});
	}, []);

	// console.log(dbdata);
	return (
		<div>
			<h1> HONG KONG </h1>
			<p className="desc">
				Hong Kong is one of the most lively and largest cities in Asia. It is
				also where I am based at currently - as a student at The Chinese
				University of Hong Kong. The city offers a beautiful skyline, amazing
				food and also a unique cultural experience as being Asia’s World City.{" "}
			</p>
			<div className="galleryNavi">
				<NavLink to="/AndyLaiPhotography/brunei" exact>
					&lt;&lt; Previous
				</NavLink>
				<NavLink to="/AndyLaiPhotography/galleries" exact>
					Back to Galleries
				</NavLink>
				<NavLink to="/AndyLaiPhotography/singapore" exact>
					Next &gt;&gt;
				</NavLink>
			</div>
			{/* Photo Galleries starts here */}
			<div className="img-grid">
				{dbdata &&
					dbdata.map((data) =>
						data.height > data.width ? (
							<div className="vertical" key={data.createdAt}>
								<img
									src={data.url}
									alt={data.alt}
									onContextMenu={(e) => e.preventDefault()}
									onClick={(e) => setSelectedImg(data.url)}
								/>
								<div className="i-title">{data.title}</div>
								<div className="i-desc">{data.desc}</div>
							</div>
						) : (
							<div className="horizontal" key={data.createdAt}>
								<img
									src={data.url}
									alt={data.alt}
									onContextMenu={(e) => e.preventDefault()}
									onClick={(e) => setSelectedImg(data.url)}
								/>
								<div className="i-title">{data.title}</div>
								<div className="i-desc">{data.desc}</div>
							</div>
						)
					)}
			</div>

			<div className="galleryNavi">
				<NavLink to="/AndyLaiPhotography/brunei" exact>
					&lt;&lt; Previous
				</NavLink>
				<NavLink to="/AndyLaiPhotography/galleries" exact>
					Back to Galleries
				</NavLink>
				<NavLink to="/AndyLaiPhotography/singapore" exact>
					Next &gt;&gt;
				</NavLink>
			</div>

			{selectedImg && (
				<div
					className="backdrop"
					onClick={hideModal}
					onContextMenu={(e) => e.preventDefault()}
				>
					<img src={selectedImg} alt="enlarged pic" />
				</div>
			)}
		</div>
	);
}
