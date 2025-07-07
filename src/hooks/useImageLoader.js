import { useState, useEffect, useCallback } from 'react';
import { isExternalImage, getProxiedImageUrl, preloadImage } from '../utils/imageProxy';

/**
 * Custom hook for loading images with CORS handling and third-party cookie prevention
 * @param {string} src - The image source URL
 * @param {Object} options - Additional options
 * @returns {Object} - Loading state and image data
 */
export const useImageLoader = (src, options = {}) => {
  const {
    fallbackSrc = "/game-placeholder.webp",
    useProxy = true,
    preload = false
  } = options;

  const [imageState, setImageState] = useState({
    src: null,
    loading: true,
    error: false,
    loaded: false
  });

  const loadImage = useCallback(async (imageSrc) => {
    if (!imageSrc) {
      setImageState({
        src: fallbackSrc,
        loading: false,
        error: false,
        loaded: true
      });
      return;
    }

    setImageState(prev => ({ ...prev, loading: true, error: false }));

    try {
      // Determinar la URL final de la imagen
      let finalSrc = imageSrc;
      
      if (useProxy && isExternalImage(imageSrc)) {
        finalSrc = getProxiedImageUrl(imageSrc);
      }

              // Precargar la imagen si se solicita
      if (preload) {
        await preloadImage(finalSrc);
      }

      setImageState({
        src: finalSrc,
        loading: false,
        error: false,
        loaded: true
      });
    } catch (error) {
      console.warn('Failed to load image:', imageSrc, error);
      setImageState({
        src: fallbackSrc,
        loading: false,
        error: true,
        loaded: true
      });
    }
  }, [fallbackSrc, useProxy, preload]);

  useEffect(() => {
    loadImage(src);
  }, [src, loadImage]);

  const reload = useCallback(() => {
    loadImage(src);
  }, [src, loadImage]);

  return {
    ...imageState,
    reload,
    isExternal: isExternalImage(src)
  };
};

/**
 * Hook for loading multiple images with CORS handling
 * @param {string[]} srcs - Array of image source URLs
 * @param {Object} options - Additional options
 * @returns {Object} - Loading state and image data
 */
export const useMultipleImageLoader = (srcs, options = {}) => {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!srcs || srcs.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    const loadImages = async () => {
      const imagePromises = srcs.map(async (src, index) => {
        try {
          const imageLoader = useImageLoader(src, options);
          return { index, src, ...imageLoader };
        } catch (error) {
          console.warn(`Failed to load image ${index}:`, src, error);
          return { 
            index, 
            src, 
            src: options.fallbackSrc || "/placeholder.svg",
            loading: false,
            error: true,
            loaded: true
          };
        }
      });

      try {
        const results = await Promise.allSettled(imagePromises);
        const loadedImages = {};
        
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            loadedImages[index] = result.value;
          } else {
            loadedImages[index] = {
              index,
              src: srcs[index],
              src: options.fallbackSrc || "/placeholder.svg",
              loading: false,
              error: true,
              loaded: true
            };
          }
        });

        setImages(loadedImages);
        setError(false);
      } catch (error) {
        console.error('Failed to load multiple images:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [srcs, options]);

  return {
    images,
    loading,
    error,
    allLoaded: !loading && Object.keys(images).length > 0
  };
}; 