"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ text, selectedDate, onDateChange }: { text: string, selectedDate?: string, onDateChange?: (date: string | undefined) => void }) {
    const [date, setDate] = React.useState<Date | undefined>(selectedDate ? new Date(selectedDate) : undefined)

    const handleDateChange = (selected: Date | undefined) => {
        setDate(selected)
        const value = selected?.getFullYear() +'-'+selected?.getMonth()+'-'+selected?.getDate()
        console.log(value)
        // const date = new Date(value)

        if (onDateChange) {
            onDateChange(value)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"default"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal border-gray-300 border-[1px] rounded-l",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 " />
                    {date ? format(date, "PPP") : <span className="text-gray-400">{text}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}


