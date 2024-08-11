import React, { useState } from 'react';
import { Modal, Input, notification } from 'antd';
import coriLogo from '../../assets/images/cori-logo.png';
import loadingSpinner from '../../assets/loading.gif';

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email: username, password: password })
    };

    fetch('https://back-end-cori-cases.opatj4.easypanel.host/user/login', options)
      .then(response => response.json())
      .then(response => {
        
        localStorage.setItem('authToken', response);
        setIsLoading(false);
        window.location.href = "../dashboard";
  
      })
      .catch(err => {
        setIsLoading(false);
        console.error(err);
        alert("orra gay ta tentando me hackear ai..");
      });
  }

  return (
    <>
      <div className='loginForm' style={{ marginLeft: "5%", width: "30%" }}>
        <img src={coriLogo} alt="Cori Logo" />
        <br/><br/>
        <div>
          <label>Login</label><br/>
          <input type="text" id="username" name="username" placeholder="E-mail" required onChange={e => setUsername(e.target.value)} />
        </div>

        <div>
          <label>Senha</label><br/>
          <input type="password" id="password" name="password" placeholder="Senha" required onChange={e => setPassword(e.target.value)} />
        </div>

        <div style={{ display: "flex", marginTop: "3%", marginBottom: "3%" }}>
          <div>
            <a href="#">Esqueci minha senha</a>
          </div>
        </div>

        <div>
          <button onClick={userLogin}>Login</button>
        </div>

      </div>

      <Modal
        visible={isLoading}
        closable={false}
        footer={null}
        centered
        maskClosable={false}
        destroyOnClose
      >
        <div style={{ textAlign: 'center' }}>
          <img src={loadingSpinner} alt="Loading..." />
          <p>Carregando...</p>
        </div>
      </Modal>
    </>
  );
}

export default App;