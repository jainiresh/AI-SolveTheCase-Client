// components/Image.tsx
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import React from 'react';

// Define the type for the props, extending NextImageProps
type ImageProps = Omit<NextImageProps, 'loader'>;

const customLoader = ({ src }: { src: string }) => {
  return src;
};

const Image: React.FC<ImageProps> = (props) => {
  return (
    <NextImage
      {...props}
      loader={customLoader}
    />
  );
};

export default Image;
