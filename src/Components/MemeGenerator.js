import React from 'react'

const MemeGenerator = ({meme, setMeme, getRandomImage, handleChange, resetSettings}) => {

    const onChangeHandler = (event) => {
        // Define custom image variable
        const customImage = event.target.files[0]
        setMeme((prev) => ({
            ...prev,
            randomImg: URL.createObjectURL(customImage) // creates DOMstring which represents the object
        }))
    
    }
    return (
        <div className="meme__generator">
            <form onSubmit={getRandomImage} >
                <fieldset>
                    <label htmlFor="toptext">Top text
                    </label>
                    <input
                    type="text"
                    id="toptext"
                    name="toptext"
                    placeholder="Type something"
                    onChange={handleChange}
                    onFocus={(e) => e.target.placeholder = ''}
                    onBlur={(e) => e.target.placeholder = 'Type something'}
                    value={meme.toptext}
                    />
                </fieldset>
                <fieldset>
                <label htmlFor="bottomtext">Bottom text
                    </label>
                    <input
                    type="text"
                    id="bottomtext"
                    name="bottomtext"
                    placeholder="Type something"
                    onChange={handleChange}
                    onFocus={(e) => e.target.placeholder = ''}
                    onBlur={(e) => e.target.placeholder = 'Type something'}
                    value={meme.bottomtext}
                    />
                </fieldset>
                </form>
                <div className="meme__uploader">
                <button type="submit" onClick={(e) => getRandomImage(e)}>Change image</button>
                    <label htmlFor="file" className="button">Select own image</label>
                    <input 
                    id="file"
                    className="upload"
                    type="file" 
                    name="file" 
                    onChange={onChangeHandler}
                    style={{display: 'none'}}
                    />
                    <button className="meme__reset" type="submit" onClick={resetSettings}>♻️ Reset all</button>
                </div>
        </div>
    )
}

export default MemeGenerator
