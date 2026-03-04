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
import { t } from "i18next";

interface LoginPageProps {
  onLogin: (auth: AuthResponse) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const auth = await login(email, password);
      onLogin(auth);
      navigate("/dashboard"); // nach Login direkt Dashboard
    } catch {
      setError(t("LoginPage_ErrorMessage"));
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" p={4} bg="gray.950">
      <Box
        bg="gray.900" // Dunklerer Hintergrund für modernen Look
        p={{ base: 6, md: 10 }}
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        borderRadius="xl" // Fix: xl statt x1
        boxShadow="2xl"
        w="full"
        maxW="450px" // Besser als 40%
      >
        <VStack gap={8} align="stretch">
          <VStack gap={2}>
            <Heading size="2xl" color="white" textAlign="center">
              {t("LoginPage_LoginTitle")}
            </Heading>
            <Text color="gray.400" fontSize="sm" textAlign="center">
              {t("LoginPage_LoginHelperTitle")}
            </Text>
          </VStack>

          {error && (
            <Box
              bg="red.500/10"
              p={3}
              borderRadius="md"
              border="1px solid"
              borderColor="red.500/20"
            >
              <Text color="red.500" fontSize="sm" textAlign="center">
                {error}
              </Text>
            </Box>
          )}

          <form onSubmit={handleLogin}>
            <Fieldset.Root>
              <Fieldset.Content gap={4}>
                <Field.Root>
                  <Field.Label color="gray.300">
                    {t("InputForms_Label_Email")}
                  </Field.Label>
                  <InputGroup w="full" startElement={<LuMail color="gray" />}>
                    <Input
                      name="email"
                      type="email"
                      placeholder="mail@example.com"
                      variant="subtle"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </Field.Root>

                <Field.Root>
                  <Field.Label color="gray.300">
                    {t("InputForms_Label_Password")}
                  </Field.Label>
                  <InputGroup w="full" startElement={<LuLock color="gray" />}>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Passwort eingeben..."
                      variant="subtle"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Field.Root>

                <Stack direction={{ base: "column", sm: "row" }} gap={4} pt={4}>
                  <Button
                    flex={1}
                    type="submit" // Submit Typ für handleLogin
                    bg="cyan.400"
                    color="black"
                    _hover={{ bg: "cyan.500" }}
                  >
                    {t("LoginPage_Buttons_Login")} <LuLogIn />
                  </Button>
                  <Button
                    flex={1}
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="white"
                    onClick={() => navigate("/register")}
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

export default LoginPage;
