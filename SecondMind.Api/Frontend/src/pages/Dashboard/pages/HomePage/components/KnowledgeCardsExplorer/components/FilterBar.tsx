import { HStack, Button } from "@chakra-ui/react";

const FILTER_MAP: Record<string, string> = {
  Alles: "all",
  Aufgaben: "task",
  Ideen: "idea",
  Orte: "location",
};

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  const categories = ["Alles", "Aufgaben", "Ideen", "Orte", "Listen"];

  return (
    <HStack
      gap="2"
      py="4"
      overflowX="auto"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {categories.map((cat) => {
        const techValue = FILTER_MAP[cat];
        const isActive = activeFilter === techValue;

        return (
          <Button
            key={cat}
            onClick={() => onFilterChange(techValue)}
            variant={isActive ? "solid" : "outline"}
            bg={isActive ? "white" : "transparent"}
            color={isActive ? "black" : "white"}
            borderRadius="full"
            px="6"
            size="sm"
            borderColor="whiteAlpha.300"
            _hover={{ bg: isActive ? "white" : "whiteAlpha.100" }}
          >
            {cat}
          </Button>
        );
      })}
    </HStack>
  );
};
