import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

async function getData() {
	const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

const Blog = async () => {
	const data = await getData();

	return (
		<div className={styles.mainContainer}>
			{data.length === 0
				? "No blogs to show..."
				: data.map((item) => (
						<Link
							key={item._id}
							href={`/blog/${item._id}`}
							className={styles.container}>
							<div className={styles.imgContainer}>
								<img
									src={item.img}
									alt="Blog"
									width={400}
									height={250}
									className={styles.img}
								/>
							</div>
							<div className={styles.content}>
								<h1 className={styles.title}>{item.title}</h1>
								<p className={styles.desc}>{item.desc}</p>
							</div>
						</Link>
				  ))}
		</div>
	);
};

export default Blog;
