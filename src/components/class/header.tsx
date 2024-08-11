import React, { useEffect, useState } from 'react';
import def from '../../assets/icons/Turma/coracao.png';

interface HeaderProps {
  code: string;
  title: string;
  foto: string;
}

const Header: React.FC<HeaderProps> = ({ code, title, foto }) => {
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
    <>
      <div className='dashboardHeader' style={{ alignItems: 'flex-end' }}>
        <h1 className='dashboardH1' style={{ margin: 0 }}>Alunos</h1>
        <div className='pinDiv'>PIN: {code}</div>
      </div>
      <div className='className' style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div className='classPhoto' style={{ position: 'relative', zIndex: 1, backgroundColor: "#f2f2f2" }}>
          <img src={caso} alt="Class" />
        </div>
        <div className='classTitle' style={{ paddingRight: '3%', paddingLeft: '1%', marginLeft: '-0.5%', zIndex: 0 }}>
          {title}
        </div>
      </div>
    </>
  );
};

export default Header;