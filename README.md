# 📋 Jira-Lite Dashboard (Task Manager)

A robust, Kanban-style task management application built with **React**, **TypeScript**, and **Tailwind CSS**. This dashboard features a fully functional drag-and-drop workflow simulation, complex filtering, real-time analytics, and local persistence.

![Project Screenshot](assets/ss.png)

## 🚀 Features

### Core Functionality
* **Kanban Workflow:** Four distinct columns (To Do, In Progress, Review, Done) with sequential task movement.
* **CRUD Operations:** Create, Read, Update, and Delete tasks with a unified modal interface.
* **Business Logic Enforcement:** Constraints prevent "Low Priority" (P2) tasks from being moved to the "Done" column directly, enforcing quality control simulation.
* **Smart Forms:** Pre-filled edit forms that reuse logic for creating new tasks.

### Advanced Features
* **Compound Filtering:** Filter tasks by **Search Query** (Title) AND **Priority** simultaneously.
* **Real-time Analytics:** Derived state calculations for Total Tasks, Pending Reviews, Completed Work, and Overdue Items.
* **Audit Logging:** Tracks user actions (Create, Move, Delete) and displays the last 3 activities in a live log.
* **Persistence:** Uses `localStorage` with lazy initialization to persist data across browser sessions.
* **Visual Indicators:** Dynamic styling for Overdue dates (Red) and Priority badges (P0/P1/P2 colors).

## 🛠️ Tech Stack

* **Framework:** [React](https://react.dev/) (Vite)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **State Management:** React `useState` & `useMemo` (No external libraries like Redux/Zustand used)

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/task-manager.git](https://github.com/yourusername/task-manager.git)
    cd task-manager
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── StatsCard.tsx   # Top dashboard metrics
│   ├── TaskCard.tsx    # Individual task item
│   ├── TaskColumn.tsx  # Kanban lane
│   └── TaskModal.tsx   # Form for Add/Edit
├── types/
│   └── types.ts        # TypeScript interfaces and enums
├── App.tsx             # Main Layout & Business Logic
└── main.tsx            # Entry point

```

## 🧠 Technical Highlights

* **Optimized Performance:** Utilized `useMemo` for filtering logic to prevent unnecessary recalculations on every render.
* **Derived State:** Dashboard statistics are calculated on-the-fly using `Array.reduce()`, ensuring the "Stats" section is always perfectly in sync with the Task list without needing redundant state variables.
* **Type Safety:** Fully typed interfaces for `Task`, `Priority`, and `Status` using TypeScript's `as const` pattern for robust enum-like behavior.
* **Uncontrolled Components:** Utilized `defaultValue` and `key` prop patterns in forms to handle "Edit Mode" state resets effectively.

## 🔮 Future Improvements

* Implement Drag-and-Drop using `dnd-kit` or `react-beautiful-dnd`.
* Add Dark Mode support via Tailwind.
* Migrate `localStorage` to a real Backend API (Node/Express).
* Add "Archive" functionality for cleaning up the Done column.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).