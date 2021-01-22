import { Box, Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
function App() {
  return (
    <Box as="main">
      <Tabs>
        <TabList>
          <Tab>Create Keys</Tab>
          <Tab>Encrypt</Tab>
          <Tab>Decrypt</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>1</TabPanel>
          <TabPanel>2</TabPanel>
          <TabPanel>3</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;
