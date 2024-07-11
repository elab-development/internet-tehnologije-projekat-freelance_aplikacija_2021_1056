import React, { useState } from 'react';
import axios from 'axios';
import './Usluga.css';

const Usluga = ({ usluga, convertPrice, currency, loggedInUserId }) => {
  const [opis, setOpis] = useState('');
  const [cena, setCena] = useState('');
  const [cv, setCv] = useState(null);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handlePonudaSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    const formData = new FormData();
    formData.append('usluga_id', usluga.id);
    formData.append('opis', opis);
    formData.append('cena', cena);
    formData.append('cv', cv);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/ponude', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to create offer. Please try again.');
    }
  };

  return (
    <div className="usluga">
      <h2>{usluga.naziv}</h2>
      <p>{usluga.opis}</p>
      <p>Cena: {convertPrice(usluga.cena)} {currency}</p>
      <p>Grad: {usluga.grad}</p>
      <p>Adresa: {usluga.adresa}</p>
       

      {usluga.user_prodaje_id !== parseInt(sessionStorage.getItem("loggedInUserId")) && (
        <>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Zatvori Ponudu' : 'Dodaj Ponudu'}
          </button>
          {showForm && (
            <form onSubmit={handlePonudaSubmit} className="ponuda-form">
              <h3>Dodaj Ponudu</h3>
              <textarea
                placeholder="Opis"
                value={opis}
                onChange={(e) => setOpis(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Cena"
                value={cena}
                onChange={(e) => setCena(e.target.value)}
                required
              />
              <input
                type="file"
                onChange={(e) => setCv(e.target.files[0])}
                required
              />
              <button type="submit">Dodaj Ponudu</button>
            </form>
          )}
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Usluga;
