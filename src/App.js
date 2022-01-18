import './App.css';
import {useState, useEffect, createRef} from "react"
import { exportComponentAsJPEG, exportComponentAsPNG } from 'react-component-export-image';


function App() {
  const [memes, setMemes] = useState({})
  const [inputs, setInputs] = useState({toptext: '', bottomtext: ''})
  const random = Math.floor(Math.random() * 100)
  let imageSrc = memes.url
  
  // useEffect(() => {
  //   fetch('https://api.imgflip.com/get_memes')
  //   .then((res) => res.json())
  //   .then((res) => setMemes(res.data.memes[random]))
  // },[])
  
  useEffect(() => {
    async function getMemes() {
    const res = await fetch('https://api.imgflip.com/get_memes')
    const data = await res.json()
    setMemes(data.data.memes)
  } 
    getMemes()
  }, [])

  function getRandomImage() {
    const randomNumber = Math.floor(Math.random() * memes.length)
    const url = memes[randomNumber].url
    setMemes(prevMeme => ({
        ...prevMeme,
        randomImage: url
    }))
  }

  const handleChange = (event) => {
    setInputs((p) => ({...p, [event.target.name]: event.target.value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setInputs('')
  }

  const changeImage = () => {
    const rand = memes[Math.floor(Math.random() * memes.length)]
    console.log(memes)
    // setMemes(rand)
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

       <button type="submit" onClick={() => getRandomImage()}>Change image</button>

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
