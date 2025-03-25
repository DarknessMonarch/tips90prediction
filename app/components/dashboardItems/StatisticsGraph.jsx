import { useAuthStore } from "@/app/store/Auth";
import LoadingLogo from "@/app/components/LoadingLogo";
import styles from "@/app/styles/statistics.module.css";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      align: "start",
      labels: {
        padding: 20,
        font: {
          size: 14,
          weight: "bold",
        },
        color: "#efeff1", 
        usePointStyle: true,
        pointStyle: "rect",
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          size: 16,
        },
        color: "#ff1353", 
        callback: (value) => `$${value}`,
      },
      grid: {
        color: "#080a30", 
      },
    },
    x: {
      ticks: {
        font: {
          size: 16,
        },
        color: "#ff1353", 
      },
      grid: {
        color: "#080a30", 
      },
    },
  },
};

export default function StatisticGraph() {
  const { getRevenueAnalytics } = useAuthStore();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const dateInputRef = useRef(null);

  const fetchAnalytics = useCallback(async () => {
    const response = await getRevenueAnalytics();
    if (response.success) {
      setAnalyticsData(response.data);
    }
  }, [getRevenueAnalytics]);

  useEffect(() => {
    fetchAnalytics();
  }, [selectedYear, fetchAnalytics]);

  if (!analyticsData) {
    return <LoadingLogo />;
  }

  const data = {
    labels: analyticsData.monthlyData.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: analyticsData.monthlyData.map(item => item.revenue),
        backgroundColor: "#2ef32e",
        borderColor: "#2ef32e",
      },
      {
        label: 'Weekly Plans',
        data: analyticsData.monthlyData.map(item => item.weeklyPlans),
        backgroundColor: "#a8a9a2", 
        borderColor: "#a8a9a2", 
      },
      {
        label: 'Monthly Plans',
        data: analyticsData.monthlyData.map(item => item.monthlyPlans),
        backgroundColor: "#ff1353", 
        borderColor: "#ff1353", 
      }
    ],
  };

  return (
    <div className={styles.StatisticsComponent}>
      <div className={styles.barGraph}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}