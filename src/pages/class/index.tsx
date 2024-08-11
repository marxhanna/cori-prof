import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Menu from '../../components/lateral-menu';
import Header from '../../components/class/header'
import Students from '../../components/class/students'
import { useParams } from 'react-router-dom';

export default function Classes() {
  const { code } = useParams();
  const [classData, setClassData] = useState();

  async function getClassData(code) {
    const authToken = localStorage.getItem('authToken');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    try {
      const response = await fetch(`https://back-end-cori-cases.opatj4.easypanel.host/classes/students/${code}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {

    const authToken = localStorage.getItem("authToken");
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    };

    try {
      fetch(`https://back-end-cori-cases.opatj4.easypanel.host/classes/students/${code}`, options).then(response => response.json()).then(json => {
        console.log(json)
        setClassData(json)
      })
    } catch (error) {
      console.log(error)
    }
  }, [code]);

  return (
    <>
      <div className='page'>
        <div className='pageContent'>
          {
            classData ? (
              <>
                <Header code={code} title={classData.name} foto={classData.image} />
                <center>
                  <Students userData={classData} />
                </center>
              </>
            ) : <>Loading</>
          }
        </div>
      </div>
    </>
  )
}
