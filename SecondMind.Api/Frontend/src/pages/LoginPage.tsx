import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthResponse } from "../types/AuthResponse";
import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  Fieldset,
  Stack,
  Field,
  Input,
  Flex,
  InputGroup,
} from "@chakra-ui/react";
import { login } from "@/services/AuthService";
import { LuClipboard, LuLock, LuLogIn, LuMail } from "react-icons/lu";
import { useTranslation } from "react-i18next";

interface LoginPageProps {
  onLogin: (auth: AuthResponse) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const auth = await login(email, password);
      onLogin(auth);
      navigate("/dashboard"); // nach Login direkt Dashboard
    } catch {
      setError(t("LoginPage_ErrorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      p="page_padding"
      bg="bg.app"
    >
      <Box
        bg="bg.panel" // Dunklerer Hintergrund für modernen Look
        p="page_padding"
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="l_card"
        boxShadow="2xl"
        w="full"
        maxW="app_width"
      >
        <VStack gap={{ base: 6, md: 8 }} align="stretch">
          <VStack gap={2} textAlign="center">
            <Heading
              size={{ base: "xl", md: "2xl" }}
              color="text.main"
              letterSpacing="tight"
            >
              {t("LoginPage_LoginTitle")}
            </Heading>
            <Text color="text.muted" fontSize="sm">
              {t("LoginPage_LoginHelperTitle")}
            </Text>
          </VStack>

          {error && (
            <Box
              bg="red.500/10"
              p={3}
              borderRadius="md"
              border="1px solid"
              borderColor="red.500/30"
            >
              <Text
                color="red.500"
                fontSize="xs"
                textAlign="center"
                fontWeight="medium"
              >
                {error}
              </Text>
            </Box>
          )}

          <form onSubmit={handleLogin}>
            <Fieldset.Root border="none" p={0}>
              <Fieldset.Content gap={4}>
                <Field.Root>
                  <Field.Label color="text.main" fontSize="sm">
                    {t("InputForms_Label_Email")}
                  </Field.Label>
                  <InputGroup w="full" startElement={<LuMail />}>
                    <Input
                      name="email"
                      type="email"
                      placeholder="mail@example.com"
                      variant="subtle"
                      bg="bg.app" // Input etwas absetzen vom Panel
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </Field.Root>

                <Field.Root>
                  <Field.Label color="text.main" fontSize="sm">
                    {t("InputForms_Label_Password")}
                  </Field.Label>
                  <InputGroup w="full" startElement={<LuLock />}>
                    <Input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      variant="subtle"
                      bg="bg.app"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Field.Root>

                <Stack direction={{ base: "column", sm: "row" }} gap={3} pt={4}>
                  <Button
                    loading={isLoading}
                    flex={1}
                    type="submit"
                    bg="brand.solid" // Dein Cyan-Token
                    color="black" // Schwarz auf Cyan bietet meist besten Kontrast
                    borderRadius="l_button"
                    _hover={{ opacity: 0.9, transform: "translateY(-1px)" }}
                    transition="all 0.2s"
                  >
                    {t("LoginPage_Buttons_Login")} <LuLogIn />
                  </Button>

                  <Button
                    flex={1}
                    variant="outline"
                    borderColor="border.subtle"
                    color="text.main"
                    borderRadius="l_button"
                    onClick={() => navigate("/register")}
                    _hover={{ opacity: 0.9, transform: "translateY(-1px)" }}
                  >
                    {t("InputForms_Buttons_Register")} <LuClipboard />
                  </Button>
                </Stack>
              </Fieldset.Content>
            </Fieldset.Root>
          </form>
        </VStack>
      </Box>
    </Flex>
  );
};
