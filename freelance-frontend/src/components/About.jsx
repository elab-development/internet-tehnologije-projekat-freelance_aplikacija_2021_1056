import React from 'react';
import useTipoviUsluga from './hooks/useTipoviUsluga';
import '../CSS/About.css';
import Footer from './Footer';

const About = () => {
  const tipoviUsluga = useTipoviUsluga('http://127.0.0.1:8000/api/tipovi_usluga');
  console.log('Podaci o tipovima usluga:', tipoviUsluga);

  if (!tipoviUsluga) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="about">
        <div className='about-text'>
            <h2>Opis aplikacije </h2>
            <p>Naša aplikacija pruža korisnicima mogućnost pregleda različitih tipova 
                usluga koje su dostupne. Korisnici mogu istraživati širok spektar usluga, 
                bilo da traže privatne časove, popravku elektronike, ili usluge vezane za 
                društvene mreže. Aplikacija omogućava korisnicima jednostavan pregled, 
                pretragu i pristup informacijama o ponuđenim uslugama.</p>
        </div>
        <div className='lista-tipova'>
      <h2>Tipovi Usluga</h2>
      <ul>
        {tipoviUsluga.map(tip => (
          <li key={tip.id}>
            <strong>{tip.naziv}</strong>
          </li>
        ))}
      </ul>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default About;