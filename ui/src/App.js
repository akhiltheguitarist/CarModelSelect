import './App.css';
import React, { useState, useEffect } from 'react'
import Dropdown from './components/dropdown';
import DisplayElement from './components/displayElement'


var cache = {};
function App() {

  const [make, setMake] = useState([])
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [model, setModel] = useState([])
  const [vehicle, setVehicle] = useState([])
  
  
  useEffect(() => {
    loadData("http://localhost:8080/api/makes", setMake)
  },[]);

  const loadData = async (url, setMethod) => {
    let cacheKey = JSON.stringify( url )
    cacheKey = cacheKey.slice(39,-1)
    if ( cache[ cacheKey ]) {
      setMethod(cache[ cacheKey ]);
      return cache[ cacheKey ];
    }
    else{
      console.log('triggered')
      await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        };
      })
      .then((responseJson) => {
        cache[ cacheKey ] = responseJson;
        setMethod(responseJson);
      })
      .catch((error) => {
        console.log(error)
        alert("Failed to fetch data")
      }) 
    }
  };


  const makeChange = (e) => {
    if(e.target.value !== '--Select a make--'){
      setSelectedMake(e.target.value)
      getModelData(e)
      setVehicle([])
    }
  }

  const getModelData = (e) => {
    let url = new URL("http://localhost:8080/api/models")
      url.searchParams.append('make', e.target.value)
      loadData(url, setModel)
  }

  const GetVehicleData = (e) => {
    let url = new URL("http://localhost:8080/api/vehicles")
      url.searchParams.append('make', selectedMake)
      url.searchParams.append('model', e.target.value)
      loadData(url, setVehicle)
  }

  const modelChange =(e) => {
    if(e.target.value !== '--Select a model--'){
      setSelectedModel(e.target.value)
      GetVehicleData(e)
    }
  }

  return (
    <div className="App">
       <div style={{display: 'flex', gap: '10px'}}>
         <Dropdown selectedMake={selectedMake} placeholderText="--Select a make--" makeChange={makeChange} make={make}/>
        <Dropdown selectedMake={selectedModel} placeholderText="--Select a model--" makeChange={modelChange} make={model}/> 
       </div>
        {vehicle && <DisplayElement rows={vehicle} /> }
    </div>
  );
}

export default App;
