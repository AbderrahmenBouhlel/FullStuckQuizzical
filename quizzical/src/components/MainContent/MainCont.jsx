import React from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { FaUserLock } from 'react-icons/fa';
import { CiLogin } from 'react-icons/ci';

import './MainCss/main.css'
import Logo from '../logo/logo';


export default function MainContent(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate('/login');
  };
  const handleSignUp = () =>{
    navigate('/signup')
  }
 
  return (
    <nav className="nav">
      <Logo/>
      <div className="nav_links">
        {location.pathname == "/signup" ? 
          <div className="iconCont loginCont" onClick={handleLogin}>
          <CiLogin className="icon" />
          </div>
          :
          <div className="iconCont signupCont" onClick={handleSignUp}>
            <FaUserLock className="icon" />
          </div>

        }
       
        
        
      </div>
    </nav>
  );
}

