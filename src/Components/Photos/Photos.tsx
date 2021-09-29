import React from 'react'
import PhotosList from './PhotosList/PhotosList'

interface PropTypes {
    images : string[] | undefined
}

const Photos:React.FC<PropTypes> = ({images}) => {
    return (
        <div className="PhotosList">
            <PhotosList images={images} />
        </div>
    )
}

export default Photos
