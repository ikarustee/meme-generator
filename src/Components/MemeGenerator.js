import React from 'react'

const MemeGenerator = ({meme, getRandomImage, handleChange}) => {
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
                <button type="submit" onClick={(e) => getRandomImage(e)}>Change image</button>
                </form>            
        </div>
    )
}

export default MemeGenerator
