import { MantineProvider, localStorageColorSchemeManager } from "@mantine/core";
import { theme } from "./theme";

import Layout from "./components/Layout";

import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

function App() {
  const colorSchemeManager = localStorageColorSchemeManager({
    key: "notesmd-color-scheme",
  });

  return (
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme={"auto"}
      withGlobalStyles
      withNormalizeCSS
    >
      <Layout />
    </MantineProvider>
  );
}

export default App;