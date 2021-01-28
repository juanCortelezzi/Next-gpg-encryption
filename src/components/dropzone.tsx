import { Text, Flex, Icon, Box, Spacer, IconButton } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { Control, Controller } from "react-hook-form";
import { MdCloudUpload, MdRefresh } from "react-icons/md";
interface IProps {
  control: Control;
  name: string;
  setValue: any;
}
export default function DropZone({ control, name, setValue }: IProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      rules={{ validate: { filled: (value) => value.length === 1 } }}
      render={({ onChange, onBlur, value }) => (
        <>
          {value[0] ? (
            <Box borderWidth="1px" borderRadius="lg" bg="gray.700" p={6}>
              <Flex justify="center" align="center">
                <Text fontSize="lg">{value[0].name}</Text>
                <Spacer />
                <IconButton
                  aria-label="Change Key"
                  fontSize="20px"
                  icon={<MdRefresh />}
                  onClick={() => {
                    setValue(name, []);
                  }}
                />
              </Flex>
            </Box>
          ) : (
            <Dropzone onDrop={onChange}>
              {({ getRootProps, getInputProps }) => (
                <Flex
                  {...getRootProps()}
                  justify="center"
                  align="center"
                  direction="column"
                  borderWidth="1px"
                  borderRadius="lg"
                  p={6}
                  _hover={{ cursor: "pointer" }}
                  bg="gray.700"
                >
                  <input {...getInputProps()} onBlur={onBlur} />
                  <Icon as={MdCloudUpload} w={20} h={20} />
                  <Text fontSize="lg">Drag n' Drop file, or click to select</Text>
                </Flex>
              )}
            </Dropzone>
          )}
        </>
      )}
    />
  );
}
