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
    const fallbackImg = allMemes.filter((m) => m.box_count === 2).map((url) => url)
    const randomFallBackImage = fallbackImg[Math.floor(Math.random() * fallbackImg.length)]
    // console.log(fallbackImg[Math.floor(Math.random() * fallbackImg.length)])
    // console.log(randomFallBackImage)

    if(box_count === 2) {
    setMeme((prev) => ({
      ...prev, 
      randomImg: url
    }))} else {
      setMeme((prev) => ({
        ...prev, 
        randomImg: randomFallBackImage.url,
      }))
    }
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
    <Meme imageSrc={meme.randomImg} boxCount={meme.box_count} inputs={meme} allMemes={allMemes} />
    </main>
    </div>
  );
}

export default App;