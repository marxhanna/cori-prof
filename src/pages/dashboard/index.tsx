import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import Header from '../../components/dashboard/header';
import Statistic from '../../components/dashboard/statistic';
import Count from '../../components/dashboard/count';
import diagnostico from '../../assets/icons/Dashboard/diagnostico.png';
import prescricao from '../../assets/icons/Dashboard/prescricao.png';
import exame from '../../assets/icons/Dashboard/exame.png';
import casos from '../../assets/icons/Dashboard/casosResolvidos.png';
import raciocinio from '../../assets/icons/Dashboard/raciocinio.png';
import puzzle from '../../assets/icons/Dashboard/puzzles.png';

export default function Inicio() {
  const authToken = localStorage.getItem('authToken');
  const [statistics, setStatistics] = useState({
    rightAnswersPerTag: {
      diagnostico: 0,
      prescricao: 0,
      exame: 0,
    },
    countCases: 0,
    clinicalReasoning: 0,
  });

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    fetch('https://back-end-cori-cases.opatj4.easypanel.host/dashboard', options)
      .then(response => response.json())
      .then(response => setStatistics({
        rightAnswersPerTag: {
          diagnostico: response.rightAnswersPerTag?.diagnostico || 0,
          prescricao: response.rightAnswersPerTag?.prescricao || 0,
          exame: response.rightAnswersPerTag?.exame || 0,
        },
        countCases: response.countCases || 0,
        clinicalReasoning: response.clinicalReasoning || 0,
      }))
      .catch(err => console.error(err));
  }, [authToken]);

  const formatStat = (value) => {
    if (value === 0) return value;
    return Number.isInteger(value) ? value : value.toFixed(1);
  };

  const calculatePercentage = (part, total) => {
    if (total === 0) return 0;
    const percentage = (part / total) * 100;
    return formatStat(percentage);
  };

  return (
    <div className='pageContent'>
      <Header />
      <div className='class'>
        <h3>Taxas de acerto</h3>
        <Row gutter={25}>
          <Col>
            <Statistic 
              tema="Diagnóstico" 
              temaImg={diagnostico} 
              statistic={calculatePercentage(statistics.rightAnswersPerTag.diagnostico, statistics.countCases)} 
              color={"#6B4CF2"} 
            />
          </Col>
          <Col>
            <Statistic 
              tema="Prescrição" 
              temaImg={prescricao} 
              statistic={calculatePercentage(statistics.rightAnswersPerTag.prescricao, statistics.countCases)} 
              color={"#6B4CF2"} 
            />
          </Col>
          <Col>
            <Statistic 
              tema="Exame" 
              temaImg={exame} 
              statistic={calculatePercentage(statistics.rightAnswersPerTag.exame, statistics.countCases)} 
              color={"#6B4CF2"} 
            />
          </Col>
          <Col>
            <Statistic 
              tema="Raciocínio Clínico" 
              temaImg={raciocinio} 
              statistic={formatStat(statistics.clinicalReasoning)} 
              color={"#6B4CF2"} 
            />
          </Col>
        </Row>

        <h3>Resolvidos</h3>
        <Row gutter={25}>
          <Col>
            <Count 
              tema="Puzzles Resolvidos" 
              temaImg={puzzle} 
              statistic={formatStat(statistics.countCases)} 
              color={"#CBA135"} 
            />
          </Col>
          <Col>
            <Count 
              tema="Casos Resolvidos" 
              temaImg={casos} 
              statistic={formatStat(statistics.countCases)} 
              color={"#6B4CF2"} 
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}