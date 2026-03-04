import {
  Box,
  Flex,
  Heading,
  Icon,
  Textarea,
  VStack,
  Text,
} from "@chakra-ui/react";
import { t } from "i18next";
import { useState } from "react";
import { LuMic, LuSend } from "react-icons/lu";

const InputSection = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const isTyping: boolean = inputValue.length > 0;

  const sendInputText = (text: string) => {
    console.log("Send text: ", text);
  };

  const startRecord = () => {
    console.log("Start record");
  };

  return (
    <VStack align={"stretch"} gap={4} mt={6}>
      <Heading
        as={"h2"}
        size={"lg"}
        fontWeight={"bold"}
        letterSpacing={"tight"}
      >
        {t("Dashboard_InputSection_Title")}
      </Heading>
      <Flex
        bg={"white"}
        borderRadius={"2xl"}
        overflow={"hidden"}
        boxShadow={"xl"}
      >
        <Box flex={"1"} p={"4"}>
          <Textarea
            color={"bg"}
            placeholder="Notizen, Aufgaben, Ideen ..."
            variant={"flushed"}
            fontSize={"lg"}
            fontWeight={"medium"}
            resize={"none"}
            border={"none"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Box>
        <Flex
          as={"button"}
          bg={"cyan.300"}
          direction={"column"}
          align={"center"}
          justify={"center"}
          transition={"all 0.2s"}
          onClick={() => (isTyping ? sendInputText(inputValue) : startRecord())}
        >
          <Icon
            as={isTyping ? LuSend : LuMic}
            w={"8"}
            h={"8"}
            color={"gray.400"}
            mb={1}
          />
          <Text
            fontSize="xs"
            color={"gray.800"}
            fontWeight={"bold"}
            lineHeight={"shorter"}
            textAlign={"center"}
          >
            {" "}
            {isTyping ? "Speichern" : "Sprachnotiz"}
          </Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default InputSection;
