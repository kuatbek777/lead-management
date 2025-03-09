"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (userName === "admin" && password === "admin") {
      localStorage.setItem("auth", "true");
      router.push("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.wrapper}>
      <Link className={styles.logo} href="/">
        <Image alt="Alma logo" src="/alma.jpeg" width={123} height={62} />
      </Link>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
