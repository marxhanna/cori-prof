import React, { useState, useEffect } from 'react';
import classes from '../../assets/icons/class.png';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

type HeaderProps = {
  onClassChange: (value: string) => void;
};

const Header: React.FC<HeaderProps> = ({ onClassChange }) => {
  const authToken = localStorage.getItem('authToken');

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  };

  const [classOptions, setClassOptions] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState("Todas as turmas");

  useEffect(() => {
    fetch('https://back-end-cori-cases.opatj4.easypanel.host/classes', options)
      .then(response => response.json())
      .then(response => {
        const newClassOptions = response.class.map((item: { class: { id: any; name: any; }; }) => ({
          value: item.class.id,
          label: item.class.name,
        }));
        setClassOptions(newClassOptions);
      })
      .catch(err => console.error(err));
  }, []);

  const handleClassChange = value => {
    setSelectedClass(value);
    onClassChange(value);
  };

  return (
    <>
      <h1 className='dashboardH1'>Casos</h1>
      <div className='dashboardHeader'>
        <div>
          <div className='filter'>
            <img src={classes} />
            <Select defaultValue="Todas as turmas" className="borderless" options={classOptions} onChange={handleClassChange}/>
          </div>
          <br/>
          <Input placeholder="Pesquisar" prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} variant="filled" style={{ width: 354 }} />
        </div>
        <div className='classButtons'>
          <Link to="/create-case" style={{ flexShrink: 0, width: "60%" }}><button>Novo Caso</button></Link>
          <button className='purpleBtn'>Visão Aluno</button>
        </div>
      </div>
    </>
  );
}

export default Header;