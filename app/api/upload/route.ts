import { NextResponse } from 'next/server';
import crypto from 'crypto';
import JSZip from 'jszip';

import PocketBase from 'pocketbase';


// Interface for the response object
interface Response {
    filehash: string;
}

/**
 * Handles the POST request.
 * Extracts the file from the request, calculates its hash,
 * searches for "fabric-mod.json" within the zip, and retrieves its content.
 * @param request The request object.
 * @returns The response object.
 */
export async function POST(request: Request) {
    try {
        // Extract the file from the request
        const file = await getFileFromRequest(request);

        if (!file) {
            console.error('No file selected');
            return NextResponse.error();
        }

        // Calculate the hash of the file
        const hash = await calculateFileHash(file);
        console.log("File hash:", hash);

        // Load the jar file as a zip
        const jarBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(jarBuffer);

        // Retrieve the content of "fabric-mod.json" from the zip
        const fabricModJson = await getFabricModJson(zip);
        if (!fabricModJson) {
            console.error('fabric.mod.json not found');
            return NextResponse.error();
        }

        console.log('fabric.mod.json content:', fabricModJson);

        const json = JSON.parse(fabricModJson);

        const pb = new PocketBase('http://127.0.0.1:8090');

        const resultList = await pb.collection('mods').getList(1, 1, {
            filter: `hash = "${hash}"`,
        });

        if (resultList.totalItems == 0) {

            const data = {
                "hash": hash,
                "modId": json.id,
                "name": json.name,
                "description": json.description,
                "version": json.version,
                "license": json.license,
                "authors": json.authors.join(", "),
                "json": json
            };

            await pb.collection('mods').create(data);
        }

        // Create the response object with the file hash
        const response: Response = { filehash: hash };
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error();
    }
}

/**
 * Extracts the file from the request.
 * @param request The request object.
 * @returns The file object or null if no file is selected.
 */
async function getFileFromRequest(request: Request): Promise<File | null> {
    const formData = await request.formData();
    const fileFormEntry: FormDataEntryValue | null = formData.get("file");
    const file: File | null = fileFormEntry as File;
    return file;
}

/**
 * Calculates the hash of the file.
 * @param file The file object.
 * @returns The hash value.
 */
async function calculateFileHash(file: File): Promise<string> {
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    return hash;
}

/**
 * Searches for the "fabric-mod.json" file within the zip and retrieves its content.
 * @param zip The zip object.
 * @returns The content of "fabric-mod.json" or null if not found.
 */
async function getFabricModJson(zip: JSZip): Promise<string | null> {
    const files = zip.file(/.*/);
    for (const file of files) {
        if (file.name === 'fabric.mod.json') {
            const content = await file.async('text');
            return content;
        }
    }
    return null;
}
