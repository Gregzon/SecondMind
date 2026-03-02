import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    InputGroup,
} from "@chakra-ui/react";

import { LuMail, LuLock } from "react-icons/lu";
import { PasswordInput } from "@/components/ui/password-input";
import { register } from "@/services/AuthService";

import {
    registerSchema,
    type RegisterFormData,
} from "../util/register.schema";

interface RegisterPageProps {
    onLogin: (auth: any) => void;
}

const RegisterPage = ({ onLogin }: RegisterPageProps) => {
    const navigate = useNavigate();

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange", // oder "onChange"
    });

    const onSubmit = async (data: RegisterFormData) => {
        const auth = await register(
            data.registerEmail,
            data.registerPassword
        );

        onLogin(auth);
        navigate("/dashboard");
    };

    return (
        <Flex minH="100vh" align="center" justify="center">
            <Box
                bg={"gray.emphasized"}
                color="fg"
                p={10}
                borderWidth="1px"
                borderRadius="xl"
                w="40%"
            >
                <Heading mb={6} textAlign="center">
                    Registrierung
                </Heading>

                {/* TODO: Fehlermeldung einbauen, falls es die E-Mail schon gibt */}

                <VStack
                    as="form"
                    gap={4}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Fieldset.Root size="lg">
                        <Stack mb={4}>
                            <Fieldset.HelperText>
                                Bitte trage deine E-Mail und Passwort ein.
                            </Fieldset.HelperText>
                        </Stack>

                        <Fieldset.Content>
                            {/* EMAIL */}
                            <Field.Root
                                required
                                invalid={!!errors.registerEmail}
                            >
                                <Field.Label>
                                    E-Mail-Adresse <Field.RequiredIndicator />
                                </Field.Label>

                                <InputGroup startElement={<LuMail />}>
                                    <Input
                                        type="email"
                                        {...formRegister("registerEmail")}
                                    />
                                </InputGroup>

                                <Field.ErrorText>
                                    {errors.registerEmail?.message}
                                </Field.ErrorText>
                            </Field.Root>

                            {/* PASSWORD */}
                            <Field.Root
                                required
                                invalid={!!errors.registerPassword}
                            >
                                <Field.Label>
                                    Passwort <Field.RequiredIndicator />
                                </Field.Label>

                                <InputGroup startElement={<LuLock />}>
                                    <PasswordInput
                                        {...formRegister("registerPassword")}
                                    />
                                </InputGroup>

                                <Field.ErrorText>
                                    {errors.registerPassword?.message}
                                </Field.ErrorText>
                            </Field.Root>
                        </Fieldset.Content>

                        <Flex justify="space-evenly" mt={4}>
                            <Button
                                type="submit"
                                loading={isSubmitting}
                                variant={"solid"} bg={"bg"} color={"fg"} alignSelf={"flex-start"}
                            >
                                Registrieren
                            </Button>

                            <Button
                                type="button"
                                variant={"solid"} bg={"bg"} color={"fg"} alignSelf={"flex-start"}
                                onClick={() => navigate("/login")}
                            >
                                Zurück zum Login
                            </Button>
                        </Flex>
                    </Fieldset.Root>
                </VStack>
            </Box>
        </Flex>
    );
};

export default RegisterPage;