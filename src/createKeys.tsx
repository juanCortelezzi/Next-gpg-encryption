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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function CreateKeysPanel() {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  const { register, handleSubmit, reset, errors } = useForm();
  const onSubmit = (data: any) => {
    const { name, email, password } = data;
    reset();
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
        <Button isFullWidth bg="teal.500" type="submit">
          Create
        </Button>
      </Stack>
    </Container>
  );
}
