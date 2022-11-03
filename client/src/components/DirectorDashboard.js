import React from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Container, margin } from '@mui/system';

function DirectorDashboard({ chartData }) {
    return (

        <div align="center" color="blue"> <h2>PROJECT STATISTICS</h2>
            <Container fixed sx={{paddingTop: "100px"}}>
                <Bar data={chartData}
                
                ></Bar>
            </Container>
        </div>
    )
}

export default DirectorDashboard