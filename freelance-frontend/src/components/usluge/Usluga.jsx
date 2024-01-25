import React from 'react';
import './Usluga.css'; 

const Usluga = ({ usluga }) => {
 
  return (
    <div className="usluga">
     <h2>{usluga.naziv}</h2>
      <p>{usluga.opis}</p>
      <p>Cena: {usluga.cena} RSD</p>
      <p>Grad: {usluga.grad}</p>
      <p>Adresa: {usluga.adresa}</p>

    </div>
  );
};

export default Usluga;