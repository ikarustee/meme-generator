import './App.css';
import {useState, useEffect, createRef} from "react"
import { exportComponentAsJPEG, exportComponentAsPNG } from 'react-component-export-image';


function App() {
  const [allMemes, setAllMemes] = useState([])
  const [meme, setMeme] = useState({
      topText: '',
      bottomText: '',
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

  const getRandomImage = () => {
    const random = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[random].url
    setMeme((prev) => ({...prev, randomImg: url}))
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setMeme((prev) => ({...prev, [name]: value}))
  }

  return (
    <div className="App">
    <form onSubmit={handleSubmit} >
      <input
      type="text"
      name="toptext"
      placeholder="Add text"
      onChange={handleChange}
      value={inputs.toptext}
       />
      <input
      type="text"
      name="bottomtext"
      placeholder="Add text"
      onChange={handleChange}
      value={inputs.bottomtext}
       />

       <button type="submit" onClick={() => changeImage()}>Change image</button>

    </form>
    <Meme imageSrc={imageSrc} inputs={inputs}/>
    </div>
  );
}

export default App;

function Meme({imageSrc, inputs}) {
  const componentRef = createRef()

  return (
    <div className="meme__holder">
    <div className="meme" ref={componentRef}>
      {<img className="meme__image" src={imageSrc} alt="meme" width="100" />}
      <h2 className="top">{inputs.toptext}</h2>
      <h2 className="bottom">{inputs.bottomtext}</h2>
  </div>
  <button onClick={() => exportComponentAsJPEG(componentRef)}>
          Save as JPEG
        </button>
  <button onClick={() => exportComponentAsPNG(componentRef)}>
          Save as PNG
        </button>
      </div>
  )
}
