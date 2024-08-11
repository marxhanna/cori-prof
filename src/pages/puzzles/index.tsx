import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Col, Row } from 'antd';
import Menu from '../../components/lateral-menu';
import Header from '../../components/puzzles/header'
import Puzzle from '../../components/puzzles/puzzle'

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("Todas as turmas");

  useEffect(() => {
    getClasses();
  }, [selectedClass]);

  function getClasses() {
    const authToken = localStorage.getItem('authToken');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    fetch('https://back-end-cori-cases.opatj4.easypanel.host/puzzles/find', options)
      .then(response => response.json())
      .then(data => {
        if (selectedClass === "Todas as turmas") {
          setClasses(data);
        } else {
          setClasses(data.filter(classItem => classItem.classId === selectedClass));
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <>
      <div className='page'>
        <div className='pageContent'>
          <Header onClassChange={setSelectedClass} />
          <div className='class'>
            <Row gutter={25}>
              {classes.map((classItem, index) => (
                <Col span={10} key={index}>
                  <Puzzle title={classItem.title} code={classItem.uuid} foto={classItem.image} />
                  <br/>
                </Col>
              ))}
            </Row>
            <br />
          </div>
        </div>
      </div>

    </>
  )
}