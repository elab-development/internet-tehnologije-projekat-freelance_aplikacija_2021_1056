# FREELANCE APLIKACIJA
Aplikacija omogućava korisnicima da pretražuju, nude i traže različite usluge, prate statistike aktivnosti, i koriste specifične funkcionalnosti u zavisnosti od uloge. Korisnici mogu dodavati, izmenjivati i brisati usluge, uneti detalje kao što su naziv, opis, cena, grad, adresa i tip usluge, te dodavati nove kategorije. Pretraga i filtriranje usluga prema nazivu, paginacija, i izbor valute koristeći aktuelne kurseve valuta su dostupni. Korisnici mogu dodavati ponude za usluge, unoseći opis, cenu i prilažući CV, te pregledati i sortirati ponude. Administratori mogu pratiti statistike korisnika i usluga putem grafova. Registracija korisnika je jednostavna, omogućavajući pristup funkcionalnostima prema ulozi.

# PREUZIMANJE 

    git clone https://github.com/elab-development/internet-tehnologije-projekat-freelance_aplikacija_2021_1056.git
    cd freelance-aplikacija
    composer install 
    cp .env.example .env
    php artisan key:generate
    php artisan migrate:fresh --seed
    php artisan serve

    cd freelance-frontend
    npm install
    npm start
