import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthResponse } from '../types/AuthResponse';
import {
    Box,
    Button,
    Heading,
    VStack,
    Text,
    Flex,
    Fieldset,
    Stack,
    Field,
    Input,
    InputGroup,
} from '@chakra-ui/react';
import { register } from '@/services/AuthService';
import { LuLock, LuMail } from 'react-icons/lu';

interface RegisterPageProps {
    onLogin: (auth: AuthResponse) => void;
}

const RegisterPage = ({ onLogin }: RegisterPageProps) => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const auth = await register(registerEmail, registerPassword);
            onLogin(auth);
            navigate('/dashboard');
        } catch {
            setError('Registrierung fehlgeschlagen. Prüfe E-Mail und Passwort.');
        }
    };

    return (
        <Flex minH="100vh" align="center" justify="center">
            <Box
                backgroundColor={"bg.inverted"}
                color={"bg.emphasized"}
                padding={10}
                borderWidth={"1px"}
                borderRadius={"x1"}
                boxShadow={"x1"}
                w={"60%"}
            >
                <Heading mb={6} textAlign="center">
                    Registrierung
                </Heading>

                {error && (
                    <Text mb={4} color="red.500" textAlign="center">
                        {error}
                    </Text>
                )}

                <VStack gap={4} as="form">
                    <Fieldset.Root size="lg">
                        <Stack mb={4}>
                            <Fieldset.HelperText color={"fg.inverted"}>Bitte trage deine E-Mail und Passwort ein.</Fieldset.HelperText>
                        </Stack>

                        <Fieldset.Content>
                            <Field.Root required>
                                <Field.Label >E-Mail-Adresse <Field.RequiredIndicator /></Field.Label>
                                <InputGroup startElement={<LuMail />}>
                                    <Input
                                        name='registerEmail'
                                        type="email"
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>Passwort <Field.RequiredIndicator /></Field.Label>
                                <InputGroup startElement={<LuLock />}>
                                    <Input
                                        name='registerPassword'
                                        type="password"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </Field.Root>
                        </Fieldset.Content>

                        <Flex justify={"space-evenly"}>
                            <Button type='button' variant={"solid"} bg={"bg"} color={"fg"} alignSelf={"flex-start"} onClick={handleRegister}>
                                Registrieren
                            </Button>
                            <Button type='button' variant={"solid"} bg={"bg"} color={"fg"} onClick={() => navigate('/login')}>
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
