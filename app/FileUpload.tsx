'use client'
import { useState } from 'react';
import "./FileUpload.css"



export default function FileUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // File uploaded successfully
                // Perform further actions or handle the response accordingly
                console.log("OK");
                console.log(await response.json());
            } else {
                console.error('Request failed:', response.statusText);
            }
        } catch (error) {
            console.error('Request error:', error);
        }
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-5xl font-bold">Upload JAR file</h1>

            <label className="custom-file-upload">
                <input type="file" name="file" onChange={handleFileChange} />
                Custom Upload
            </label>

            <button type="submit">Submit</button>
        </form>
    )
}