import { Button, Flex, Link, Heading } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
interface IProps {
  header: string;
  keyLink: string;
  filename: string;
}
export default function KeyPost({ header, keyLink, filename }: IProps) {
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      justifi="center"
      align="center"
      direction="column"
    >
      <Heading mb={4}>{header}</Heading>
      <Link href={keyLink} isExternal download={filename}>
        <Button leftIcon={<DownloadIcon />} bg="teal.500">
          Download
        </Button>
      </Link>
    </Flex>
  );
}
