"use client";

import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
	const res = await fetch(`/api/posts/${id}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		return notFound();
	}

	return res.json();
}

const BlogPost = async ({ params }) => {
	const data = await getData(params.id);

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<div className={styles.info}>
					<h1 className={styles.title}>{data.title}</h1>
					<p className={styles.desc}>{data.desc}</p>
					<div className={styles.author}>
						<img
							src={data.img}
							alt=""
							width={40}
							height={40}
							className={styles.avatar}
						/>
						<span className={styles.username}>{data.username}</span>
					</div>
				</div>
				<div className={styles.imgContainer}>
					<img src={data.img} alt="" fill={true} className={styles.img} />
				</div>
			</div>
			<div className={styles.content}>
				<p className={styles.text}>{data.content}</p>
			</div>
		</div>
	);
};

export default BlogPost;
