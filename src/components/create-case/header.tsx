import React from 'react';
import { Link } from 'react-router-dom';

const App: React.FC = () => (
  <>

    <div className='dashboardHeader' style={{ alignItems: 'flex-end' }}>
      <h1 className='dashboardH1' style={{ margin: 0 }}>Novo Caso</h1>
      <Link to="/case-library/select-uni" style={{ flexShrink: 0, width: "20%" }}><button style={{ backgroundColor: "#7F7BFF" }}>Biblioteca de Casos</button></Link>
    </div>
  </>
);

export default App;