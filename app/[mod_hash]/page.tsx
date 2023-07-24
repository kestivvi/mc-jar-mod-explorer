'use client';

// import Field from "./Field";
// import NestedField from "./NestedField";

import PocketBase from 'pocketbase';
import FileInfo from "./FileInfo";
import Nav from "./Nav";
import { useState } from "react";
import GeneralInfo from "./GeneralInfo";
import RawInfo from './RawInfo'

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
    size_bytes: number;
    virus_total_link: string;
}

export enum SubPage {
    General,
    Raw,
}

export default async function Page({ params }: { params: { mod_hash: string } }) {

    let [generalInfo, setGeneralInfo] = useState<Boolean>(true);
    let [rawInfo, setRawInfo] = useState<Boolean>(false);

    const pb = new PocketBase('http://127.0.0.1:8090');

    const resultList = await pb.collection('mods').getList<mod>(1, 1, {
        filter: `hash = "${params.mod_hash}"`,
    });

    const result = resultList.items.at(0);

    const handleChange = () => {

    };

    return (
        <>
            {result && <FileInfo hash={result.hash} size_bytes={result.size_bytes} last_analisis_date={new Date(result.last_checked)}
                times_checked={result.times_checked} virus_total_link={result.virus_total_link}
            />}
            <Nav subpages={[SubPage.General, SubPage.Raw]} onChange={handleChange} />
            {/* {result && generalInfo && <GeneralInfo name={result.name} id={result.modId} version={result.version} authors={result.authors} description={result.description} license={result.license} />}
            {result && rawInfo && <RawInfo />} */}
        </>
    )
}

        // interface MyObject {
        //     [key: string]: any;
        // }

        // const getProperties = (json: MyObject) => {
        //     const elementsArray = new Array();

        //     for (const key in json) {
        //         if (!json.hasOwnProperty(key))
        //             continue;

        //         const value = json[key];

        //         if (typeof value === 'object') {
        //             elementsArray.push(<NestedField name={key}>{getProperties(value)}</NestedField>); // Recursively iterate over nested objects
        //         } else {
        //             elementsArray.push(<Field name={key}>{value}</Field>)
        //             // console.log(key, value);
        //         }
        //     }

        //     return elementsArray;
        // };

        // <div className="flex flex-col justify-center items-center">

        //     <div className="mt-10 p-4 rounded-xl flex flex-col justify-center items-center border border-gray-300 bg-white shadow-md">
        //         <h1 className="font-semibold text-4xl">General</h1>
        //         <div className="flex flex-col justify-start items-start">
        //             {/* I want this date to be formatted as string */}
        //             <Field name="Last Checked">{formattedLastChecked}</Field>
        //             <Field name="Number of times checked">{result?.times_checked}</Field>
        //             <Field name="Name">{result?.name}</Field>
        //             <Field name="Id">{result?.modId}</Field>
        //             <Field name="Version">{result?.version}</Field>
        //             <Field name="Authors">{result?.authors}</Field>
        //             <Field name="Description">{result?.description}</Field>
        //             <Field name="License">{result?.license}</Field>
        //         </div>
        //     </div>

        //     <div className="mt-10 p-4 rounded-xl flex flex-col justify-center items-center border border-gray-300 bg-white shadow-md">
        //         <h1 className="font-semibold text-4xl">Full</h1>
        //         <div className="flex flex-col justify-start items-start">
        //             {result?.json ? getProperties(result?.json) : ""}
        //             {/* {result?.json} */}
        //         </div>
        //     </div>
        // </div>