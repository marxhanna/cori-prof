import React from 'react';

interface AppProps {
  tema: string;
  temaImg: string;
  statistic: number;
  color: string;
}

const App: React.FC<AppProps> = ({ tema, temaImg, statistic, color }) => (
  <div 
    style={{ 
      textAlign: 'center', 
      width: 245, 
      height: 130, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      backgroundColor: "#FFFFFF",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
      padding: "2%",
      borderRadius: "15px",
    }}
  >
    <div className='statisticTags' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={temaImg} style={{ width: "45px", height: "45px" }} />
      <div style={{ 
        backgroundColor: color,
        borderRadius: '15px',
        color: 'white',
        fontFamily: 'Outfit',
        fontWeight: '400',
        padding: "0 5%",
        width: '50%',
        marginLeft: '5%',
        textAlign: 'center',
      }}>
        {tema}
      </div>
    </div>
    <p className='statisticNumber' style={{ margin: 0 }}>{statistic} %</p>
  </div>
);

export default App;
