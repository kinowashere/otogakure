import { useYearsListened } from "../statsChart/client/api";

type YearSelectorProps = {
  onSelect: (year: number | string) => void;
  value: number | string;
};

export const YearSelector = ({ onSelect, value }: YearSelectorProps) => {
  const { status, data } = useYearsListened();
  if (status === "loading" || !data) {
    return <div>loading...</div>;
  }
  return (
    <select
      className="max-w-min"
      value={value}
      onChange={(event) => onSelect(event.target.value)}
    >
      {data.data.years.map((year) => (
        <option key={year}>{year}</option>
      ))}
    </select>
  );
};
