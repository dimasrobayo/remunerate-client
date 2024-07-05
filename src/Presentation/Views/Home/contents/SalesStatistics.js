import React from 'react';
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { UserData } from '../data/Data';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        }
    },
};

const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
const Data = {
    labels,
    datasets: [
            {
            label: "Este Año",
            data: UserData.map((data) => data.userGain),
            backgroundColor: '#007bff',

        },
        {
            label: "Año Pasado",
            data: UserData.map((data) => data.userLost),
            backgroundColor: '#6c757d',
        }
    ]
}

export default function SalesStatistics() {
  return (
  <div>
      <div className="card-header border-0">
            <div className="d-flex justify-content-between">
                <h3 className="card-title">Pagos</h3>
                <a href="/#">Ver Reporte</a>
            </div>

        </div>

        <div className="card-body">
            <div className="d-flex">
                <p className="d-flex flex-column">
                    <span className="text-bold text-lg">$18,230.00</span>
                    <span>Total Pagos</span>
                </p>
                <p className="ml-auto d-flex flex-column text-right">
                    <span className="text-success">
                        <i className="fas fa-arrow-up" /> 33.1%
                    </span>
                    <span className="text-muted">Desde el mes pasado</span>
                </p>
            </div>
            
            <div className="position-relative mb-4">
                <Bar options={options} data={Data} height="80px" />
            </div>
        </div>
  </div>);
}
