'use client'

import { useState } from 'react';
import FileUpload from './(root)/FileUpload'
import ProgressBar from './(root)/ProgressBar';
import ErrorComponent from './(components)/ErrorComponent';

export default function Home() {
    const [progressPercent, setProgressPercent] = useState(0);
    const [error, setError] = useState('');
    const [isSending, setIsSending] = useState(false);

    async function onFileSubmit(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/upload');

        xhr.upload.onprogress = (event: ProgressEvent) => {
            const percent = (event.loaded / event.total) * 100;
            setProgressPercent(percent);
        };

        xhr.onload = async () => {
            setIsSending(false);

            if (xhr.status === 200) {
                console.log('Upload successful!');
                setError('');

                const json = JSON.parse(xhr.responseText);
                const hash = json.filehash;

                window.location.href = `/${hash}`;
            } else {
                console.error('Error uploading files. Please try again.');
                setError('Error uploading files. Please try again.');
            }
        };

        setIsSending(true);
        xhr.send(formData);
    }


    return (
        <div className='m-20 flex flex-col justify-center items-center gap-12'>
            <div className='flex justify-center items-center text-lg'>
                This website tool enables you to analyze an unknown Minecraft mod by uploading its JAR file.
            </div>

            <FileUpload onFileSubmit={onFileSubmit} />

            {isSending && <ProgressBar value={progressPercent} />}

            {error && <ErrorComponent error={error} />}
        </div>
    );
}
