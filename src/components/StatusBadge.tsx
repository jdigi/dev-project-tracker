import React from "react";
import styles from "../styles/components/status-badge.module.scss";

type Status = "in-progress" | "done" | "blocked" | "upcoming";

interface StatusBadgeProps {
  status: Status;
}

const getStatusLabel = (status: Status): string => {
  switch (status) {
    case "in-progress":
      return "In Progress";
    case "upcoming":
      return "Upcoming";
    case "blocked":
      return "Blocked";
    case "done":
      return "Done";
    default:
      return status;
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`${styles["status-badge"]} ${
        styles[`status-badge--${status}`]
      }`}
    >
      {getStatusLabel(status)}
    </span>
  );
};

export default StatusBadge;
