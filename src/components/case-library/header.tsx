import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classes from '../../assets/icons/class.png';
import uni from '../../assets/icons/university.png';

interface AppProps {
  faculdade?: string;
}

const App: React.FC<AppProps> = ({ faculdade, tema }) => (
  <>
    <h1 className='dashboardH1'>Biblioteca</h1>
    <div className='caseLibraryHeader'>
      <div className='schoolName'>
        {faculdade && <p>{faculdade} - {tema}</p>}
      </div>
      <br />
      <Input
        placeholder="Pesquisar"
        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        variant="filled"
        style={{ width: 354, marginLeft: "4.2%" }}
      />
    </div>
  </>
);

export default App;
