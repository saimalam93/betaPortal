import { useEffect } from "react"
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Chart_Dash = () => {
    useEffect(() => {
        const fetchPrices = async () => {
            const res = await fetch("https://api.coincap.io/v2/assets/?limit=5")
            const data = await res.json()
            console.log(data)
        }
        fetchPrices()
    }, []);

    return (
        <div>
            <Bar
                data={{
                    datasets: [ {
                        id: 1,
                        year: 2016,
                        userGain: 80000,
                        userLost: 823,
                      },
                      {
                        id: 2,
                        year: 2017,
                        userGain: 45677,
                        userLost: 345,
                      },
                      {
                        id: 3,
                        year: 2018,
                        userGain: 78888,
                        userLost: 555,
                      },
                      {
                        id: 4,
                        year: 2019,
                        userGain: 90000,
                        userLost: 4555,
                      },
                      {
                        id: 5,
                        year: 2020,
                        userGain: 4300,
                        userLost: 234,
                      },
                    
                ]
                }}
            />
        </div>
    );
}

export default Chart_Dash;