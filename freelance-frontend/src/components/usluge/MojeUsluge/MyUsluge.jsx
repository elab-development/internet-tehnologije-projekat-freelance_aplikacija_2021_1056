import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './MyUsluge.css';
import useTipoviUsluga from '../../hooks/useTipoviUsluga';
import Ponude from './Ponude';
 

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
  const [novaKategorija, setNovaKategorija] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUslugaId, setSelectedUslugaId] = useState(null);
  const tipoviUsluga = useTipoviUsluga('http://127.0.0.1:8000/api/tipovi_usluga');

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
      const response = await axios.post('http://127.0.0.1:8000/api/usluge/okaciOglasZaProdaju', {
        naziv, opis, grad, adresa, cena, tip_usluge_id: tipUslugeId, nova_kategorija: novaKategorija
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsluge([...usluge, response.data]);
      resetForm();
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
      resetForm();
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

  const resetForm = () => {
    setNaziv('');
    setOpis('');
    setGrad('');
    setAdresa('');
    setCena('');
    setTipUslugeId('');
  };

  const handleShowDetails = (id) => {
    setSelectedUslugaId(id);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedUslugaId(null);
    setShowDetails(false);
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
                <button onClick={() => handleShowDetails(usluga.id)}>Detalji</button>
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
        <select value={tipUslugeId} onChange={(e) => setTipUslugeId(e.target.value)}>
          <option value="">Izaberi Tip Usluge</option>
          {tipoviUsluga.map(tip => (
            <option key={tip.id} value={tip.id}>
              {tip.naziv}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nova Kategorija (ako ne postoji)"
          value={novaKategorija}
          onChange={(e) => setNovaKategorija(e.target.value)}
        />
        <button onClick={editingId ? () => handleUpdateUsluga(editingId) : handleAddUsluga}>
          {editingId ? 'Izmeni' : 'Dodaj'}
        </button>
      </div>

      {showDetails && (
        <div className="details-modal">
          <Ponude uslugaId={selectedUslugaId} closeDetails={handleCloseDetails} />
        </div>
      )}
    </div>
  );
};

export default MyUsluge;
