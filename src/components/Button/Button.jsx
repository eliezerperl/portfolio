import React from "react";
import styles from "./button.module.css";
import Link from "next/link";

const Button = ({ text, url }) => {
	return (
		<button className={styles.container}>
			<Link href={url}>{text}</Link>
		</button>
	);
};

export default Button;
