import React, { useEffect } from 'react';
import { Flex, Layout } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Routes, Route, Outlet } from 'react-router-dom'; // Importe as novas dependências do React Router v6
import dashboard from '../assets/icons/dashboard.png';
import classes from '../assets/icons/classes.png';
import cases from '../assets/icons/cases.png';
import puzzles from '../assets/icons/puzzles.png';
import library from '../assets/icons/books.png';
import foto from '../assets/Profile.png';
import { LogoutOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  textAlign: 'left',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'black',
  padding: '25% 5% 5% 5%',
  height: '75vh',
};

async function getUser() {
  const authToken = localStorage.getItem('authToken');
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  };

  try {
    const response = await fetch('https://back-end-cori-cases.opatj4.easypanel.host/user', options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();
    const nameElement = document.getElementById('name');
    const email = document.getElementById('email');
    if (nameElement) {
      nameElement.innerHTML = user.name;
    }
    if (email) {
      email.innerHTML = user.email;
    }
    localStorage.setItem('profName', user.name);
  } catch (err) {
    console.error(err);
  }
}

function logout() {
  localStorage.removeItem('authToken');
  window.location.href = '/';
}

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='page'>
      <Flex gap="middle" wrap>
        <Sider width="20vw" style={siderStyle}>
          <div className="teacher">
            <img src={foto} alt="Foto do Perfil" />
            <h1 className="teacherName" id='name'></h1>
            <p className="teacherEmail" id='email'></p>
          </div>
          <div className="sideButtons">
            <Link to="/dashboard"><div className={`button ${location.pathname === '/dashboard' ? 'active' : ''}`} id='dashboard'><img src={dashboard} alt="Dashboard" />Dashboards</div></Link>
            <Link to="/classes"><div className={`button ${location.pathname === '/classes' ? 'active' : ''}`} id='classes'><img src={classes} alt="Turmas" />Turmas</div></Link>
            <Link to="/cases"><div className={`button ${location.pathname === '/cases' ? 'active' : ''}`} id='cases'><img src={cases} alt="Casos" />Casos</div></Link>
            <Link to="/puzzles"><div className={`button ${location.pathname === '/puzzles' ? 'active' : ''}`} id='puzzles'><img src={puzzles} alt="Puzzles" />Puzzles</div></Link>
            <Link to="/library"><div className={`button ${location.pathname === '/library' ? 'active' : ''}`} id='library'><img src={library} alt="Library" />Biblioteca</div></Link>
          </div>
          <div>
            <button style={{ border: "none", background: "none", color: "white", fontSize: '17px', cursor: 'pointer' }} onClick={logout}><LogoutOutlined /> Sair</button>
          </div>
        </Sider>
      </Flex>
      <div className='pageContent'>
        <Outlet />
      </div>
    </div>
  );
};

export default App;