import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Usluga from './Usluga';
import './Usluge.css';
import useUsluge from '../hooks/useUsluge';
import Footer from '../Footer';

const Usluge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('RSD');
  const [exchangeRates, setExchangeRates] = useState({});
  const uslugePerPage = 3;

  const usluge = useUsluge('http://127.0.0.1:8000/api/usluge');
  console.log('Podaci o uslugama:', usluge);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/RSD');
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1);
    setSearchQuery(searchTerm);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const convertPrice = (price) => {
    if (!exchangeRates[currency]) return price;
    return (price * exchangeRates[currency]).toFixed(2);
  };

  const filteredUsluge = usluge.filter(usluga =>
    usluga.naziv.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUsluga = currentPage * uslugePerPage;
  const indexOfFirstUsluga = indexOfLastUsluga - uslugePerPage;
  const currentUsluge = filteredUsluge.slice(indexOfFirstUsluga, indexOfLastUsluga);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="usluge">
        <div className='usluge-search'>
          <input
            type="text"
            placeholder="Pretraži usluge..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button onClick={handleSearchSubmit} className="search-button">Pretraži</button>
          <button onClick={handleResetSearch} className="reset-button">Resetuj pretragu</button>
        </div>
        <div className='currency-selector'>
          <label htmlFor="currency">Odaberi valutu: </label>
          <select id="currency" value={currency} onChange={handleCurrencyChange}>
            {Object.keys(exchangeRates).map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencyCode}
              </option>
            ))}
          </select>
        </div>
        <div className='usluge-section'>
          {currentUsluge.length > 0 ? (
            currentUsluge.map(usluga => (
              <Usluga key={usluga.id} usluga={usluga} convertPrice={convertPrice} currency={currency} />
            ))
          ) : (
            <div>Nema dostupnih usluga.</div>
          )}
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredUsluge.length / uslugePerPage) }).map((_, index) => (
            <button key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
        <div className="navigation-buttons">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Nazad
          </button>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredUsluge.length / uslugePerPage)}>
            Napred
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Usluge;
