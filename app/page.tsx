'use client'

import { useState } from 'react';
import FileUpload from './(root)/FileUpload'
import ProgressBar from './(root)/ProgressBar';
import ErrorComponent from './(components)/ErrorComponent';

export default function Home() {
    const [progressPercent, setProgressPercent] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);

    function onFileSubmit(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload");

        xhr.onload = async function () {
            setIsSending(false);

            if (xhr.status === 200) {
                console.log("Upload successful!");
                setError('');

                const json = JSON.parse(xhr.responseText);
                const hash = json.filehash;

                window.location.href = `/${hash}`;
            } else {
                console.error("Error uploading files. Please try again.");
                setError('Error uploading files. Please try again.');
            }
        };

        xhr.upload.onprogress = function (event) {
            var percent = (event.loaded / event.total) * 100;
            setProgressPercent(percent);
        };

        setIsSending(true);
        xhr.send(formData);
    }
    return (
        <div className='m-20 flex flex-col justify-center items-center gap-12'>

            <div className='flex justify-center items-center text-lg'>
                This website tool enables you to analyze unknown minecraft mod just by uploading its jar file.
            </div>

            <FileUpload onFileSubmit={onFileSubmit} />

            <div className={isSending ? "" : "hidden"}>
                <ProgressBar value={progressPercent} />
            </div>

            <ErrorComponent error={error} />
        </div>
    )
}
