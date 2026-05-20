type MetricProps = {
  label: string;
  value: string | number;
  unit?: string;
};

export function Metric({ label, value, unit }: MetricProps) {
  return (
    <div className="compact-metric">
      <span>{label}</span>
      <strong>
        {value}
        {unit ? <small>{unit}</small> : null}
      </strong>
    </div>
  );
}
