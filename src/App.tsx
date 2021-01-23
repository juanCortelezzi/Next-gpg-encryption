import { Box, Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import CreateKeysPanel from "./createKeysPanel";
function App() {
  return (
    <Box as="main">
      <Tabs isManual isFitted variant="enclosed">
        <TabList>
          <Tab>Create Keys</Tab>
          <Tab>Encrypt</Tab>
          <Tab>Decrypt</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CreateKeysPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;
