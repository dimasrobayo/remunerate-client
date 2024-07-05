import React from 'react';
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Line} from 'react-chartjs-2';
import { UserData } from '../data/Data';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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

const Data = {
    labels: UserData.map((data) => data.year),
    datasets: [{
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: '#007bff',
    },
    {
        label: "Users Lost",
        data: UserData.map((data) => data.userLost),
        backgroundColor: '#6c757d',
    }
]
}

export default function Visits() {
    return( 
    <div>
        <div className="card-header border-0">
            <div className="d-flex justify-content-between">
                <h3 className="card-title">Visitantes en línea</h3>
                <a href="/#">Ver Reporte</a>
            </div>
        </div>

        <div className="card-body">
            <div className="d-flex">
                <p className="d-flex flex-column">
                    <span className="text-bold text-lg">820</span>
                    <span>Total de Visitas</span>
                </p>
                <p className="ml-auto d-flex flex-column text-right">
                    <span className="text-success">
                        <i className="fas fa-arrow-up" /> 12.5%
                    </span>
                    <span className="text-muted">Desde la semana pasada</span>
                </p>
            </div>

            {/* /.d-flex */}
            <div className="position-relative mb-4">
                <Line options={options} data={Data} height="80px" />
            </div>
        </div>
    </div>);
}
