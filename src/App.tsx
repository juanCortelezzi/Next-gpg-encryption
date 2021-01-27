import { Box, Tabs, Tab, TabList, TabPanels, TabPanel, Text } from "@chakra-ui/react";
import CreateKeysPanel from "./createKeysPanel";
import DecryptPanel from "./decryptPanel";
import EncryptPanel from "./encryptPanel";
function App() {
  return (
    <Box as="main">
      <Tabs isManual isFitted variant="enclosed">
        <TabList>
          <Tab>
            <Text fontSize="xl">Create Keys</Text>
          </Tab>
          <Tab>
            <Text fontSize="xl">Encrypt</Text>
          </Tab>
          <Tab>
            <Text fontSize="xl">Decrypt</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CreateKeysPanel />
          </TabPanel>
          <TabPanel>
            <EncryptPanel />
          </TabPanel>
          <TabPanel>
            <DecryptPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;
