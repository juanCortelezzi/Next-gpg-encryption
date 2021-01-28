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
  useRadioGroup,
  HStack,
} from "@chakra-ui/react";
import RadioCard from "./components/RadioCard";
import { MdFileDownload } from "react-icons/md";
import DropZone from "./components/dropzone";
import { useForm } from "react-hook-form";
import { encryptMessage } from "./utils/crypto";
import { useState } from "react";
import { createFileURL } from "./utils/createFileURL";
import readFileAsText from "./utils/readFileAsText";

interface IProps {
  file: File[];
  message: string | File[];
}

export default function EncryptPanel() {
  const [encryptedMessageValue, setEncryptedMessageValue] = useState<string>("");
  const [radioValue, setRadioValue] = useState<"File" | "Text">("File");
  const { hasCopied, onCopy } = useClipboard(encryptedMessageValue);
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const onSubmit = async ({ file: [keyFile], message }: IProps) => {
    if (typeof message === "string") {
      const files = [readFileAsText(keyFile)];
      Promise.all(files).then(([key]) => {
        encrypt(key, message);
      });
      return;
    }
    const files = [readFileAsText(keyFile), readFileAsText(message[0])];
    Promise.all(files).then(([key, message]) => {
      encrypt(key, message);
    });
  };
  const encrypt = async (key: string, message: string) => {
    try {
      const encryptedMessage = await encryptMessage(key, message);
      setEncryptedMessageValue(encryptedMessage);
    } catch (e) {
      console.log(e);
    }
  };
  const options = ["File", "Text"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "message",
    defaultValue: "File",
    onChange: (e: "File" | "Text") => setRadioValue(e),
  });
  const group = getRootProps();
  return (
    <Container maxW="2xl" h="full">
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <FormControl isRequired isInvalid={errors?.file ? true : false}>
          <FormLabel>Public Key</FormLabel>
          <DropZone name="file" control={control} setValue={setValue} />
          <FormErrorMessage>{errors?.file && "No file selected"}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Type of message</FormLabel>
          <HStack {...group}>
            {options.map((value: any) => {
              //@ts-ignore
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
        </FormControl>
        {radioValue === "File" ? (
          <FormControl isRequired isInvalid={errors?.message ? true : false}>
            <FormLabel>Message</FormLabel>
            <DropZone name="message" control={control} setValue={setValue} />
            <FormErrorMessage>{errors?.message && "No file selected"}</FormErrorMessage>
          </FormControl>
        ) : (
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
        )}

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
