import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import './Statistike.css';

const Statistike = () => {
  const [statistike, setStatistike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistike = async () => {
      try {
        const token = sessionStorage.getItem('token');  
        const response = await axios.get('http://127.0.0.1:8000/api/admin/statistike', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStatistike(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch statistike. Please try again later.');
        setLoading(false);
      }
    };

    fetchStatistike();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const kategorijeData = statistike.broj_usluga_po_kategorijama.map(kategorija => ({
    name: `Tip ${kategorija.tip_usluge_id}`,
    broj: kategorija.ukupno,
  }));

  const korisniciData = [
    { name: 'Traži', value: statistike.broj_korisnika_sa_tipom_trazi },
    { name: 'Nudi', value: statistike.broj_korisnika_sa_tipom_nudi }
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="statistike-container">
      <h2>Statistike</h2>
      <div className="chart-container">
        <div className="chart">
          <h3>Broj korisnika:</h3>
          <PieChart width={400} height={400} className="pie-chart">
            <Pie
              data={korisniciData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {korisniciData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="chart">
          <h3>Broj usluga po kategorijama:</h3>
          <BarChart width={600} height={300} className="bar-chart" data={kategorijeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="broj" fill="#0088FE" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Statistike;
