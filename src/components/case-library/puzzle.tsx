import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import def from '../../assets/icons/puzzle.png'

const Puzzle = ({ foto, title, code }) => {

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

  return (
    <Card size="small" className='hoverClass'>
      <div className='classCard'>
        <div className='classPhoto'>
          <img src={caso} />
        </div>
        <p className='className'>{title}</p>
      </div>
    </Card>
  )
};

export default Puzzle;