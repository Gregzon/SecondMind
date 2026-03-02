import { CloseButton } from "@chakra-ui/react"
import type { RefObject } from "react"

export interface InputDeleteButtonProps {
    value: string
    onClear: () => void
    inputRef?: RefObject<HTMLInputElement | null>
}

// TODO: das fixen
export const InputDeleteButton = ({
    value,
    onClear,
    inputRef,
}: InputDeleteButtonProps) => {

    if (!value) return null

    return (
        <CloseButton
            size="xs"
            aria-label="Clear input"
            onClick={() => {
                onClear()
                inputRef?.current?.focus()
            }}
            me="-2"
            bg={"bg"}
        />
    )
}