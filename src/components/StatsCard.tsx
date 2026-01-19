interface StatsCardProps {
  label: string;
  value: number;
  color: 'blue' | 'orange' | 'green' | 'red';
}

export const StatsCard = ({ label, value, color }: StatsCardProps) => {
  const colorStyles = {
    blue:   'bg-blue-50 border-blue-100 text-blue-600',
    orange: 'bg-orange-50 border-orange-100 text-orange-600',
    green:  'bg-green-50 border-green-100 text-green-600',
    red:    'bg-red-50 border-red-100 text-red-600',
  };

  return (
    <div className={`p-3 rounded-lg border ${colorStyles[color]}`}>
      <span className="text-xs font-bold uppercase">{label}</span>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};