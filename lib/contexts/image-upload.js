import React, { createContext, useState } from 'react';

const ImageUploadContext = createContext({});

export default ImageUploadContext;

export const ImageUploadContextProvider = ({ children }) => {
  const [images, setImages] = useState(null);

  return (
    <ImageUploadContext.Provider value={{ images, setImages }}>
      {children}
    </ImageUploadContext.Provider>
  );
};
