import React, { useState, useEffect } from 'react';
import { Input, Select, message, Divider, Checkbox, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import img1 from '../../assets/icons/Casos/femaleAdult.png';
import img2 from '../../assets/icons/Casos/femaleBaby.png';
import img3 from '../../assets/icons/Casos/femaleKid.png';
import img4 from '../../assets/icons/Casos/femaleOlder.png';
import img5 from '../../assets/icons/Casos/femaleTeenager.png';
import img6 from '../../assets/icons/Casos/gravida.png';
import img7 from '../../assets/icons/Casos/maleAdult.png';
import img8 from '../../assets/icons/Casos/maleBaby.png';
import img9 from '../../assets/icons/Casos/maleKid.png';
import img10 from '../../assets/icons/Casos/maleOlder.png';
import img11 from '../../assets/icons/Casos/maleTeenager.png';

const images = [
  { src: img1, name: 'femaleAdult' },
  { src: img2, name: 'femaleBaby' },
  { src: img3, name: 'femaleKid' },
  { src: img4, name: 'femaleOlder' },
  { src: img5, name: 'femaleTeenager' },
  { src: img6, name: 'gravida' },
  { src: img7, name: 'maleAdult' },
  { src: img8, name: 'maleBaby' },
  { src: img9, name: 'maleKid' },
  { src: img10, name: 'maleOlder' },
  { src: img11, name: 'maleTeenager' }
];

const MAX_ALTERNATIVE_RESPONSES = 4;

const App: React.FC = () => {
  const authToken = localStorage.getItem('authToken');

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  };

  const [classOptions, setClassOptions] = useState<any[]>([]);
  const [questions, setQuestions] = useState<Array<{ question: string, alternatives: Array<{ alternative: string, consequence: string, isCorrect: boolean }> }>>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');

  useEffect(() => {
    fetch('https://back-end-cori-cases.opatj4.easypanel.host/classes', options)
      .then(response => response.json())
      .then(response => {
        const newClassOptions = response.class.map((item: { class: { code: any; name: any; }; }) => ({
          value: item.class.code,
          label: item.class.name,
        }));
        setClassOptions(newClassOptions);
      })
      .catch(err => console.error(err));
  }, []);

  const handleQuestionCountChange = (value: number) => {
    setQuestionCount(value);
    const newQuestions = Array.from({ length: value }, () => ({
      question: "",
      alternatives: Array.from({ length: 2 }, () => ({ alternative: "", consequence: "", isCorrect: false }))
    }));
    setQuestions(newQuestions);
  };

  const addAlternativeResponse = (index: number) => {
    const newQuestions = [...questions];
    if (newQuestions[index].alternatives.length < MAX_ALTERNATIVE_RESPONSES) {
      newQuestions[index].alternatives.push({ alternative: "", consequence: "", isCorrect: false });
      setQuestions(newQuestions);
    } else {
      message.error('Limite de alternativas atingido.');
    }
  };

  const removeAlternativeResponse = (optionIndex: number) => {
    const newQuestions = [...questions];
    if (newQuestions[optionIndex].alternatives.length > 2) {
      newQuestions[optionIndex].alternatives.pop();
      setQuestions(newQuestions);
    } else {
      message.error('Cada pergunta precisa ter no mínimo 2 alternativas.');
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAlternativeChange = (questionIndex: number, alternativeIndex: number, value: string) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex] && newQuestions[questionIndex].alternatives[alternativeIndex]) {
      newQuestions[questionIndex].alternatives[alternativeIndex].alternative = value;
    } else {
      newQuestions[questionIndex].alternatives[alternativeIndex] = { alternative: value, consequence: '', isCorrect: false };
    }
    setQuestions(newQuestions);
  };

  const handleConsequenceChange = (questionIndex: number, alternativeIndex: number, value: string) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex] && newQuestions[questionIndex].alternatives[alternativeIndex]) {
      newQuestions[questionIndex].alternatives[alternativeIndex].consequence = value;
    } else {
      newQuestions[questionIndex].alternatives[alternativeIndex] = { alternative: '', consequence: value, isCorrect: false };
    }
    setQuestions(newQuestions);
  };

  const handleIsCorrectChange = (questionIndex: number, alternativeIndex: number, value: boolean) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex] && newQuestions[questionIndex].alternatives[alternativeIndex]) {
      newQuestions[questionIndex].alternatives[alternativeIndex].isCorrect = value;
    } else {
      newQuestions[questionIndex].alternatives[alternativeIndex] = { alternative: '', consequence: '', isCorrect: value };
    }
    setQuestions(newQuestions);
  };

  const handleImageClick = (name: string) => {
    setSelectedImage(prev => (prev === name ? null : name));
  };


  const criarPuzzle = async () => {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const classCode = selectedClass;
    let theme = selectedTheme;

    const form = new FormData();
    form.append("title", title);
    form.append("classCode", classCode);
    form.append("theme", theme);
    form.append("filename", selectedImage || '');
    form.append("questions", JSON.stringify(questions));

    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: form
    };

    try {
      const response = await fetch('https://back-end-cori-cases.opatj4.easypanel.host/puzzles/create', options);
      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: 'Caso Criado',
          description: 'O puzzle foi criado com sucesso!',
          placement: 'top'
        });
        window.location.href = "/puzzles";
      } else {
        throw new Error(data.message || 'Erro desconhecido');
      }
    } catch (err) {
      console.error(err);
      notification.error({
        message: 'Erro',
        description: 'Houve um erro ao criar o puzzle.',
        placement: 'top'
      });
    }
  }


  return (
    <>
      <div className='createForm'>
        <br />
        <div className='formName'>
          <p>Título do Puzzle</p>
          <Input size="large" placeholder="Insira o título do puzzle" style={{ width: 500 }} id="title" />
        </div><br />
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
        </div><br/>
        <div className='formName'>
          <p>Selecione a turma</p>
          <Select
            defaultValue="Turmas"
            size='large'
            style={{ width: 300 }}
            id="turma"
            options={classOptions}
            onChange={(value) => setSelectedClass(value)}
          />
        </div><br />
        <div className='formName'>
          <p>Tema do caso</p>
          <Select
            defaultValue="Selecione um tema para o caso"
            size='large'
            style={{ width: 300 }}
            options={[
              { value: 'anatomia', label: 'Anatomia' },
              { value: 'anestesiologia', label: 'Anestesiologia' },
              { value: 'bioquimica', label: 'Bioquímica' },
              { value: 'cardiologia', label: 'Cardiologia' },
              { value: 'cirurgia', label: 'Cirurgia' },
              { value: 'clinica_medica', label: 'Clínica medica' },
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
              { value: 'obstetricia', label: 'Obstetricia' },
              { value: 'oftalmologia', label: 'Oftalmologia' },
              { value: 'oncologia', label: 'Oncologia' },
              { value: 'ortopedia', label: 'Ortopedia' },
              { value: 'otorrinolaringologia', label: 'Otorrinolaringologia' },
              { value: 'patologia', label: 'Patologia' },
              { value: 'pediatria', label: 'Pediatria' },
              { value: 'psiquiatria', label: 'Psiquiatria' },
              { value: 'radiologia', label: 'Radiologia' },
              { value: 'reumatologia', label: 'Reumatologia' },
            ]}
            onChange={(value) => setSelectedTheme(value)}
          />
        </div><br />
        <div className='formName'>
          <p>Perguntas</p>
          <Select
            defaultValue="Quantidade de Perguntas"
            size='large'
            style={{ width: 300 }}
            options={[
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
              { value: '6', label: '6' },
            ]}
            onChange={(value) => handleQuestionCountChange(Number(value))}
          />
        </div>
        <br />

        {questions.map((question, i) => (
          <div key={i} className="formName" id="pergunta">
            <Divider />
            <div>
              <p>{`Pergunta ${i + 1}`}</p>
              <Input size="large" placeholder="Pergunta" style={{ width: 1075 }} onChange={(e) => handleQuestionChange(i, e.target.value)} id={`pergunta${i + 1}`} />
              {/*}<Upload {...props}>
                <Button icon={<UploadOutlined />} style={{ marginLeft: '20%' }}>Enviar imagem</Button>
              </Upload>{*/}
            </div>
            {question.alternatives.map((alternative, j) => (
              <div key={j} className="alternativa" style={{ display: j % 2 === 0 ? 'flex' : 'none' }}>
                <div>
                  <p>{`Alternativa ${j + 1}`}</p>
                  <Input size="large" placeholder="Alternativa" style={{ width: 500 }} onChange={(e) => handleAlternativeChange(i, j, e.target.value)} id={`alternativa${j}`} />
                  <br />
                  <p>Consequência da Alternativa {j + 1}</p>
                  <Input size="large" placeholder="Consequência" style={{ width: 500 }} onChange={(e) => handleConsequenceChange(i, j, e.target.value)} id={`consequencia${j}`} />
                  <br /><br />
                  <div className="radioPuzzle">
                    <Checkbox onChange={(e) => handleIsCorrectChange(i, j, e.target.checked)} id={`iscorrect${j}`} /> Finalizar caso após alternativa
                  </div>
                </div>
                {j + 1 < question.alternatives.length && (
                  <div style={{ marginLeft: '5%' }}>
                    <p>{`Alternativa ${j + 2}`}</p>
                    <Input size="large" placeholder="Alternativa" style={{ width: 500 }} onChange={(e) => handleAlternativeChange(i, j + 1, e.target.value)} id={`alternativa${j + 2}`} />
                    <br />
                    <p>Consequência da Alternativa {j + 2}</p>
                    <Input size="large" placeholder="Consequência" style={{ width: 500 }} onChange={(e) => handleConsequenceChange(i, j + 1, e.target.value)} id={`consequencia${j + 2}`} />
                    <br /><br />
                    <div className="radioPuzzle">
                      <Checkbox onChange={(e) => handleIsCorrectChange(i, j + 1, e.target.checked)} id={`iscorrect${j + 2}`} /> Finalizar caso após alternativa
                    </div>
                  </div>
                )}
              </div>
            ))}
            <br />
            <Button onClick={() => addAlternativeResponse(i)}>+</Button>
            <Button style={{ marginLeft: "1%" }} onClick={() => removeAlternativeResponse(i)}>-</Button>
            <br />
          </div>
        ))}
        <br />
        <button className='createClass' onClick={criarPuzzle}>Criar Novo Puzzle</button>
      </div>
    </>
  );
};

export default App;