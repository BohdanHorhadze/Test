import React, { ReactElement } from 'react'
import { JsxElement } from 'typescript'
import PhotosItem from '../PhotosItem/PhotosItem'

interface PropTypes {
    images : string[] | undefined
}

const PhotosList:React.FC<PropTypes> = ({ images }) => {

    const renderImages = () : ReactElement[] | undefined => {
        if(images){
            return images.map((image, i) => {
                return (
                    <PhotosItem key={image + i} image={image} />
                )
            })
        }
    }

    return (
        <div>
            <div className="images">
                {renderImages()}
            </div>
        </div>
    )
}

export default PhotosList
