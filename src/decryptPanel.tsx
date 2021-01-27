import {
  Container,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputRightElement,
  Button,
  InputGroup,
  Text,
  Box,
} from "@chakra-ui/react";
import DropZone from "./components/dropzone";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { decryptMessage } from "./utils/crypto";

interface IProps {
  file: any[];
  password: string;
  messageFile: any[];
}

function readFileAsText(file: File): Promise<string> {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result as string);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsText(file);
  });
}

export default function EncryptPanel() {
  const [show, setShow] = useState<boolean>(false);
  const [showDecrytedMessage, setShowDecryptedMessage] = useState<string>("");
  const { register, handleSubmit, errors, control, setValue } = useForm();

  const onSubmit = async ({ file: [keyFile], password, messageFile: [messageFile] }: IProps) => {
    const files = [readFileAsText(keyFile), readFileAsText(messageFile)];
    Promise.all(files).then(([key, message]) => {
      decrypt(key, password, message);
    });
  };

  const decrypt = async (key: any, password: string, message: string) => {
    try {
      const decryptedMessage = await decryptMessage(key, password, message);
      setShowDecryptedMessage(decryptedMessage);
    } catch (e) {
      console.log(e);
    }
  };
  const handleClick = () => setShow(!show);

  return (
    <Container maxW="2xl" h="full">
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <FormControl isRequired isInvalid={errors?.file ? true : false}>
          <FormLabel>Private Key</FormLabel>
          <DropZone name="file" control={control} setValue={setValue} />
          <FormErrorMessage>{errors?.file?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors?.password ? true : false}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              ref={register({ required: "This field is required" })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors?.file ? true : false}>
          <FormLabel>Message</FormLabel>
          <DropZone name="messageFile" control={control} setValue={setValue} />
          <FormErrorMessage>{errors?.messageFile?.message}</FormErrorMessage>
        </FormControl>
        <Button isFullWidth bg="teal.500" type="submit">
          Decrypt Message
        </Button>
      </Stack>
      <Box my={6} borderWidth="1px" borderRadius="lg" p={6}>
        <Text>{showDecrytedMessage ? showDecrytedMessage : null}</Text>
      </Box>
    </Container>
  );
}
