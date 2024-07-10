import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyUsluge.css';

const MyUsluge = () => {
  const [usluge, setUsluge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [grad, setGrad] = useState('');
  const [adresa, setAdresa] = useState('');
  const [cena, setCena] = useState('');
  const [tipUslugeId, setTipUslugeId] = useState('');
  const [editingId, setEditingId] = useState(null);

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

  const handleAddUsluga = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/okaciOglasZaProdaju', {
        naziv, opis, grad, adresa, cena, tip_usluge_id: tipUslugeId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsluge([...usluge, response.data]);
      setNaziv('');
      setOpis('');
      setGrad('');
      setAdresa('');
      setCena('');
      setTipUslugeId('');
    } catch (err) {
      setError('Failed to add usluga. Please try again later.');
    }
  };

  const handleUpdateUsluga = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(`http://127.0.0.1:8000/api/usluge/${id}`, {
        naziv, opis, grad, adresa, cena, tip_usluge_id: tipUslugeId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsluge(usluge.map(usluga => usluga.id === id ? response.data : usluga));
      setEditingId(null);
      setNaziv('');
      setOpis('');
      setGrad('');
      setAdresa('');
      setCena('');
      setTipUslugeId('');
    } catch (err) {
      setError('Failed to update usluga. Please try again later.');
    }
  };

  const handleDeleteUsluga = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/usluge/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsluge(usluge.filter(usluga => usluga.id !== id));
    } catch (err) {
      setError('Failed to delete usluga. Please try again later.');
    }
  };

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
            <th>Akcije</th>
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
              <td>
                <button onClick={() => {
                  setEditingId(usluga.id);
                  setNaziv(usluga.naziv);
                  setOpis(usluga.opis);
                  setGrad(usluga.grad);
                  setAdresa(usluga.adresa);
                  setCena(usluga.cena);
                  setTipUslugeId(usluga.tip_usluge_id);
                }}>Izmeni</button>
                <button onClick={() => handleDeleteUsluga(usluga.id)}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="usluga-form">
        <h3>{editingId ? 'Izmeni Uslugu' : 'Dodaj Uslugu'}</h3>
        <input
          type="text"
          placeholder="Naziv"
          value={naziv}
          onChange={(e) => setNaziv(e.target.value)}
        />
        <input
          type="text"
          placeholder="Opis"
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grad"
          value={grad}
          onChange={(e) => setGrad(e.target.value)}
        />
        <input
          type="text"
          placeholder="Adresa"
          value={adresa}
          onChange={(e) => setAdresa(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cena"
          value={cena}
          onChange={(e) => setCena(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tip Usluge ID"
          value={tipUslugeId}
          onChange={(e) => setTipUslugeId(e.target.value)}
        />
        <button onClick={editingId ? () => handleUpdateUsluga(editingId) : handleAddUsluga}>
          {editingId ? 'Izmeni' : 'Dodaj'}
        </button>
      </div>
    </div>
  );
};

export default MyUsluge;
