import React, { useState, useEffect } from 'react';
import { Input, Select, message, Button, notification, Upload, UploadFile, GetProp, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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

interface AtendimentoOption {
  label: string;
  value: string;
  isChecked: boolean;
  principalResponse: string;
  alternativeResponses: string[];
};

const initialOptions: AtendimentoOption[] = [
  { label: 'Diagnóstico', value: 'Diagnóstico', isChecked: false, principalResponse: '', alternativeResponses: [] },
  { label: 'Exame', value: 'Exame', isChecked: false, principalResponse: '', alternativeResponses: [] },
  { label: 'Prescrição Médica', value: 'Prescrição Médica', isChecked: false, principalResponse: '', alternativeResponses: [] },
];

const MAX_ALTERNATIVE_RESPONSES = 4;

const { TextArea } = Input;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const App: React.FC = () => {
  const authToken = localStorage.getItem('authToken');
  const url = window.location.href;
  const uuid = url.split('/case/')[1];

  const [classOptions, setClassOptions] = useState<any[]>([]);
  const [dicas, setDicas] = useState<string[]>([]);
  const [dicaImages, setDicaImages] = useState<(UploadFile | null)[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);
  const [dicasCount, setDicasCount] = useState<number>(0);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        const response = await fetch(`https://back-end-cori-cases.opatj4.easypanel.host/classes`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const result = await response.json();
        const newClassOptions = result.class.map((item: { class: { code: any; name: any; }; }) => ({
          value: item.class.code,
          label: item.class.name,
        }));
        setClassOptions(newClassOptions);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClassOptions();
  }, [authToken]);

  useEffect(() => {
    if (!uuid || !authToken) return;

    const fetchCaseData = async () => {
      try {
        const response = await fetch(`https://back-end-cori-cases.opatj4.easypanel.host/cases/${uuid}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const result = await response.json();

        if (result.title !== title || result.image !== selectedImage ||
            result.class?.code !== selectedClass || result.theme !== selectedTheme ||
            result.tips.length !== dicasCount || result.videoUrl !== videoUrl) {
          setTitle(result.title);
          setSelectedImage(result.image);
          setSelectedClass(result.class?.code || '');
          setSelectedTheme(result.theme || '');
          setDicas(result.tips.map((tip: any) => tip.content));
          setDicasCount(result.tips.length);
          setVideoUrl(result.videoUrl);

          const updatedOptions = [...selectedOptions];

          result.tags.forEach((tag: any) => {
            const optionIndex = updatedOptions.findIndex(option => option.label === tag.tags.name);
            if (optionIndex !== -1) {
              updatedOptions[optionIndex].isChecked = true;
              updatedOptions[optionIndex].principalResponse = tag.tags.name;
            }
          });
          setSelectedOptions(updatedOptions);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCaseData();
  }, []); 


  const handleCheckChange = (index: number) => {
    const newOptions = [...selectedOptions];
    newOptions[index].isChecked = !newOptions[index].isChecked;
    setSelectedOptions(newOptions);
  };

  const handleDicasChange = (value: number) => {
    setDicasCount(value);
    setDicas(Array(value).fill(''));
    setDicaImages(Array(value).fill(null));
  };

  const handlePrincipalResponseChange = (index: number, value: string) => {
    const newOptions = [...selectedOptions];
    newOptions[index].principalResponse = value;
    setSelectedOptions(newOptions);
  };

  const handleAlternativeResponseChange = (optionIndex: number, responseIndex: number, value: string) => {
    const newOptions = [...selectedOptions];
    newOptions[optionIndex].alternativeResponses[responseIndex] = value;
    setSelectedOptions(newOptions);
  };

  const addAlternativeResponse = (index: number) => {
    const newOptions = [...selectedOptions];
    if (newOptions[index].alternativeResponses.length < MAX_ALTERNATIVE_RESPONSES) {
      newOptions[index].alternativeResponses.push('');
      setSelectedOptions(newOptions);
    } else {
      message.error('Limite de respostas alternativas atingido.');
    }
  };

  const removeAlternativeResponse = (optionIndex: number, responseIndex: number) => {
    const newOptions = [...selectedOptions];
    newOptions[optionIndex].alternativeResponses.splice(responseIndex, 1);
    setSelectedOptions(newOptions);
  };

  const atualizarCaso = async () => {
    let alternativesArray = selectedOptions.filter(option => option.isChecked).flatMap(option => [
      { content: option.principalResponse, tag: option.label },
      ...option.alternativeResponses.map(alt => ({ content: alt, tag: option.label }))
    ]);

    const form = new FormData();
    form.append("title", title);
    form.append("classCode", selectedClass || '');
    form.append("theme", selectedTheme || '');
    form.append("videoUrl", videoUrl || '');
    form.append("filename", selectedImage || '');

    if (alternativesArray.length > 0) {
      form.append("alternatives", JSON.stringify(alternativesArray));
    }

    const tipsArray = dicas.map((dica, index) => ({
      content: dica,
      filename: dicaImages[index]?.name || ''
    }));
    if (tipsArray.length > 0) {
      form.append("tips", JSON.stringify(tipsArray));
    }

    dicaImages.forEach((image, index) => {
      if (image) {
        form.append("tips_image", image as FileType);
      }
    });

    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: form
    };

    try {
      const response = await fetch(`https://back-end-cori-cases.opatj4.easypanel.host/cases/${uuid}`, requestOptions);
      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: 'Caso Atualizado',
          description: 'O caso foi atualizado com sucesso!',
          placement: 'top'
        });
        console.log(data);
      } else {
        throw new Error(data.message || 'Erro desconhecido');
      }
    } catch (err) {
      console.error(err);
      notification.error({
        message: 'Erro',
        description: 'Houve um erro ao atualizar o caso.',
        placement: 'top'
      });
    }
  };

  const handleImageClick = (imageName: string) => {
    setSelectedImage(imageName); // Atualize o estado com o nome da imagem
  };

  const handleDicaImageUpload = (index: number, file: UploadFile) => {
    const newDicaImages = [...dicaImages];
    newDicaImages[index] = file;
    setDicaImages(newDicaImages);
  };

  return (
    <>
      <div className='createForm'>
        <br />
        <div className='formName'>
          <p>Título do Caso</p>
          <Input
            size="large"
            placeholder="Insira o título do caso"
            style={{ width: 500 }}
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
        </div>
        <br />
        <div className='formName'>
          <p>Selecione a turma</p>
          <Select
            value={selectedClass}
            style={{ width: 500 }}
            onChange={(value) => setSelectedClass(value)}
            options={classOptions}
            placeholder="Selecione a classe"
          />
        </div><br />
        <div className='formName'>
          <p>Tema do caso</p>
          <Select
            defaultValue="Selecione um tema para o caso"
            size='large'
            style={{ width: 300 }}
            value={selectedTheme}
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
          <p>Tipo de Atendimento</p>
          {selectedOptions.map((option, index) => (
            <div key={index} className="custom-checkbox">
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={option.isChecked}
                onChange={() => handleCheckChange(index)}
              />
              <label htmlFor={`checkbox-${index}`}>{option.label}</label>
            </div>
          ))}
        </div><br />
        <div className='formName'>
          <p>Dicas</p>
          <Select
            value={dicasCount}
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
            onChange={handleDicasChange}
          />
        </div><br />
        {Array.from({ length: dicasCount }, (_, i) => (
          <div key={i} className='formName'>
            <p>{`Dica ${i + 1}`}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextArea
                size="large"
                autosize
                placeholder={`Dica ${i + 1}`}
                style={{ width: 500, marginTop: 5 }}
                value={dicas[i]}
                onChange={(e) => {
                  const newDicas = [...dicas];
                  newDicas[i] = e.target.value;
                  setDicas(newDicas);
                }}
              />
              <Upload
                accept="image/*"
                maxCount={1}
                beforeUpload={(file) => {
                  handleDicaImageUpload(i, file);
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />} style={{ marginLeft: "50%" }}></Button>
              </Upload>
            </div>
          </div>
        ))}
        {selectedOptions.map((option, index) => option.isChecked && (
          <div key={index} className='formName'>
            <p>{`Resposta ${option.label}`}</p>
            <div>
              <Input size='large' style={{ width: 500 }}
                placeholder={`${option.label} Principal`}
                value={option.principalResponse}
                onChange={(e) => handlePrincipalResponseChange(index, e.target.value)} />
              <Button onClick={() => addAlternativeResponse(index)} style={{ marginLeft: '2%' }}>+</Button>
            </div>
            {option.alternativeResponses.map((alt, altIndex) => (
              <div key={altIndex}>
                <p>{`Resposta Alternativa ${altIndex + 1}`}</p>
                <Input size='large' style={{ width: 500 }} placeholder={`Resposta Alternativa ${altIndex + 1}`} value={alt}
                  onChange={(e) => handleAlternativeResponseChange(index, altIndex, e.target.value)} />
                <Button onClick={() => removeAlternativeResponse(index, altIndex)} style={{ marginLeft: '2%' }}>-</Button>
              </div>
            ))}
          </div>
        ))}
        <div className='formName'>
          <p>Link Vídeo de Explicação</p>
          <Input size='large' style={{ width: 500 }} placeholder={"Link Google Drive/iCloud/Youtube"} value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)} />
        </div>
        <br />
        <button className='createClass' onClick={atualizarCaso}>Salvar Caso</button>
      </div>
      <br/><br/>
    </>
  );
};

export default App;