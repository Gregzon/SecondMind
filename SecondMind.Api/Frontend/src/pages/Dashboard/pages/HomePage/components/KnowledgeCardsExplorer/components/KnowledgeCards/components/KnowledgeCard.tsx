import { Card, Heading, Icon, Text, Box, List } from "@chakra-ui/react"
import { LuLightbulb, LuMapPin, LuList, LuCheck, LuCircle } from "react-icons/lu"

interface KnowledgeCardProps {
    cardTitle: string
    cardBody: string | string[]
    cardType: "task" | "idea" | "location" | "list"
}

// Map für Icons und Farben basierend auf dem Typ
const cardConfig = {
    task: { icon: LuCheck, label: "Task", color: "blue.400" },
    idea: { icon: LuLightbulb, label: "Idee", color: "yellow.400" },
    location: { icon: LuMapPin, label: "Ort", color: "red.400" },
    list: { icon: LuList, label: "Liste", color: "green.400" },
}

export const KnowledgeCard = ({ cardTitle, cardBody, cardType }: KnowledgeCardProps) => {
    const config = cardConfig[cardType]

    return (
        <Box
            mb="4"
            css={{ breakInside: "avoid", display: "inline-block", width: "100%" }}
        >
            <Card.Root size="sm" variant="outline" bg="gray.900" borderColor="whiteAlpha.200">
                <Card.Header pb="2">
                    {/* Typ-Indikator (Icon + Label) */}
                    <Box display="flex" alignItems="center" gap="2" mb="2">
                        <Icon as={config.icon} color={config.color} />
                        <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase">
                            {config.label}
                        </Text>
                    </Box>
                    <Heading size="md" color="white">{cardTitle}</Heading>
                </Card.Header>

                <Card.Body>
                    {cardType === "list" && Array.isArray(cardBody) ? (
                        // Spezialfall: Liste mit Check-Icons
                        <List.Root gap="2" variant="plain">
                            {cardBody.map((item, index) => (
                                <List.Item
                                    key={index}
                                    display="flex"
                                    alignItems="center"
                                    gap="2"
                                    color="gray.400"
                                    fontSize="sm"
                                >
                                    <List.Indicator as={LuCircle} boxSize="2" color="whiteAlpha.400" />
                                    {item}
                                </List.Item>
                            ))}
                        </List.Root>
                    ) : (
                        // Standardfall: Text
                        <Text color="gray.400" fontSize="sm" lineHeight="tall">
                            {cardBody}
                        </Text>
                    )}
                </Card.Body>

                {/* Optional: Footer für Typ-spezifische Buttons */}
                {cardType === "task" && (
                    <Card.Footer pt="2">
                        <Text fontSize="xs" color="blue.300">Fällig: Heute</Text>
                    </Card.Footer>
                )}
            </Card.Root>
        </Box>
    )
}