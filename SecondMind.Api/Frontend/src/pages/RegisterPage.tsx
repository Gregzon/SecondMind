import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Heading,
  VStack,
  Flex,
  Fieldset,
  Stack,
  Field,
  Input,
  Text,
  InputGroup,
} from "@chakra-ui/react";

import { PasswordInput } from "@/components/ui/password-input";
import { LuMail, LuLock, LuUserPlus, LuArrowLeft } from "react-icons/lu";
import { register } from "@/services/AuthService";

import { registerSchema, type RegisterFormData } from "../util/register.schema";

interface RegisterPageProps {
  onLogin: (auth: any) => void;
}

const RegisterPage = ({ onLogin }: RegisterPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const auth = await register(data.registerEmail, data.registerPassword);
      onLogin(auth);
      navigate("/dashboard");
    } catch (error) {
      // TODO: Hier später ein Toast oder lokales Error-State für "Email existiert bereits"
      console.error("Registration failed", error);
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
        bg="bg.panel"
        p="page_padding"
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="l_card"
        boxShadow="2xl"
        w="full"
        maxW="app_width" // Konsistent zur LoginPage
      >
        <VStack gap={{ base: 6, md: 8 }} align="stretch">
          {/* Header */}
          <VStack gap={2} textAlign="center">
            <Box
              bg="brand.solid"
              color="black"
              p={3}
              borderRadius="xl"
              mb={2}
              display="inline-block"
            >
              <LuUserPlus size="24px" />
            </Box>
            <Heading
              size={{ base: "xl", md: "2xl" }}
              color="text.main"
              letterSpacing="tight"
            >
              {t("RegisterPage_RegisterTitle")}
            </Heading>
            <Text color="text.muted" fontSize="sm">
              {t("RegisterPage_RegisterHelperText")}
            </Text>
          </VStack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root border="none" p={0}>
              <Fieldset.Content gap={4}>
                {/* EMAIL */}
                <Field.Root invalid={!!errors.registerEmail}>
                  <Field.Label color="text.main" fontSize="sm">
                    {t("InputForms_Label_Email")}
                  </Field.Label>
                  <InputGroup
                    w="full"
                    startElement={<LuMail color="gray.500" />}
                  >
                    <Input
                      type="email"
                      variant="subtle"
                      bg="bg.app"
                      _focusVisible={{
                        borderColor: "brand.solid",
                        borderWidth: "1px",
                      }}
                      {...formRegister("registerEmail")}
                    />
                  </InputGroup>
                  <Field.ErrorText color="red.400" fontSize="xs">
                    {errors.registerEmail?.message}
                  </Field.ErrorText>
                </Field.Root>

                {/* PASSWORD */}
                <Field.Root invalid={!!errors.registerPassword}>
                  <Field.Label color="text.main" fontSize="sm">
                    {t("InputForms_Label_Password")}
                  </Field.Label>
                  <InputGroup
                    w="full"
                    startElement={<LuLock color="gray.500" />}
                  >
                    <PasswordInput
                      variant="subtle"
                      bg="bg.app"
                      _focusVisible={{
                        borderColor: "brand.solid",
                        borderWidth: "1px",
                      }}
                      {...formRegister("registerPassword")}
                    />
                  </InputGroup>
                  <Field.ErrorText color="red.400" fontSize="xs">
                    {errors.registerPassword?.message}
                  </Field.ErrorText>
                </Field.Root>

                {/* ACTION BUTTONS */}
                <Stack direction={{ base: "column", sm: "row" }} gap={3} pt={4}>
                  <Button
                    flex={1}
                    type="submit"
                    loading={isSubmitting}
                    bg="brand.solid"
                    color="black"
                    borderRadius="l_button"
                    fontWeight="bold"
                    _hover={{ opacity: 0.9, transform: "translateY(-1px)" }}
                  >
                    {t("InputForms_Buttons_Register")}
                  </Button>

                  <Button
                    flex={1}
                    variant="ghost"
                    color="text.muted"
                    borderRadius="l_button"
                    onClick={() => navigate("/login")}
                    _hover={{ color: "text.main", bg: "whiteAlpha.100" }}
                  >
                    <LuArrowLeft /> {t("RegisterPage_Buttons_BackToLogin")}
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

export default RegisterPage;
