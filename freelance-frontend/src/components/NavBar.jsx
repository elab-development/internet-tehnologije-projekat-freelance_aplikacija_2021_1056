import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/NavBar.css';

function NavBar({ loggedInUser, handleLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    const token = sessionStorage.getItem('token');

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Perform the local logout operations
      handleLogout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error, e.g., show a message to the user
    }
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav__title">
          <h1>FREELANCE APP</h1>
        </div>
        <ul className="nav__list">
          {loggedInUser ? (
            <>
              <li className="nav__item">
                <Link to="/welcome">Home Page </Link>
              </li>
              <li className="nav__item">
                <Link to="/usluge">Services </Link>
              </li>
              <li className="nav__item">
                <Link to="/about">About </Link>
              </li>
              <li className="nav__item">
                <Link to="/mojeUsluge">Moje usluge </Link>
              </li>
              <li className="nav__item">
                {loggedInUser}{' '}
                <button className="logout-button" onClick={handleLogoutClick}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav__item">
              <Link to="/">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
