import React, { useState } from 'react';
import { Input, Select, notification } from 'antd';
import img1 from '../../assets/icons/Turma/criancaAdolescente.png';
import img2 from '../../assets/icons/Turma/doencasInfecto.png';
import img3 from '../../assets/icons/Turma/hospedeiro.png';
import img4 from '../../assets/icons/Turma/infetado.png';
import img5 from '../../assets/icons/Turma/medicinaEvidencias.png';
import img6 from '../../assets/icons/Turma/medicinaLegal.png';
import img7 from '../../assets/icons/Turma/orgaosHumanos.png';
import img8 from '../../assets/icons/Turma/ortopedico.png';
import img9 from '../../assets/icons/Turma/patologia.png';
import img10 from '../../assets/icons/Turma/pediatria.png';
import img11 from '../../assets/icons/Turma/pele.png';
import img12 from '../../assets/icons/Turma/primeirosSocorros.png';
import img13 from '../../assets/icons/Turma/saudeAdulto.png';
import img14 from '../../assets/icons/Turma/saudeIdosos.png';
import img15 from '../../assets/icons/Turma/saudeMental.png';
import img16 from '../../assets/icons/Turma/saudeMulher.png';
import img17 from '../../assets/icons/Turma/segurancaPaciente.png';
import img18 from '../../assets/icons/Turma/sistemaEndocrino.png';
import img19 from '../../assets/icons/Turma/sistemaHematologico.png';
import img20 from '../../assets/icons/Turma/sistemaImunologico.png';
import img21 from '../../assets/icons/Turma/sistemaLocomotor.png';
import img22 from '../../assets/icons/Turma/sistemaNefro.png';
import img23 from '../../assets/icons/Turma/sistemaNervoso.png';
import img24 from '../../assets/icons/Turma/sistemaNeurologico.png';
import img25 from '../../assets/icons/Turma/sistemaRespiratorio.png';
import img26 from '../../assets/icons/Turma/suporteVida.png';
import img27 from '../../assets/icons/Turma/tecnicaOperatoria.png';
import img28 from '../../assets/icons/Turma/tecnologiaSaude.png';
import img29 from '../../assets/icons/Turma/trato_urinario.png';
import img30 from '../../assets/icons/Turma/urgenciasEmergencias.png';
import img31 from '../../assets/icons/Turma/coracao.png';

const images = [
  { src: img1, name: 'criancaAdolescente' },
  { src: img2, name: 'doencasInfecto' },
  { src: img3, name: 'hospedeiro' },
  { src: img4, name: 'infetado' },
  { src: img5, name: 'medicinaEvidencias' },
  { src: img6, name: 'medicinaLegal' },
  { src: img7, name: 'orgaosHumanos' },
  { src: img8, name: 'ortopedico' },
  { src: img9, name: 'patologia' },
  { src: img10, name: 'pediatria' },
  { src: img11, name: 'pele' },
  { src: img12, name: 'primeirosSocorros' },
  { src: img13, name: 'saudeAdulto' },
  { src: img14, name: 'saudeIdosos' },
  { src: img15, name: 'saudeMental' },
  { src: img16, name: 'saudeMulher' },
  { src: img17, name: 'segurancaPaciente' },
  { src: img18, name: 'sistemaEndocrino' },
  { src: img19, name: 'sistemaHematologico' },
  { src: img20, name: 'sistemaImunologico' },
  { src: img21, name: 'sistemaLocomotor' },
  { src: img22, name: 'sistemaNefro' },
  { src: img23, name: 'sistemaNervoso' },
  { src: img24, name: 'sistemaNeurologico' },
  { src: img25, name: 'sistemaRespiratorio' },
  { src: img26, name: 'suporteVida' },
  { src: img27, name: 'tecnicaOperatoria' },
  { src: img28, name: 'tecnologiaSaude' },
  { src: img29, name: 'trato_urinario' },
  { src: img30, name: 'urgenciasEmergencias' },
  { src: img31, name: 'coracao' }
];

const { Option } = Select;
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const App: React.FC = () => {
  const [nomeTurma, setNomeTurma] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [curso, setCurso] = useState('');
  const [periodoLetivo, setPeriodoLetivo] = useState<number | null>(null);
  const [cicloClinico, setCicloClinico] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const prof = localStorage.getItem('profName');

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("name", nomeTurma);
    if (prof) {
      form.append("professor", prof);
    }
    form.append("subject", disciplina);
    form.append("curse", curso);
    form.append("filename", selectedImage || '');
    if (periodoLetivo) {
      form.append("periodoLetivo", periodoLetivo.toString());
    }
    if (cicloClinico) {
      form.append("cicloClinico", cicloClinico);
    }

    const authToken = localStorage.getItem('authToken');

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: form
    };

    try {
      const response = await fetch('https://back-end-cori-cases.opatj4.easypanel.host/classes', options);
      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: 'Turma Criada',
          description: 'A turma foi criada com sucesso!',
          placement: 'top'
        });
        await sleep(1000);
        window.location.href = "/classes";
      } else {
        throw new Error(data.message || 'Erro desconhecido');
      }
    } catch (err) {
      notification.error({
        message: 'Erro',
        description: 'Houve um erro ao criar a turma. Por favor tente novamente.',
        placement: 'top'
      });
    }
  }

  const handleImageClick = (name: string) => {
    setSelectedImage(prev => (prev === name ? null : name));
  };

  return (
    <>
      <div className='createForm'>
        <br/>
        <div className='formName'>
          <p>Nome da Turma</p>
          <Input size="large" placeholder="Insira o nome da turma" style={{ width: 500 }} value={nomeTurma} onChange={e => setNomeTurma(e.target.value)} />
        </div>
        <div className='formName'>
          <p>Disciplina</p>
          <Input size="large" placeholder="Insira a disciplina ensinada" style={{ width: 500 }} value={disciplina} onChange={e => setDisciplina(e.target.value)} />
        </div>
        <div className='formName'>
          <p>Curso</p>
          <Input size="large" placeholder="Insira o curso" style={{ width: 500 }} value={curso} onChange={e => setCurso(e.target.value)} />
        </div>
        <div className='formName'>
          <p>Período Letivo</p>
          <Select
            size="large"
            placeholder="Selecione o período letivo"
            style={{ width: 500 }}
            value={periodoLetivo}
            onChange={value => setPeriodoLetivo(value)}
          >
            {[...Array(12).keys()].map(i => (
              <Option key={i + 1} value={i + 1}>{i + 1}</Option>
            ))}
          </Select>
        </div>
        <div className='formName'>
          <p>Ciclo Clínico</p>
          <Select
            size="large"
            placeholder="Selecione o ciclo clínico"
            style={{ width: 500 }}
            value={cicloClinico}
            onChange={value => setCicloClinico(value)}
          >
            <Option value="Pré-Clínico">Pré-Clínico</Option>
            <Option value="Clínico">Clínico</Option>
            <Option value="Internato">Internato</Option>
          </Select>
        </div>
        <div className='formName'>
          <p>Selecione uma imagem:</p>
          <div style={{ border: "dashed 1px #7F7BFF", width: 500, borderRadius: "15px", padding: "3%", display: 'flex', flexWrap: 'wrap', backgroundColor: "white" }}>
            {images.map((item, index) => (
              <img
                key={index}
                src={item.src}
                alt={`icon-${index}`}
                style={{
                  width: "70px",
                  margin: '5px',
                  border: selectedImage === item.name ? '3px solid #7F7BFF' : 'none',
                  cursor: 'pointer'
                }}
                onClick={() => handleImageClick(item.name)}
              />
            ))}
          </div>
        </div>
        <br/>
        <button className='createClass' onClick={handleSubmit}>Criar Turma</button>
      </div>
    </>
  );
};

export default App;