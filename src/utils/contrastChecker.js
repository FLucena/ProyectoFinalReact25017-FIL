// Utilidad para verificar ratios de contraste para cumplimiento de accesibilidad
// Basado en las pautas WCAG 2.1

/**
 * Calculate relative luminance of a color
 * @param {string} color - Hex color value
 * @returns {number} - Relative luminance value
 */
export const getRelativeLuminance = (color) => {
  // Remover # si está presente
  const hex = color.replace('#', '');
  
  // Convertir a RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // Aplicar corrección gamma
  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
};

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {number} - Contrast ratio
 */
export const getContrastRatio = (color1, color2) => {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if contrast ratio meets WCAG requirements
 * @param {number} ratio - Contrast ratio
 * @param {string} level - WCAG level ('AA' or 'AAA')
 * @param {boolean} isLargeText - Whether text is large (18px+ or 14px+ bold)
 * @returns {boolean} - Whether ratio meets requirements
 */
export const meetsWCAGRequirements = (ratio, level = 'AA', isLargeText = false) => {
  const requirements = {
    AA: {
      normal: 4.5,
      large: 3.0
    },
    AAA: {
      normal: 7.0,
      large: 4.5
    }
  };
  
  const required = requirements[level][isLargeText ? 'large' : 'normal'];
  return ratio >= required;
};

/**
 * Get accessibility status for a color combination
 * @param {string} foreground - Foreground color
 * @param {string} background - Background color
 * @param {boolean} isLargeText - Whether text is large
 * @returns {Object} - Accessibility status
 */
export const getAccessibilityStatus = (foreground, background, isLargeText = false) => {
  const ratio = getContrastRatio(foreground, background);
  
  return {
    ratio: Math.round(ratio * 100) / 100,
    aa: meetsWCAGRequirements(ratio, 'AA', isLargeText),
    aaa: meetsWCAGRequirements(ratio, 'AAA', isLargeText),
    status: meetsWCAGRequirements(ratio, 'AA', isLargeText) ? 'PASS' : 'FAIL'
  };
};

// Combinaciones de colores predefinidas usadas en la aplicación
export const colorCombinations = {
  // Texto primario en fondo claro
  primaryLight: {
    foreground: '#b02a37',
    background: '#f8f9fa',
    description: 'Texto primario en fondo claro'
  },
  
  // Texto secundario en fondo claro
  secondaryLight: {
    foreground: '#495057',
    background: '#f8f9fa',
    description: 'Texto secundario en fondo claro'
  },
  
  // Texto de advertencia en fondo claro
  warningLight: {
    foreground: '#8B4513', // Marrón más oscuro para mejor contraste
    background: '#f8f9fa',
    description: 'Texto de advertencia en fondo claro'
  },
  
  // Texto secundario en fondo oscuro
  secondaryDark: {
    foreground: '#dee2e6',
    background: '#212529',
    description: 'Texto secundario en fondo oscuro'
  },
  
  // Texto blanco en fondo oscuro
  whiteDark: {
    foreground: '#ffffff',
    background: '#212529',
    description: 'Texto blanco en fondo oscuro'
  }
};

/**
 * Test all color combinations used in the app
 * @returns {Object} - Test results
 */
export const testAllColorCombinations = () => {
  const results = {};
  
  Object.entries(colorCombinations).forEach(([key, combo]) => {
    results[key] = {
      ...combo,
      normal: getAccessibilityStatus(combo.foreground, combo.background, false),
      large: getAccessibilityStatus(combo.foreground, combo.background, true)
    };
  });
  
  return results;
};

/**
 * Log accessibility test results to console
 */
export const logAccessibilityResults = () => {
  console.log('🎨 Accessibility Color Contrast Test Results:');
  console.log('=============================================');
  
  const results = testAllColorCombinations();
  
  Object.entries(results).forEach(([key, result]) => {
    console.log(`\n${result.description}:`);
    console.log(`  Normal text: ${result.normal.ratio}:1 (${result.normal.status})`);
    console.log(`  Large text: ${result.large.ratio}:1 (${result.large.status})`);
    console.log(`  WCAG AA: ${result.normal.aa ? '✅' : '❌'}`);
    console.log(`  WCAG AAA: ${result.normal.aaa ? '✅' : '❌'}`);
  });
  
  console.log('\n📊 Summary:');
  const allPass = Object.values(results).every(r => r.normal.aa);
  console.log(`  Overall Status: ${allPass ? '✅ PASS' : '❌ FAIL'}`);
}; 