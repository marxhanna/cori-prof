import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import def from '../../assets/icons/caso.png'

const Tema = ({ title, nome, foto, tema }) => {
  const [caso, setCaso] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(`../../assets/icons/Temas/${foto}.png`);
        setCaso(image.default);
      } catch (e) {
        console.error("Erro ao carregar a imagem:", e);
        setCaso(def);
      }
    };

    loadImage();
  }, [foto]);

  return (

    <Link to={`/library/${nome}/${tema}`}>
      <Card size="small" className='hoverClass' style={{ marginBottom: "5%" }}>
        <div className='classCard'>
          <div className='classPhoto'>
            <img src={caso} />
          </div>
          <p className='className'>{title}</p>
        </div>
      </Card>
    </Link>
  )
};

export default Tema;