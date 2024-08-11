import React from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'antd';
import Header from '../../../components/case-library/header';
import Subject from '../../../components/case-library/subject';

export default function Classes() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const faculdade = decodeURIComponent(pathParts[pathParts.length - 1]);

  const themes = [
    { value: 'anatomia', label: 'Anatomia' },
    { value: 'anestesiologia', label: 'Anestesiologia' },
    { value: 'bioquimica', label: 'Bioquímica' },
    { value: 'cardiologia', label: 'Cardiologia' },
    { value: 'cirurgia', label: 'Cirurgia' },
    { value: 'clinica_medica', label: 'Clínica médica' },
    { value: 'dermatologia', label: 'Dermatologia' },
    { value: 'emergencia', label: 'Emergência' },
    { value: 'endocrinologia', label: 'Endocrinologia' },
    { value: 'farmacologia', label: 'Farmacologia' },
    { value: 'fisiologia', label: 'Fisiologia' },
    { value: 'genetica', label: 'Genética' },
    { value: 'geriatria', label: 'Geriatria' },
    { value: 'ginecologia', label: 'Ginecologia' },
    { value: 'hematologia', label: 'Hematologia' },
    { value: 'imunologia', label: 'Imunologia' },
    { value: 'medicina_preventiva', label: 'Medicina preventiva' },
    { value: 'microbiologia', label: 'Microbiologia' },
    { value: 'nefrologia', label: 'Nefrologia' },
    { value: 'neurologia', label: 'Neurologia' },
    { value: 'obstetricia', label: 'Obstetrícia' },
    { value: 'oftalmologia', label: 'Oftalmologia' },
    { value: 'oncologia', label: 'Oncologia' },
    { value: 'ortopedia', label: 'Ortopedia' },
    { value: 'otorrinolaringologia', label: 'Otorrinolaringologia' },
    { value: 'patologia', label: 'Patologia' },
    { value: 'pediatria', label: 'Pediatria' },
    { value: 'psiquiatria', label: 'Psiquiatria' },
    { value: 'radiologia', label: 'Radiologia' },
    { value: 'reumatologia', label: 'Reumatologia' },
  ]

  return (
    <div className='page'>
      <div className='pageContent'>
        <Header faculdade={faculdade} />
        <div className='class'>
          <Row gutter={16}>
            {themes.map((classItem, index) => (
              <Col span={5} key={index}>
                <Subject title={classItem.label} nome={faculdade} tema={classItem.label} foto={classItem.value} />
              </Col>
            ))}
          </Row>
          <br />
        </div>
      </div>
    </div>
  );
}