import {
  Container,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Textarea,
  useClipboard,
  Flex,
  Link,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { MdFileDownload } from "react-icons/md";
import DropZone from "./components/dropzone";
import { useForm } from "react-hook-form";
import { encryptMessage } from "./utils/crypto";
import { useState } from "react";
import { createFileURL } from "./utils/createFileURL";

interface IProps {
  file: any;
  message: string;
}

export default function EncryptPanel() {
  const [encryptedMessageValue, setEncryptedMessageValue] = useState<string>("");
  const { hasCopied, onCopy } = useClipboard(encryptedMessageValue);
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const onSubmit = async ({ file: [key], message }: IProps) => {
    const reader = new FileReader();
    reader.readAsText(key);
    reader.onload = () => {
      encrypt(reader.result as string, message);
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
  };
  const encrypt = async (key: string, message: string) => {
    try {
      const encryptedMessage = await encryptMessage(key, message);
      setEncryptedMessageValue(encryptedMessage);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxW="2xl" h="full">
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <FormControl isRequired isInvalid={errors?.file ? true : false}>
          <FormLabel>Public Key</FormLabel>
          <DropZone name="file" control={control} setValue={setValue} />
          <FormErrorMessage>{errors?.file?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors?.message ? true : false}>
          <FormLabel>Message</FormLabel>
          <Textarea
            resize="vertical"
            placeholder="Write the message to encrypt"
            size="sm"
            name="message"
            ref={register({ required: "This field is required" })}
          />
        </FormControl>
        <Button isFullWidth bg="teal.500" type="submit">
          Encrypt Message
        </Button>
        {encryptedMessageValue ? (
          <Flex justifi="center" align="center">
            <Spacer />
            <Link
              href={createFileURL(encryptedMessageValue)}
              isExternal
              download="encryptedMessage.txt"
            >
              <Button leftIcon={<Icon as={MdFileDownload} w={6} h={6} />} bg="teal.500">
                Download
              </Button>
            </Link>
            <Spacer />
            <Text>Or</Text>
            <Spacer />
            <Button bg="teal.500" onClick={onCopy}>
              {hasCopied ? "Copied" : "Copy message"}
            </Button>
            <Spacer />
          </Flex>
        ) : null}
      </Stack>
    </Container>
  );
}
