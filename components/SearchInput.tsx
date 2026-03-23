"use client"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import React, { useState } from "react"
import { useDebounce } from "@uidotdev/usehooks"

interface SearchInputProps {
  onSearch: (value: string) => void
  value: string
}

export function SearchInput({ onSearch, value }: SearchInputProps) {
  const [localTerm, setLocalTerm] = React.useState(value)

  const debouncedSearchTerm = useDebounce(localTerm, 300)

  React.useEffect(() => {
    setLocalTerm(value)
  }, [value])

  React.useEffect(() => {
    onSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, onSearch])

  return (
    <InputGroup className="h-8 max-w-md">
      <InputGroupInput
        value={localTerm}
        onChange={(e) => setLocalTerm(e.target.value)}
        placeholder="Search entries..."
      />
      <InputGroupAddon>
        <MagnifyingGlassIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}
