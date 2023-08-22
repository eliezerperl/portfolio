"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { getAllPhotos, uploadPhoto } from "@/actions/uploadActions";

const Dashboard = () => {
	const session = useSession();
	const router = useRouter();

	const fetcher = (...args) => fetch(...args).then((res) => res.json());
	const { data, mutate, error, isLoading } = useSWR(
		`/api/posts?username=${session.data?.user.name}`,
		fetcher
	);
	console.log(data);
	if (session.status === "loading") {
		return <LoadingSpinner />;
	}

	if (session.status === "unauthenticated") {
		return router?.push("/dashboard/login");
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const title = e.target[0].value;
		const desc = e.target[1].value;
		const img = e.target[2].files[0];
		const content = e.target[3].value;

		if (img.size > 1024 * 1024 && img.type.startsWith("image/")) {
			return new Error("File to big");
		}

		const formData = new FormData();
		formData.append("image", img);
		const res = await uploadPhoto(formData);

		try {
			await fetch("/api/posts", {
				method: "POST",
				body: JSON.stringify({
					title,
					desc,
					img: res.secure_url, // res.url is the same
					content,
					username: session.data.user.name,
				}),
			});
			mutate();
			e.target.reset();
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await fetch(`/api/posts/${id}`, {
				method: "DELETE",
			});
			mutate();
		} catch (error) {}
	};

	if (session.status === "authenticated") {
		return (
			<div className={styles.container}>
				<div className={styles.posts}>
					{isLoading ? (
						<LoadingSpinner />
					) : (
						data?.map((item) => (
							<div key={item._id} className={styles.post}>
								<div className={styles.imgContainer}>
									<img src={item.img} alt="" width={200} height={100} />
								</div>
								<h2 className={styles.postTitle}>{item.title}</h2>
								<span
									className={styles.delete}
									onClick={() => handleDelete(item._id)}>
									X
								</span>
							</div>
						))
					)}
				</div>
				<form className={styles.new} onSubmit={handleSubmit}>
					<h1>Add New Post</h1>
					<input type="text" placeholder="Title" className={styles.input} />
					<input type="text" placeholder="Desc" className={styles.input} />
					<input type="file" accept="image/*" className={styles.input} />
					<textarea
						placeholder="Content"
						className={styles.textArea}
						cols="30"
						rows="10"></textarea>
					<button className={styles.button}>Send</button>
				</form>
			</div>
		);
	}
};

export default Dashboard;
