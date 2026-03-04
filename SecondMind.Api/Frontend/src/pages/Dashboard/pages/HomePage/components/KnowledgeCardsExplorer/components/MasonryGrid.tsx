import { Box } from "@chakra-ui/react"

interface MasonryGridProps {
    children: React.ReactNode
}

export const MasonryGrid = ({ children }: MasonryGridProps) => {
    return (
        <Box
            w="full"
            css={{
                // [base, sm, md, lg]
                // Wir starten direkt bei 2 Spalten für das Smartphone
                columnCount: [2, 2, 3, 4],
                // Der horizontale Abstand zwischen den Spalten
                columnGap: "12px",
            }}
        >
            {/* Wichtig: Damit das CSS-Column System funktioniert, 
        muss jedes Kind-Element (die Cards) ein paar spezielle 
        Styles haben, um nicht zwischen Spalten zerissen zu werden.
      */}
            <Box
                css={{
                    "& > *": {
                        breakInside: "avoid",
                        display: "inline-block",
                        width: "100%",
                        marginBottom: "12px", // Vertikaler Abstand zwischen den Karten
                    },
                }}
            >
                {children}
            </Box>
        </Box>
    )
}