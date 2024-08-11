import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Header from '../../../components/case-library/header';
import Uni from '../../../components/case-library/unis';

interface Universidade {
  uuid: string;
  name: string;
  profilePicture: string;
}

export default function Classes() {
  const [universidades, setUniversidades] = useState<Universidade[]>([]);

  useEffect(() => {
    // Remove o item do localStorage quando o componente é montado
    localStorage.removeItem('uniUUID');

    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'insomnia/9.2.0',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZmEyMzZhN2UtMjI2Yy00OGE5LWI3ODktYThiYTkzZDRkMzc0IiwiaWF0IjoxNzIxMzEzMDk3fQ.D1QgI8gXtdFbJ2RrUdiNpU3ihLJFQJHjVqAfLswbM9I'
      }
    };

    fetch('https://back-end-cori-cases.opatj4.easypanel.host/library', options)
      .then(response => response.json())
      .then(response => setUniversidades(response))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='page'>
      <div className='pageContent'>
        <Header />
        <div className='class'>
          <Row gutter={16}>
            {universidades.map(uni => (
              <Col span={8} key={uni.uuid}>
                <Uni 
                  nome={uni.name} 
                  foto={`https://back-end-cori-cases.opatj4.easypanel.host/uploads/${uni.profilePicture}`} 
                  uuid={uni.uuid} 
                />
              </Col>
            ))}
          </Row>
          <br/>
        </div>
      </div>
    </div>
  );
}