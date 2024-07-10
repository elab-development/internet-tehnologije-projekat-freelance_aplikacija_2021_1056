import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyUsluge.css';

const MyUsluge = () => {
  const [usluge, setUsluge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsluge = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/moje-usluge', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsluge(response.data.usluge);
        setLoading(false);
      } catch (err) {
        setError('An error occurred. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsluge();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-usluge">
      <h2>Moje Usluge</h2>
      <table className="usluge-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Grad</th>
            <th>Adresa</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          {usluge.map((usluga) => (
            <tr key={usluga.id}>
              <td>{usluga.id}</td>
              <td>{usluga.naziv}</td>
              <td>{usluga.opis}</td>
              <td>{usluga.grad}</td>
              <td>{usluga.adresa}</td>
              <td>{usluga.cena}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyUsluge;
