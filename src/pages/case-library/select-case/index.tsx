import React, { useEffect, useState } from 'react';
import { Col, Row, Alert, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../components/case-library/header';
import Case from '../../../components/case-library/case';
import Puzzle from '../../../components/case-library/puzzle';

interface Tag {
  id: number;
  name: string;
}

interface ClassItem {
  title: string;
  uuid: string;
  image: string;
  tags?: Tag[]; // tags são opcionais para puzzles
}

interface PuzzleItem {
  id: number;
  uuid: string;
  title: string;
  image: string;
  questions: {
    id: number;
    uuid: string;
    content: string;
  }[];
  class: {
    id: number;
    name: string;
  };
}

export default function Classes() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [puzzles, setPuzzles] = useState<PuzzleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'case' | 'puzzle'>('case');

  const location = useLocation();
  const navigate = useNavigate(); // Atualizado de useHistory para useNavigate
  const pathParts = location.pathname.split('/');
  const faculdade = decodeURIComponent(pathParts[pathParts.length - 2]);
  const tema = decodeURIComponent(pathParts[pathParts.length - 1]);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const uniUUID = localStorage.getItem('uniUUID');
    if (!uniUUID) {
      console.error('No university UUID found in localStorage');
      navigate('/library'); // Atualizado para navigate
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const url =
        selectedType === 'case'
          ? `https://back-end-cori-cases.opatj4.easypanel.host/library/cases/${uniUUID}`
          : 'https://back-end-cori-cases.opatj4.easypanel.host/puzzles/find/';

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (selectedType === 'case') {
          const updatedClasses = data.map((classItem: any) => ({
            ...classItem,
            tags: classItem.tags.map((tag: any) => ({ id: tag.id, name: tag.name })) // Correção para tags
          }));
          setClasses(updatedClasses);
        } else {
          setPuzzles(data);
        }
      } catch (err) {
        console.error(err);
        setError(`Failed to load ${selectedType}s.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedType, authToken, navigate]); // Atualizado para usar navigate

  return (
    <div className="page">
      <div className="pageContent">
        <Header tema={tema} faculdade={faculdade} />
        <div className="class">
          <div style={{ marginBottom: 16 }}>
            <Button
              type={selectedType === 'case' ? 'primary' : 'default'}
              onClick={() => setSelectedType('case')}
            >
              Casos
            </Button>
            <Button
              type={selectedType === 'puzzle' ? 'primary' : 'default'}
              onClick={() => setSelectedType('puzzle')}
              style={{ marginLeft: 8 }}
            >
              Puzzles
            </Button>
          </div>

          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <Alert message={`Erro ao carregar.`} type="error" />
          ) : (selectedType === 'case' ? classes : puzzles).length === 0 ? (
            <Alert
              message={`Nenhum ${selectedType} cadastrado.`}
              type="info"
              style={{ width: 500 }}
            />
          ) : (
            <Row gutter={16}>
              {(selectedType === 'case' ? classes : puzzles).map((item, index) => (
                <Col span={10} key={index}>
                  {selectedType === 'case' ? (
                    <Case
                      title={item.title}
                      code={item.uuid}
                      foto={item.image}
                      tags={item.tags ? item.tags.map(tag => tag.name) : []}
                    />
                  ) : (
                    <Puzzle
                      title={item.title}
                      code={item.uuid}
                      foto={item.image}
                    />
                  )}
                </Col>
              ))}
            </Row>
          )}
          <br />
        </div>
      </div>
    </div>
  );
}