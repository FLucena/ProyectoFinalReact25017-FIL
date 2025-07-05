import { useEffect, useCallback } from 'react';
import { createLCPPreload, isExternalImage, getProxiedImageUrl } from '../utils/imageProxy';

/**
 * Hook personalizado para optimización de LCP (Largest Contentful Paint)
 * @param {Array} images - Array de URLs de imágenes a optimizar
 * @param {Object} options - Opciones de optimización
 * @returns {Object} - Utilidades de optimización LCP
 */
export const useLCPOptimization = (images = [], options = {}) => {
  const {
    preloadCount = 4,
    priority = 'high',
    cleanup = true,
    timeout = 10000
  } = options;

  // Precargar imágenes críticas para LCP
  const preloadCriticalImages = useCallback((imageUrls) => {
    if (!imageUrls || imageUrls.length === 0) return;

    // Precargar la primera imagen con máxima prioridad
    const firstImage = imageUrls[0];
    if (firstImage) {
      createLCPPreload(firstImage, {
        priority: 'high',
        cleanup,
        timeout: timeout * 2 // Timeout más largo para imagen LCP
      });
    }

    // Precargar las siguientes imágenes con menor prioridad
    const nextImages = imageUrls.slice(1, preloadCount);
    nextImages.forEach((imageUrl, index) => {
      if (imageUrl) {
        createLCPPreload(imageUrl, {
          priority: index === 0 ? 'high' : 'auto',
          cleanup,
          timeout
        });
      }
    });
  }, [preloadCount, cleanup, timeout]);

  // Optimizar una imagen individual para LCP
  const optimizeImage = useCallback((imageUrl, imageOptions = {}) => {
    if (!imageUrl) return null;

    const finalUrl = isExternalImage(imageUrl) 
      ? getProxiedImageUrl(imageUrl)
      : imageUrl;

    return {
      url: finalUrl,
      attributes: {
        fetchpriority: imageOptions.fetchpriority || 'high',
        loading: imageOptions.loading || 'eager',
        crossorigin: isExternalImage(imageUrl) ? 'anonymous' : undefined,
        width: imageOptions.width || 300,
        height: imageOptions.height || 169,
        aspectRatio: imageOptions.aspectRatio || '16/9'
      }
    };
  }, []);

  // Auto-precarga cuando las imágenes cambian
  useEffect(() => {
    if (images && images.length > 0) {
      preloadCriticalImages(images);
    }
  }, [images, preloadCriticalImages]);

  return {
    preloadCriticalImages,
    optimizeImage,
    isExternalImage
  };
};

/**
 * Hook para optimizar la primera imagen como LCP
 * @param {string} imageUrl - La URL de la imagen a optimizar
 * @param {Object} options - Opciones de optimización
 * @returns {Object} - Datos de imagen optimizada
 */
export const useLCPImage = (imageUrl, options = {}) => {
  const {
    width = 300,
    height = 169,
    aspectRatio = '16/9'
  } = options;

  useEffect(() => {
    if (imageUrl) {
      createLCPPreload(imageUrl, {
        priority: 'high',
        cleanup: true,
        timeout: 15000
      });
    }
  }, [imageUrl]);

  return {
    url: imageUrl,
    attributes: {
      fetchpriority: 'high',
      loading: 'eager',
      crossorigin: isExternalImage(imageUrl) ? 'anonymous' : undefined,
      width,
      height,
      aspectRatio
    },
    isExternal: isExternalImage(imageUrl)
  };
}; 