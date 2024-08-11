import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import loginImg from '../../assets/images/login-page.png';
import Login from '../../components/login/loginForm';

export default function Inicio() {
  const navigate = useNavigate(); // Cria uma instância do hook useNavigate

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/dashboard'); // Redireciona para /dashboard se authToken estiver presente
    }
  }, [navigate]);

  return (
    <div className='login' style={{ backgroundColor: "#f2f2fe", width: "100vw", height: "100vh" }}>
      <img src={loginImg} style={{ height: "100vh" }} className="imagem-mobile" />
      <Login />
    </div>
  );
}
