import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import def from '../../assets/icons/Turma/coracao.png'

const Class = ({ title, code, foto }) => {
  const [caso, setCaso] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(`../../assets/icons/Turma/${foto}.png`);
        setCaso(image.default);
      } catch (e) {
        console.error("Erro ao carregar a imagem:", e);
        setCaso(def);
      }
    };

    loadImage();
  }, [foto]);

  return (
    <Link to={`/class/${code}`}>
      <Card size="small" className='hoverClass' style={{ marginBottom: "5%" }}>
        <div className='classCard'>
          <div className='classPhoto'>
            {caso ? <img src={caso} alt={title} /> : <div>Imagem não disponível</div>}
          </div>
          <p className='className'>{title}</p>
        </div>
      </Card>
    </Link>
  );
};

export default Class;