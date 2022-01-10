import logo from './logo.svg';
import './App.css';
import { Line } from "react-chartjs-2"
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [degreeDay, setDegreeDay] = useState(0);



  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjE4YWI1NjhiODU0OTMwN2ZkYmI0ZTViIiwiZW1haWwiOiJnYXV0YW1kZXYuY2hvd2RhcnlAbTNjZy51cyIsImlhdCI6MTY0MTg0NDc0NywiZXhwIjoxNjQxODczNTQ3fQ.ScRFgBMaHec8Pw5d7xsw2bNRoD2GdAICa_MzJ1dXB_c'
  // degree-days?min_temp=12&max_temp=70
  useEffect(async () => {
    // const response = await fetch('http://3.18.30.67/api/degree-days?min_temp=12&max_temp=70', { mode: 'no-cors' });
    // const data = await response.json();
    // console.log({ data })

    axios.get("http://3.18.30.67/api/degree-days?min_temp=12&max_temp=70", {
      headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      console.log(res, 'res')
      setDegreeDay(res.data.degree_day)
    }).catch(err => console.log(err))
  }, [])


  return (
    <div className="App" style={{ marginTop: "100px" }}>
      <Line
        height={100}
        options={
          {
            plugins: {
              legend: {
                display: false
              }
            }
          }
        }
        data={
          {
            labels: ['Start', 'Peak', "End"],
            datasets: [{
              data: [0, degreeDay, 0]
            }],

          }
        }





      />
    </div>
  );
}

export default App;
