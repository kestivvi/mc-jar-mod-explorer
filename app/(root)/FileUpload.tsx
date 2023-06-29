'use client'
import { useState } from 'react';
import "./FileUpload.css"
import ErrorComponent from '../(components)/ErrorComponent';


function validateFile(file: File | null): string | null {
    if (!file)
        return 'No file selected!';

    // Perform additional validation checks if needed

    return null;
}

export default function FileUpload(
    { onFileSubmit }: { onFileSubmit: (file: File) => void }
) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string>("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationError = validateFile(selectedFile);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');

        if (selectedFile)
            onFileSubmit(selectedFile);
        else
            console.error("Selected file is null!");
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        setError("");
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-8">
            <label className="custom-file-upload flex justify-center items-center">
                <input type="file" accept='.jar' name="file" onChange={handleFileChange} />
                <div>{selectedFile ? selectedFile.name : "Upload jar file"}</div>
            </label>

            <button type="submit">Submit</button>

            <ErrorComponent error={error} />

        </form>
    )
}