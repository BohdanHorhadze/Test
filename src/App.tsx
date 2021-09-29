import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select, { OnChangeValue } from 'react-select';
import { Button, PageHeader } from 'antd';
import axios from 'axios';
import { Selector } from './interfaces/interfaces'
import './App.css';
import Photos from './Components/Photos/Photos';

const App: React.FC = () => {

  const numbers = useMemo(() => {
    return [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
    ]
  }, [])

  const breedRef = useRef<HTMLInputElement | null | any>(null)
  const numberRef = useRef<HTMLInputElement | null | any>(null)

  const [breed, setBreed] = useState<Selector | null>(null)
  const [subBreed, setSubBreed] = useState<Selector | null>(null)
  const [number, setNumber] = useState<Selector | null>()
  const [images, setImages] = useState<Array<string>>()

  const [breedsOptions, setBreedsOptions] = useState<Array<Selector>>([])
  const [subBreedOtions, setSubBreedOptions] = useState<Array<Selector>>([])

  const [message, setMessage] = useState('')

  useEffect(() => {
    async function fetchAllData() {
      const { data: { message } } = await axios('https://dog.ceo/api/breeds/list/all')

      const breeds = Object.keys(message).map(dog => ({ value: dog, label: dog }))
      setBreedsOptions(breeds)
    }
    fetchAllData()
  }, [])

  useEffect(() => {
    async function fetchSubBreeds() {
      if (breed) {
        const info = breed.value
        const { data: { message } } = await axios(`https://dog.ceo/api/breed/${info}/list`)
        const subBreeds = message.map((sub: string) => ({ value: sub, label: sub }))
        setSubBreed(null)
        setSubBreedOptions(subBreeds)
      }
    }
    fetchSubBreeds()
  }, [breed])

  const changeBreedHandler = (selectedOpiton: OnChangeValue<Selector, false>) => {
    setBreed(selectedOpiton)
  }

  const changeSubBreedHandler = (selectedOpiton: OnChangeValue<Selector, false>) => {
    setSubBreed(selectedOpiton)
  }

  const changeNumberHandler = (selectedOpiton: OnChangeValue<Selector, false>) => {
    setNumber(selectedOpiton)
  }

  const handleClick = async () => {
    if (!breed && breedRef.current) {
      breedRef.current.controlRef.style.border = '1px solid red'
      numberRef.current.controlRef.style.border = '1px solid black'
      setMessage('select breed')
    } else if (!number && numberRef.current) {
      numberRef.current.controlRef.style.border = '1px solid red'
      breedRef.current.controlRef.style.border = '1px solid black'
      setMessage('select number')
    } else {
      setMessage('')
      const breedInfo = breed?.value
      const subBreadInfo = subBreed?.value
      const numberInfo = number?.value
      breedRef.current.controlRef.style.border = '1px solid black'
      numberRef.current.controlRef.style.border = '1px solid black'

      const url = `https://dog.ceo/api/breed/${breedInfo}${subBreadInfo ? '/' + subBreadInfo : ''}/images/random/${numberInfo}`
      const { data: { message } } = await axios(url)
      setImages(message)
    }
  }



  return (
    <div className="App">
      <PageHeader
        title="Title"
        className='site-page-header'
      />
      <form onSubmit={e => e.preventDefault()}>
        <div className="search">
          <Select
            value={breed}
            onChange={changeBreedHandler}
            options={breedsOptions}
            ref={breedRef}
          />

          {subBreedOtions.length ? <Select
            value={subBreed}
            onChange={changeSubBreedHandler}
            options={subBreedOtions}
          /> : null}

          <Select
            value={number}
            onChange={changeNumberHandler}
            options={numbers}
            ref={numberRef}
          />

          <Button onClick={handleClick} type="primary" shape="circle" size="large">view</Button>
        </div>
      </form>

      <p style={{ textAlign: 'center' }}>{message}</p>

      <Photos images={images} />

    </div>
  )
}

export default App;
