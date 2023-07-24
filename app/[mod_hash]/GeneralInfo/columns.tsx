"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Info = {
    name: string
    content: string
}

export const columns: ColumnDef<Info>[] = [
    {
        accessorKey: "name",
        header: "",
    },
    {
        accessorKey: "content",
        header: "",
    },
]
