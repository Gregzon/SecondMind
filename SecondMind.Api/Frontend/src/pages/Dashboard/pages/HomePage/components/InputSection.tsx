import {
  Box,
  Flex,
  Heading,
  Icon,
  Textarea,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { LuMic, LuSend } from "react-icons/lu";

const InputSection = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isTyping = inputValue.trim().length > 0;

  // Auto-Resize Logik für die Textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleAction = () => {
    if (isTyping) {
      console.log("Send text: ", inputValue);
      setInputValue("");
    } else {
      console.log("Start record");
    }
  };

  return (
    <VStack align="stretch" gap={3}>
      <Heading
        as="h2"
        size="md"
        fontWeight="bold"
        color="text.main"
        letterSpacing="tight"
      >
        {t("Dashboard_InputSection_Title")}
      </Heading>

      <Flex
        bg="bg.panel"
        borderRadius="l_card" // Konsistent mit dem Rest der App
        borderWidth="1px"
        borderColor="border.subtle"
        overflow="hidden"
        boxShadow="lg"
        transition="border-color 0.2s"
        _focusWithin={{ borderColor: "brand.solid" }}
      >
        <Box flex="1" p="3">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t(
              "Dashboard_InputPlaceholder",
              "Notizen, Aufgaben, Ideen ...",
            )}
            variant="flushed" // Entfernt Standard-Styles von Chakra
            fontSize="md"
            color="text.main"
            _placeholder={{ color: "text.muted" }}
            rows={1}
            minH="45px"
            maxH="200px"
            resize="none"
            py="2"
            px="2"
          />
        </Box>

        <Flex
          as="button"
          onClick={handleAction}
          bg={isTyping ? "brand.solid" : "bg.app"}
          w="80px"
          direction="column"
          align="center"
          justify="center"
          transition="all 0.3s ease"
          _hover={{ opacity: 0.9 }}
          _active={{ transform: "scale(0.95)" }}
        >
          <Icon
            as={isTyping ? LuSend : LuMic}
            w="5"
            h="5"
            color={isTyping ? "black" : "brand.solid"}
            mb={1}
          />
          <Text
            fontSize="10px"
            color={isTyping ? "black" : "text.muted"}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            {isTyping ? "Senden" : "Audio"}
          </Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default InputSection;
