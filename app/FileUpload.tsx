'use client'
import { useState } from 'react';
import "./FileUpload.css"
import ProgressBar from './ProgressBar';



export default function FileUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [progressPercent, setProgressPercent] = useState<number>(0);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string>("");


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!selectedFile) {
            console.error('No file selected');
            setError('No file selected!');
            return;
        }

        setHasSubmitted(true);

        const formData = new FormData();
        formData.append('file', selectedFile);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload");

        xhr.onload = async function () {
            if (xhr.status === 200) {
                console.log("Upload successful!");
                const json = JSON.parse(xhr.responseText);
                console.log(json);

                const hash = json.filehash;

                window.location.href = `http://localhost:3000/${hash}`;
            } else {
                console.error("Error uploading files. Please try again.");
                setError('Error uploading files. Please try again.');
            }
        };

        xhr.upload.onprogress = function (event) {
            var percent = (event.loaded / event.total) * 100;
            setProgressPercent(percent);
        };

        xhr.send(formData);
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        setError("");
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-5xl font-bold">Upload JAR file</h1>

            <label className="custom-file-upload flex justify-center items-center">
                <input type="file" accept='.jar' name="file" onChange={handleFileChange} />
                <div>{selectedFile ? selectedFile.name : "Choose file"}</div>
            </label>

            <button type="submit">Submit</button>

            <div className={hasSubmitted ? "" : "hidden"}>
                <ProgressBar value={progressPercent} />
            </div>
            <div className='text-red-700 text-lg font-semibold'>
                {error}
            </div>
        </form>
    )
}