export interface Task {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  deadline: string;
}

export const Priority = {
  P0: "P0",
  P1: "P1",
  P2: "P2",
} as const;

export const Status = {
  Todo: "Todo",
  InProgress: "InProgress",
  InReview: "InReview", 
  Done: "Done",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];
export type Status = (typeof Status)[keyof typeof Status];

export const PriorityLabels: Record<Priority, string> = {
  [Priority.P0]: "High",
  [Priority.P1]: "Medium",
  [Priority.P2]: "Low",
};

export const previousStatus = {
  [Status.Done]: Status.InReview,
  [Status.InReview]: Status.InProgress,
  [Status.InProgress]: Status.Todo,
  [Status.Todo]: null,
};

export const nextStatus = {
  [Status.Todo]: Status.InProgress,
  [Status.InProgress]: Status.InReview,
  [Status.InReview]: Status.Done,
  [Status.Done]: null,
};

export interface UserSummary {
  _id: string;
  name: string;
  email: string;
}

export interface Comment {
  _id: string;
  content: string;
  user: UserSummary;
  createdAt: string;
}
