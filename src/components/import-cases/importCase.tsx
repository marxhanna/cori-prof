import React from 'react';
import { Input, Select } from 'antd';


const App: React.FC = () => (
  <>

    <div className='createForm'>
      <br/>
      <br/>
      <div className='turmas'>
        <div className='turmaExportadora'>
          <p>Turma Exportadora</p>
          <Select
            size="large"
            defaultValue="Turmas"
            style={{ width: 270 }}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
            ]}
          />
        </div>
        <div className='turmaExportadora'>
          <p>Turma Receptora</p>
          <Select
            size="large"
            defaultValue="Turmas"
            style={{ width: 270 }}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
            ]}
          />
        </div>
      </div>
      <div className='campo'>
        <div className='turmaExportadora'>
          <p>Casos Existentes</p>
          <Select
            size="large"
            defaultValue="Casos"
            style={{ width: 610 }}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
            ]}
          />
        </div>
      </div>
      <br/><br/>
      <button className='btnPink'>Importar Casos</button>
    </div>
  </>
);

export default App;