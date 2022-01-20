import React, {createRef} from 'react'
import { exportComponentAsJPEG, exportComponentAsPNG } from 'react-component-export-image';

function Meme({imageSrc, inputs, boxCount, getRandomImage}) {
    const componentRef = createRef()

    // console.log(allMemes[0].box_count)
    // console.log(meme)

    const params = {
      html2CanvasOptions: {
          backgroundColor:'transparent',
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight
      }
};
  
    return (
      <div className="meme__holder">
      {boxCount === 2 ? (
        <div id="meme" className="meme" ref={componentRef}> 
          {<img className="meme__image" src={imageSrc} alt="meme" width="100" />}
          <h2 className="top">{inputs.toptext}</h2>
          <h2 className="bottom">{inputs.bottomtext}</h2>
        </div>
        ) : (
          <div>Click "Change image" again</div>
        )
      }
        <div className="meme__exporter">
        <button className="btn" onClick={() => exportComponentAsJPEG(componentRef, params)}>
                Save as JPEG
        </button>
        <button className="btn" onClick={() => exportComponentAsPNG(componentRef, params)}>
                Save as PNG
        </button>
            </div>
        </div>
    )
  }

  export default Meme;