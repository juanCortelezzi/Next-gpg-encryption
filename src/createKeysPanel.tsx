import {
  Button,
  Stack,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Spacer,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createKeyPair } from "./utils/crypto";
import KeyPost from "./components/keyPost";
import { createFileURL } from "./utils/createFileURL";

interface ISubmitProps {
  name: string;
  email: string;
  password: string;
}

interface IKeyData {
  loading: boolean;
  publicKeyURL: string;
  privateKeyURL: string;
  name: string;
}

interface IAlertData {
  open: boolean;
  message: string;
}

export default function CreateKeysPanel() {
  const [show, setShow] = useState<boolean>(false);
  const [alertError, setAlertError] = useState<IAlertData>({ open: false, message: "" });
  const [keyData, setKeyData] = useState<IKeyData>({
    loading: false,
    publicKeyURL: "",
    privateKeyURL: "",
    name: "",
  });
  const handleClick = () => setShow(!show);
  const { register, handleSubmit, reset, errors } = useForm();
  const onSubmit = async ({ name, email, password }: ISubmitProps) => {
    setKeyData({ loading: true, publicKeyURL: "", privateKeyURL: "", name: "" });
    try {
      const { privateKeyArmored, publicKeyArmored } = await createKeyPair(name, email, password);
      const publicURL = createFileURL(publicKeyArmored);
      const privateURL = createFileURL(privateKeyArmored);
      setKeyData({ loading: false, publicKeyURL: publicURL, privateKeyURL: privateURL, name });
      reset();
    } catch (e) {
      setAlertError({ open: true, message: "Invalid Email" });
      setKeyData({ loading: false, publicKeyURL: "", privateKeyURL: "", name: "" });
    }
  };
  return (
    <Container maxW="2xl" h="full">
      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <FormControl isRequired isInvalid={errors?.name ? true : false}>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            size="md"
            name="name"
            ref={register({ required: "This field is required" })}
          />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors?.email ? true : false}>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="Email"
            size="md"
            name="email"
            ref={register({
              required: "This field is required",
              pattern: { value: /^\S+@\S+$/i, message: "Not an email" },
            })}
          />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
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
        <Button
          isFullWidth
          bg="teal.500"
          type="submit"
          isLoading={keyData.loading}
          loadingText="Creating"
        >
          Create Key Pair
        </Button>
      </Stack>

      {alertError.open ? (
        <Alert status="error" my={4}>
          <AlertIcon />
          {alertError.message}
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setAlertError({ open: false, message: "" })}
          />
        </Alert>
      ) : null}
      {!keyData.loading && keyData.publicKeyURL && keyData.privateKeyURL ? (
        <Flex align="center" justify="center" my={8}>
          <Spacer />
          <KeyPost
            header="Public Key"
            filename={`${keyData.name}Public.key`}
            keyLink={keyData.publicKeyURL}
          />
          <Spacer />
          <KeyPost
            header="Private Key"
            filename={`${keyData.name}Private.key`}
            keyLink={keyData.privateKeyURL}
          />
          <Spacer />
        </Flex>
      ) : null}
    </Container>
  );
}
