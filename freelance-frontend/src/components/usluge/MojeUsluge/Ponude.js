import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ponude.css';

const Ponude = ({ uslugaId, closeDetails }) => {
  const [ponude, setPonude] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredPonude = ponude
    .filter(ponuda => 
      ponuda.opis.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ponuda.user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ponuda.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.cena - b.cena;
      } else {
        return b.cena - a.cena;
      }
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="ponude">
      <button onClick={closeDetails}>Zatvori</button>
      <h2>Ponude za Uslugu {uslugaId}</h2>
      
      <div className="ponude-controls">
        <input 
          type="text" 
          placeholder="Pretraži ponude..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
          className="search-input"
        />
        <select value={sortOrder} onChange={handleSortOrderChange} className="sort-select">
          <option value="asc">Cena rastuće</option>
          <option value="desc">Cena opadajuće</option>
        </select>
      </div>

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
          {filteredPonude.map((ponuda) => (
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
