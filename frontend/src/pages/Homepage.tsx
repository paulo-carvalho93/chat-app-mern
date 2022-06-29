import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

export interface HomepageProps {}

export default function Homepage(props: HomepageProps) {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="2.5rem 0 1rem 0"
        borderRadius="lg"
        borderWidth="0.063rem"
      >
        <Text fontSize="4xl" fontFamily="Roboto" color="black">
          Chat App
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="0.063rem"
        color="black"
      >
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{/* <Login /> */}</TabPanel>
            <TabPanel>{/* <SignUp /> */}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
