'use client'
import { useState } from 'react';
import "./FileUpload.css"
import ErrorComponent from '../(components)/ErrorComponent';
import { DragEvent, DragEventHandler } from 'react';

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

    const handleDrag: DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();

        if (!event.dataTransfer || event.dataTransfer.files.length == 0) {
            console.error("How did you drop no files? 🧐");
        }

        if (event.dataTransfer.files.length > 1) {
            console.error("You can drop only one file!");
        }

        setSelectedFile(event.dataTransfer.files[0]);

        console.log(event.dataTransfer?.files);
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-8">
            <div
                className='p-8 w-full border-dashed border-2 rounded-lg flex flex-col justify-center items-center gap-8'
                draggable
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <img className='w-28' src="scan.png" alt="scan icon" />
                <label className="custom-file-upload flex justify-center items-center">
                    <input type="file" accept='.jar' name="file" onChange={handleFileChange} />
                    <div>{selectedFile ? selectedFile.name : "Upload jar file"}</div>
                </label>
            </div>

            <button type="submit">Submit</button>

            <ErrorComponent error={error} />

        </form>
    )
}