"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Mod = {
    name: string
    version: string
    times_checked: number
    last_checked: string
    hash: string
}

export const columns: ColumnDef<Mod>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "version",
        header: "Version",
    },
    {
        accessorKey: "times_checked",
        header: "Times Checked",
    },
    {
        accessorKey: "last_checked",
        header: "Last Checked",
    },
    {
        accessorKey: "hash",
        header: "Hash",
    },
]
