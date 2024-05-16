/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, {useState} from 'react';

export function ImageGallery({images}) {
  const [activeImage, setActiveImage] = useState(
    images.length > 0 ? images[0].url : '',
  );
  console.log('activeImage: ', activeImage);

  const handleImageClick = (url) => {
    setActiveImage(url);
  };

  return (
    <div className="flex flex-row gap-2 w-[40%] mx-auto justify-center">
      <div className="flex flex-col gap-3 w-[15%]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`overflow-hidden object-cover object-center h-25 md:w-32 md:h-32 lg:w-20 lg:h-20 rounded-lg cursor-pointer ${
              activeImage === image.url ? 'border-4 border-yellow-300' : ''
            }`}
            onClick={() => handleImageClick(image.url)} // Add onClick handler to update active image
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index}`}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <div className="flex flex-grow justify-center items-center">
          <div>
            <img
              src={activeImage}
              alt="Main Display"
              className="rounded-lg shadow-lg"
              style={{width: '100%', height: 'auto'}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
