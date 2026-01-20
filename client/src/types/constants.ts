export interface boardColumn {
  title: string;
  status: string;
  color: "slate" | "blue" | "orange" | "green";
}

export const boardColumns: boardColumn[] = [
  { title: "To Do", status: "Todo", color: "slate" },
  { title: "In Progress", status: "InProgress", color: "blue" },
  { title: "Review", status: "InReview", color: "orange" },
  { title: "Done", status: "Done", color: "green" },
];
