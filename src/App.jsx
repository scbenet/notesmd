
import { MantineProvider } from '@mantine/core';
import Layout from './components/Layout';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'light' }}>
      <Layout />
    </MantineProvider>
  );
}

export default App;