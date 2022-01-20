import './App.css';
import {useState, useEffect, createRef} from "react"
import Meme from "./Components/Meme"
import Header from './Components/Header';
import MemeGenerator from './Components/MemeGenerator';

function App() {
  const [allMemes, setAllMemes] = useState([])
  const [meme, setMeme] = useState({
      toptext: '',
      bottomtext: '',
      randomImg: 'https://i.imgflip.com/39t1o.jpg',
      box_count: 2
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
    const box_count = allMemes[random].box_count
    setMeme((prev) => ({
      ...prev, 
      randomImg: url,
      box_count: box_count
    }))
  }

  const handleChange = (e) => {
    setMeme((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

const resetSettings = () => {
  setMeme({
    toptext: '',
    bottomtext: '',
    randomImg: 'https://i.imgflip.com/39t1o.jpg'
  })
}

  return (
    <div className="App">
    <Header />
    <main>
    <MemeGenerator meme={meme} setMeme={setMeme} getRandomImage={getRandomImage} handleChange={handleChange} resetSettings={resetSettings} />
    <Meme imageSrc={meme.randomImg} boxCount={meme.box_count} inputs={meme} allMemes={allMemes} getRandomImage={getRandomImage} />
    </main>
    </div>
  );
}

export default App;