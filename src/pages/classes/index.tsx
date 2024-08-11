import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Menu from '../../components/lateral-menu';
import Header from '../../components/classes/header';
import Class from '../../components/classes/class';

export default function Classes() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getClasses();
  }, []);

  function getClasses() {
    const authToken = localStorage.getItem('authToken');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch('https://back-end-cori-cases.opatj4.easypanel.host/classes', options)
      .then(response => response.json())
      .then(response => setClasses(response.class))
      .catch(err => console.error(err));
  }

  return (
    <>
      <div className='page'>
        <div className='pageContent'>
          <Header />
          <div className='class'>
            <Row gutter={25}>
              {classes.map((classItem, index) => (
                <Col span={10} key={index}>
                  <Class title={classItem.class.name} code={classItem.class.code} foto={classItem.class.image} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}