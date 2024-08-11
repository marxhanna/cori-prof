import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const App: React.FC = () => (
  <>
    <h1 className='dashboardH1'>Turmas</h1>
    <div className='dashboardHeader'>
      <Input placeholder="Pesquisar" prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} variant="filled" style={{ width: 354 }} />
      <div className='classButtons' style={{ marginRight: "5%" }}>
        <button style={{ flexShrink: 0, width: "70%" }}>Importar Casos</button>
        <Link to='/create-class' style={{ flexShrink: 0, width: "100%" }}><button className='purpleBtn'>Nova Turma</button></Link>
      </div>
    </div>
  </>
);

export default App;