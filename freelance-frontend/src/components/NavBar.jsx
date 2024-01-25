import { Link } from 'react-router-dom';
import '../CSS/NavBar.css';
import { useNavigate } from 'react-router-dom';

function NavBar({ loggedInUser, handleLogout, search }) {

    const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
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
                  <Link to='/welcome'>Home Page </Link>
                </li>
                <li className="nav__item">
                  <Link to='/objects'>Services </Link>
                </li>
                <li className="nav__item">
                  <Link to='/about'>About </Link>
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