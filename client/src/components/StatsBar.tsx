import type { Status } from "../types/types";
import { StatsCard } from "./StatsCard";

interface StatsBarProps {
    stats: Record<"Total" | "OverDue" | Status, number>
}

export const StatsBar = ({ stats }: StatsBarProps) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            <StatsCard
                label="Total Tasks"
                value={stats.Total || 0}
                color="blue"
            />
            <StatsCard
                label="Pending Review"
                value={stats.InReview || 0}
                color="orange"
            />
            <StatsCard
                label="Completed"
                value={stats.Done || 0}
                color="green"
            />
            <StatsCard label="Overdue" value={stats.OverDue || 0} color="red" />
        </div>
    );
}