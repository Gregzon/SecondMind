import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthResponse } from '../types/AuthResponse';
import { Box, Button, Heading, VStack, Text, Fieldset, Stack, Field, Input, Flex, InputGroup } from '@chakra-ui/react';
import { login } from '@/services/AuthService';
import { LuClipboard, LuLock, LuLogIn, LuMail } from 'react-icons/lu';

interface LoginPageProps {
    onLogin: (auth: AuthResponse) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const auth = await login(email, password);
            onLogin(auth);
            navigate('/dashboard'); // nach Login direkt Dashboard
        } catch {
            setError('Login fehlgeschlagen. Prüfe E-Mail und Passwort.');
        }
    };

    return (
        <Flex minH="100vh" align="center" justify="center" direction={"column"} width={"100%"}>
            <Box
                backgroundColor={"bg"}
                color={"fg"}
                padding={10}
                borderWidth={"1px"}
                borderRadius={"x1"}
                boxShadow={"x1"}
                w={"60%"}
            >
                <Heading mb={6} textAlign="center">
                    Login
                </Heading>

                {error && (
                    <Text mb={4} color="red.500" textAlign="center">
                        {error}
                    </Text>
                )}

                <VStack gap={4}>

                    <Fieldset.Root size="lg" color={"fg"}>
                        <Stack>
                            <Fieldset.Legend>Login</Fieldset.Legend>
                            <Fieldset.HelperText color={"fg"}>Zum Fortfahren müssen Sie sich anmelden.</Fieldset.HelperText>
                        </Stack>
                        <Fieldset.Content>
                            <Field.Root required>
                                <Field.Label >E-Mail-Adresse <Field.RequiredIndicator /></Field.Label>
                                <InputGroup startElement={<LuMail />}>
                                    <Input name='email' type='email' onChange={(e) => setEmail(e.target.value)} />
                                </InputGroup>
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>Passwort <Field.RequiredIndicator /></Field.Label>
                                <InputGroup startElement={<LuLock />}>
                                    <Input name='password' type='password' onChange={(e) => setPassword(e.target.value)} />
                                </InputGroup>
                            </Field.Root>
                        </Fieldset.Content>
                        <Flex justify={"space-evenly"}>
                            <Button type='button' variant={"solid"} bg={"bg"} color={"fg"} alignSelf={"flex-start"} onClick={(e) => handleLogin(e)}>Login <LuLogIn /></Button>
                            <Button type='button' variant={"solid"} bg={"bg"} color={"fg"} onClick={() => navigate("/register")}>Registrieren <LuClipboard /></Button>
                        </Flex>
                    </Fieldset.Root>
                </VStack>
            </Box>
        </Flex>
    );
};

export default LoginPage;
