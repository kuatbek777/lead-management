import { useEffect, useState } from "react";
import styles from "./LeadTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLeads, updateLeadStatus } from "../../store/leadSlice";

const itemsPerPage = 8;
const tableHeadClassname = `${styles.tableCell} ${styles.tableHeader}`;

const LeadTable = () => {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads.leads);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => dispatch(setLeads(data)));
  }, [dispatch]);

  const handleUpdateStatus = (id) => {
    fetch("/api/leads", {
      method: "PATCH",
      body: JSON.stringify({ id, status: "Reached Out" }),
    }).then((res) => {
      if (res.ok) {
        dispatch(updateLeadStatus({ id, status: "Reached Out" }));
      }
    });
  };

  const [sortConfig, setSortConfig] = useState({
    key: "firstName",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const sortingLabel = sortConfig.direction === "asc" ? "↓" : "↑";

  const sortedData = [...leads].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className={styles.wrapper}>
      <h1>Leads</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableRow}>
              <th
                onClick={() => handleSort("firstName")}
                className={tableHeadClassname}
              >
                Name {sortConfig.key === "firstName" ? sortingLabel : ""}
              </th>
              <th
                onClick={() => handleSort("email")}
                className={tableHeadClassname}
              >
                Email {sortConfig.key === "email" ? sortingLabel : ""}
              </th>
              <th
                onClick={() => handleSort("linkedin")}
                className={tableHeadClassname}
              >
                LinkedIn {sortConfig.key === "linkedin" ? sortingLabel : ""}
              </th>
              <th
                onClick={() => handleSort("visas")}
                className={tableHeadClassname}
              >
                Visas {sortConfig.key === "visas" ? sortingLabel : ""}
              </th>
              <th
                onClick={() => handleSort("status")}
                className={tableHeadClassname}
              >
                Status {sortConfig.key === "status" ? sortingLabel : ""}
              </th>
              <th
                onClick={() => handleSort("additionalInfo")}
                className={tableHeadClassname}
              >
                Additional Info{" "}
                {sortConfig.key === "additionalInfo" ? sortingLabel : ""}
              </th>
              <th
                onClick={() => handleSort("submittedAt")}
                className={tableHeadClassname}
              >
                Submitted {sortConfig.key === "submittedAt" ? sortingLabel : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((lead, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  {lead.firstName} {lead.lastName}
                </td>
                <td className={styles.tableCell}>{lead.email}</td>
                <td className={styles.tableCell}>{lead.linkedin}</td>
                <td className={styles.tableCell}>{lead.visas}</td>
                <td className={styles.tableCell}>
                  <div className={styles.status}>
                    {lead.status}
                    {lead.status === "Pending" && (
                      <button
                        onClick={() => handleUpdateStatus(lead.id)}
                        className={styles.updateButton}
                      >
                        Update Status
                      </button>
                    )}
                  </div>
                </td>
                <td className={styles.tableCell}>{lead.additionalInfo}</td>
                <td className={styles.tableCell}>
                  {new Date(lead.submittedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[...Array(Math.ceil(leads.length / itemsPerPage))].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? styles.active : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, Math.ceil(leads.length / itemsPerPage))
              )
            }
            disabled={currentPage === Math.ceil(leads.length / itemsPerPage)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadTable;
