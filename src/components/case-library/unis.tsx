import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

interface UniProps {
  nome: string;
  foto: string;
  uuid: string;
}

const Uni: React.FC<UniProps> = ({ nome, foto, uuid }) => {
  const handleClick = () => {
    localStorage.setItem('uniUUID', uuid);
  };

  return (
    <Link to={`/library/${nome}`} onClick={handleClick}>
      <Card size="small" className='hoverClass'>
        <div className='classCard'>
          <div className='classPhoto'>
            <img src={foto} alt={nome} style={{ borderRadius: "100%" }} />
          </div>
          <p className='className'>{nome}</p>
        </div>
      </Card>
    </Link>
  );
};

export default Uni;
