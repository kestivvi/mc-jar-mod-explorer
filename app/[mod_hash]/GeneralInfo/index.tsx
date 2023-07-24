import { Info, columns } from "./columns"
import { DataTable } from "./data-table"



export default async function GeneralInfo(
    { name, id, version, authors, description, license }:
        { name: string, id: string, version: string, authors: string, description: string, license: string }
) {

    console.log("GeneralInfo");

    async function getData(): Promise<Info[]> {
        return [
            {
                name: "Name",
                content: name,
            },
            {
                name: "ID",
                content: id,
            },
            {
                name: "Version",
                content: version,
            },
            {
                name: "Authors",
                content: authors,
            },
            {
                name: "Description",
                content: description,
            },
            {
                name: "License",
                content: license,
            },
        ]
    }

    const data = await getData();


    return (
        <div className="">
            <DataTable columns={columns} data={data} />
        </div>
    )
}