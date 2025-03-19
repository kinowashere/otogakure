type WeekHeatmapProps = {
  from: string;
  to: string;
  data: Record<string, number>;
};

type CalendarDate = {
  isoDate: string;
  percentage: number;
  year: number;
  month: number;
  date: number;
};

type CalendarTable = CalendarDate[][];

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const addToDate = (from: Date, amount: number) => {
  const newDate = new Date();
  newDate.setTime(from.getTime() + amount);
  return newDate;
};

const buildStartDate = (fromDate: Date) => {
  if (isNaN(fromDate.getTime())) {
    throw Error("this isn't a date mon!");
  }
  const fromDay = fromDate.getUTCDay();
  if (fromDay === 0) {
    return fromDate;
  }
  const daysToSubstract = fromDay * -1;
  return addToDate(fromDate, ONE_DAY_IN_MS * daysToSubstract);
};

const buildEndDate = (toDate: Date) => {
  if (isNaN(toDate.getTime())) {
    throw Error("this isn't a date mon!");
  }
  const toDay = toDate.getUTCDay();
  if (toDay === 6) {
    return toDate;
  }
  const daysToAdd = 6 - toDay;
  return addToDate(toDate, ONE_DAY_IN_MS * daysToAdd);
};

// pronounced quick maph
const quickMath = (calendarTable: CalendarTable) => {
  calendarTable.forEach((week) => {
    if (week.length !== 7) {
      throw Error(
        "this week doesnt have 7 days, please contact Manuel thank you",
      );
    }
  });
};

const buildTable = ({ from, to, data }: WeekHeatmapProps) => {
  const calendarTable: CalendarTable = [];
  const startDate = buildStartDate(new Date(from));
  const endDate = buildEndDate(new Date(to));
  const endTime = endDate.getTime();

  let currTime = startDate.getTime();
  let weekBuffer: CalendarDate[] = [];

  while (currTime <= endTime) {
    const currDate = new Date(currTime);
    const currISODate = currDate.toISOString().split("T", 1)[0];
    const percentage = data[currISODate] || 0;
    weekBuffer.push({
      isoDate: currISODate,
      percentage,
      year: currDate.getUTCFullYear(),
      month: currDate.getUTCMonth(),
      date: currDate.getUTCDate(),
    });
    if (currDate.getUTCDay() === 6) {
      calendarTable.push(weekBuffer);
      weekBuffer = [];
    }
    currTime += ONE_DAY_IN_MS;
  }
  quickMath(calendarTable);
  return calendarTable;
};

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export const WeekHeatmap = ({ from, to, data }: WeekHeatmapProps) => {
  const table = buildTable({ from, to, data });
  return (
    <section className="flex flex-col space-y-1 w-min">
      <div className="grid grid-cols-12">
        {MONTHS.map((month) => (
          <p key={month}>{month}</p>
        ))}
      </div>
      <section className="flex space-x-1">
        {table.map((row, i) => {
          return (
            <div className="flex flex-col space-y-1" key={`cal_week_${i}`}>
              {row.map(({ isoDate, percentage }) => {
                const bg = percentage === 0 ? "bg-zinc-800" : "bg-blue-700";
                const opacity = percentage === 0 ? 100 : percentage;
                return (
                  <div
                    className={`w-2.5 h-2.5 ${bg}`}
                    style={{ opacity }}
                    key={isoDate}
                    title={`${isoDate} - ${Math.floor(percentage * 100)}%`}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </section>
    </section>
  );
};
