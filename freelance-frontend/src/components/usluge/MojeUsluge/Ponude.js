import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ponude.css';

const Ponude = ({ uslugaId, closeDetails }) => {
  const [ponude, setPonude] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPonude = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/usluge/${uslugaId}/ponude`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPonude(response.data.ponude);
        setLoading(false);
      } catch (err) {
        setError('An error occurred. Please try again later.');
        setLoading(false);
      }
    };

    fetchPonude();
  }, [uslugaId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="ponude">
      <button onClick={closeDetails}>Zatvori</button>
      <h2>Ponude za Uslugu {uslugaId}</h2>
      <table className="ponude-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Opis</th>
            <th>Cena</th>
            <th>Fajlovi</th>
            <th>Korisnik</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {ponude.map((ponuda) => (
            <tr key={ponuda.id}>
              <td>{ponuda.id}</td>
              <td>{ponuda.opis}</td>
              <td>{ponuda.cena}</td>
              <td><a href={ponuda.cv_url} target="_blank" rel="noopener noreferrer">Preuzmi fajlove</a></td>
              <td>{ponuda.user.name}</td>
              <td>{ponuda.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ponude;
