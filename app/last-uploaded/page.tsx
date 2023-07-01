import PocketBase from 'pocketbase';
import Record from './Record';

import { Mod, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Mod[]> {
    const pb = new PocketBase('http://127.0.0.1:8090');

    return await pb.collection('mods').getFullList({
        sort: '-last_checked',
        batch: 1
    });
}


export default async function LastUploaded() {

    const data = await getData();

    return (
        <div className='flex flex-col divide-y'>
            <DataTable columns={columns} data={data} />
        </div>
    )
}