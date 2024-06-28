import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function Dashboard() {
  return (
    <Flex p={8} flex={1} align={"center"} justify={"center"} minH={"80vh"}>
      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Welcome to the application.
        </Heading>
      </Box>
    </Flex>
  );
}
