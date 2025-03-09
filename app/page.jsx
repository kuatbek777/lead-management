"use client";
import { Header } from "../components/header/Header";
import { ApplicationForm } from "../components/applicationForm/ApplicationForm";
import styles from "./page.module.css";
import { Provider } from "react-redux";
import store from "../store/store";

export default function () {
  return (
    <Provider store={store}>
      <div className={styles.page}>
        <Header />
        <ApplicationForm />
      </div>
    </Provider>
  );
}
