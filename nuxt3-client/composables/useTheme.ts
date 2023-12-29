import { type Dictionary, toPairs, flatMap, fromPairs } from 'lodash';
import type { Theme } from '~/interfaces/theme';

// Function to compute the CSS variable name and value pairs
function computeCssVariablePairs(color: string, shade: string, value: string): [string, string] {
  const cssVariableNameBase = `--${color.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
  if (shade) {
    // If a shade is provided, use it to form the variable name
    return [`${cssVariableNameBase}-${shade}`, value];
  } else {
    // If no shade is provided, it's the default variable
    return [cssVariableNameBase, value];
  }
}

function configToVariables(config: Theme): Dictionary<string> {
  // Transform the config object into an array of [colorName, shadesObject] pairs.
  const colorPairs = toPairs(config);

  // Map over the color pairs to create CSS variable declarations for each shade.
  const cssVariables = flatMap(colorPairs, ([color, shades]) => {
    // Convert the shades object into an array of [shadeKey, shadeValue] pairs.
    const shadePairs = toPairs(shades);

    // Set the default color to the -500 variant
    const result = [computeCssVariablePairs(color, '', shades['500'])];

    // Map over the shade pairs to create individual CSS variable strings.
    return result.concat(
      shadePairs.map(([shade, value]) => computeCssVariablePairs(color, shade, value)),
    );
  });

  // Convert the array of CSS variable name and value pairs back into an object.
  return fromPairs(cssVariables);
}

export const useTheme = <T>(
  theme: Theme,
): {
  themeVariables: ComputedRef<Dictionary<string>>;
  setTheme: (theme: Theme) => void;
} => {
  const config = ref(theme);

  const themeVariables = computed(() => {
    // Transform the config object into an array of [colorName, shadesObject] pairs.
    return configToVariables(config.value);
  });

  function setTheme(theme: Theme) {
    config.value = theme;
  }

  return {
    themeVariables,
    setTheme,
  };
};
