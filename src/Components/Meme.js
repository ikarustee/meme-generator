import React, {createRef} from 'react'
import { exportComponentAsJPEG, exportComponentAsPNG } from 'react-component-export-image';

function Meme({imageSrc, inputs}) {
    const componentRef = createRef()

//     const params = {
//       html2CanvasOptions: {
//           backgroundColor: null,
//           scrollX: -window.scrollX,
//           scrollY: -window.scrollY,
//           windowWidth: document.documentElement.offsetWidth,
//           windowHeight: document.documentElement.offsetHeight
//       }
// };
  
    return (
      <div className="meme__holder">
        <div id="meme" className="meme" ref={componentRef}> 
          {<img className="meme__image" src={imageSrc} alt="meme" width="100" />}
          <h2 className="top">{inputs.toptext}</h2>
          <h2 className="bottom">{inputs.bottomtext}</h2>
        </div>
        <div className="meme__exporter">
        <button className="btn" onClick={() => exportComponentAsJPEG(componentRef)}>
                Save as JPEG
        </button>
        <button className="btn" onClick={() => exportComponentAsPNG(componentRef)}>
                Save as PNG
        </button>
            </div>
        </div>
    )
  }

  export default Meme;