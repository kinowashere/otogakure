import { Bar, type ChartProps } from "react-chartjs-2";
import "chart.js/auto";

function App() {
  const labels = ["jan", "feb", "mar", "apr", "may", "jun", "jul"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 3, 4, 5, 6, 7],
        borderColor: "#4dc9f6",
        backgroundColor: "#f67019",
      },
      {
        label: "Dataset 2",
        data: [7, 6, 5, 4, 3, 2, 1],
        borderColor: "#f67019",
        backgroundColor: "#4dc9f6",
      },
    ],
  };
  const config: ChartProps<"bar"> = {
    type: "bar",
    data: data,
    options: {
      indexAxis: "y",
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Chart.js Horizontal Bar Chart",
        },
      },
    },
  };

  return (
    <main className="w-xl">
      <h1 className="font-black text-2xl">Hello, world!</h1>
      <Bar {...config} />
    </main>
  );
}

export default App;
