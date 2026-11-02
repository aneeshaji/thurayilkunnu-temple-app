import { useColorScheme as useColorSchemeCore } from 'react-native';

export const useColorScheme = () => {
  const coreScheme = useColorSchemeCore();
  return (coreScheme === ('unspecified' as string) || !coreScheme) ? 'light' : coreScheme;
};
