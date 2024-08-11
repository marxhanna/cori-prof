import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import def from '../../assets/icons/caso.png';

interface CaseProps {
  title: string;
  code: string;
  foto: string;
  tags: string[];
}

const tagColors: Record<string, string> = {
  "Diagnóstico": '#6B67F9',
  "Exame": '#A6DC00',
  "Prescrição Médica": '#FF0F68',
  "Conduta Médica": '#8A2BE2', // BlueViolet
};

const Case: React.FC<CaseProps> = ({ title, code, foto, tags }) => {
  const [caso, setCaso] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(`../../assets/icons/Casos/${foto}.png`);
        setCaso(image.default);
      } catch (e) {
        console.error("Erro ao carregar a imagem:", e);
        setCaso(def);
      }
    };

    loadImage();
  }, [foto]);

  // Remover duplicatas das tags
  const uniqueTags = Array.from(new Set(tags));

  return (
    <Link to={`/case/${code}`}>
      <Card size="small" className='hoverClass' style={{ marginBottom: "5%" }}>
        <div className='classCard'>
          <div className='classPhoto'>
            <img src={caso} alt="Caso" />
          </div>
          <p className='className'>{title}</p>
        </div>
        <div className='tags' style={{ width: "90%", float: "right" }}>
          {uniqueTags.map((tag, index) => (
            <div
              key={index}
              className='tag'
              style={{ backgroundColor: tagColors[tag] || '#ccc', color: '#fff' }}
            >
              {tag}
            </div>
          ))}
          <EditOutlined style={{ marginLeft: "5%", fontSize: "25px" }} />
        </div>
      </Card>
    </Link>
  );
};

export default Case;