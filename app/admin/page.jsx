"use client";
import store from "../../store/store";
import { Provider } from "react-redux";
import SideBar from "../../components/sideBar";
import styles from "./adminPage.module.css";
import LeadTable from "../../components/leadTable";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <Provider store={store}>
        <div className={styles.wrapper}>
          <SideBar />
          <LeadTable />
        </div>
      </Provider>
    </ProtectedRoute>
  );
}
