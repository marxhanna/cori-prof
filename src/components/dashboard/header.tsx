import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import classes from '../../assets/icons/class.png';
import calendar from '../../assets/icons/calendar.png';
import student from '../../assets/icons/student.png';
import { DatePicker, Select } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const App: React.FC = () => {
  const [classOptions, setClassOptions] = useState<{ value: any; label: any; }[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch('https://back-end-cori-cases.opatj4.easypanel.host/classes', options)
      .then(response => response.json())
      .then(response => {
        const newClassOptions = response.class.map((item: { class: { code: any; name: any; }; }) => ({
          value: item.class.code,
          label: item.class.name,
        }));
        setClassOptions(newClassOptions);
      })
      .catch(err => console.error(err));
  }, [authToken]);

  const filterStyle = {
    backgroundColor: '#f2f2fe',
    border: 'none',
  };

  return (
    <>
      <h1 className='dashboardH1'>Dashboards</h1>
      <div className='dashboardHeader'>
        <div className='dashboardFilters'>
          <div className='filter'>
            <img src={calendar} alt="Calendar" />
            <RangePicker
              defaultValue={[dayjs('01/01/2024', dateFormat), dayjs('01/01/2024', dateFormat)]}
              format={dateFormat}
              style={filterStyle}
            />
          </div>
          <div className='filter'>
            <img src={classes} alt="Classes" />
            <Select
              defaultValue="Selecione a turma"
              size='large'
              style={{ width: 250, ...filterStyle }}
              id="turma"
              options={classOptions}
              onChange={(value) => setSelectedClass(value)}
            />
          </div>
          <div className='filter'>
            <img src={student} alt="Student" />
            <Select
              defaultValue="Todos"
              className="borderless"
              style={filterStyle}
            >
              <Option value="todos">Todos</Option>
              <Option value="aluno1">Aluno 1</Option>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;