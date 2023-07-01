import Field from "./Field";
import PocketBase from 'pocketbase';
import NestedField from "./NestedField";

interface mod {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    hash: string;
    description: string;
    version: string;
    license: string;
    name: string;
    modId: string;
    authors: string;
    times_checked: number;
    last_checked: Date;
    json: object;
}

export default async function Page({ params }: { params: { mod_hash: string } }) {

    interface MyObject {
        [key: string]: any;
    }

    const getProperties = (json: MyObject) => {
        // Iterate over every property (key, value) recursively
        const elementsArray = new Array();

        for (const key in json) {
            if (!json.hasOwnProperty(key))
                continue;

            const value = json[key];

            if (typeof value === 'object') {
                elementsArray.push(<NestedField name={key}>{getProperties(value)}</NestedField>); // Recursively iterate over nested objects
            } else {
                elementsArray.push(<Field name={key}>{value}</Field>)
                // console.log(key, value);
            }
        }

        return elementsArray;
    };


    const pb = new PocketBase('http://127.0.0.1:8090');

    const resultList = await pb.collection('mods').getList<mod>(1, 1, {
        filter: `hash = "${params.mod_hash}"`,
    });

    const result = resultList.items.at(0);
    console.log(result);

    console.log(params.mod_hash);
    const formattedLastChecked = result?.last_checked
        ? new Date(result.last_checked).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC',
        })
        : '';
    return (
        <div className="flex flex-col justify-center items-center">

            <div className="mt-10 p-4 rounded-xl flex flex-col justify-center items-center border border-gray-300 bg-white shadow-md">
                <h1 className="font-semibold text-4xl">General</h1>
                <div className="flex flex-col justify-start items-start">
                    {/* I want this date to be formatted as string */}
                    <Field name="Last Checked">{formattedLastChecked}</Field>
                    <Field name="Number of times checked">{result?.times_checked}</Field>
                    <Field name="Name">{result?.name}</Field>
                    <Field name="Id">{result?.modId}</Field>
                    <Field name="Version">{result?.version}</Field>
                    <Field name="Authors">{result?.authors}</Field>
                    <Field name="Description">{result?.description}</Field>
                    <Field name="License">{result?.license}</Field>
                </div>
            </div>

            <div className="mt-10 p-4 rounded-xl flex flex-col justify-center items-center border border-gray-300 bg-white shadow-md">
                <h1 className="font-semibold text-4xl">Full</h1>
                <div className="flex flex-col justify-start items-start">
                    {result?.json ? getProperties(result?.json) : ""}
                    {/* {result?.json} */}
                </div>
            </div>
        </div>
    )
}