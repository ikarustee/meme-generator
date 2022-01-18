import './App.css';
import {useState, useEffect, createRef} from "react"
import Meme from "./Component/Meme"
import Header from './Component/Header';
import MemeGenerator from './Component/MemeGenerator';

function App() {
  const [allMemes, setAllMemes] = useState([])
  const [meme, setMeme] = useState({
      toptext: '',
      bottomtext: '',
      randomImg: 'https://i.imgflip.com/1g8my4.jpg'
  })

  useEffect(() => {
      async function getMemes() {
          const res = await fetch('https://api.imgflip.com/get_memes')
          const data = await res.json()
          setAllMemes(data.data.memes)
      }
      getMemes()
  },[])

  const getRandomImage = (e) => {
    e.preventDefault()
    const random = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[random].url
    setMeme((prev) => ({
      ...prev, 
      randomImg: url
    }))
  }

  const handleChange = (e) => {
    setMeme((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  // const handleBlur = (e) => {
  //   console.log('on blur')
  //   e.target.place
  // }

  return (
    <div className="App">
    <Header />
    <main>
    <MemeGenerator meme={meme} getRandomImage={getRandomImage} handleChange={handleChange} />
    <Meme imageSrc={meme.randomImg} inputs={meme} allMemes={allMemes}/>
    </main>
    </div>
  );
}

export default App;
