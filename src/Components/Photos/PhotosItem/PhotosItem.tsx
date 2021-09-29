import React from 'react'

interface PropTypes {
    image : string
}

const PhotosItem:React.FC<PropTypes> = ({image}) => {
    return (
        <div className="image">
            <img width="100%" height="100%" src={image} alt={image} />
        </div>
    )
}

export default PhotosItem
