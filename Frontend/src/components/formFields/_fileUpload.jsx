import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';


const FileUpload = ({ w = "w-full lg:w-60", h = "h-40 lg:h-60 ", setFile, defaultValue }) => {
    const [errors, setErrors] = useState([]);
    const [previewUrl, setPreviewUrl] = useState("");

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            setFile(file)
            if (previewUrl) URL.revokeObjectURL(previewUrl)
            setPreviewUrl(URL.createObjectURL(file))
        }
        const rejected = rejectedFiles[0]
        setErrors(rejected?.errors?.map(error => error.message))
    }, [setFile, previewUrl])

    const { getRootProps, getInputProps } = useDropzone({
        // accept: { 'image/png': [".png"] },
        // minSize: 1024,
        onDrop
    });

    function handleRemove(e) {
        setPreviewUrl("");
        setFile("");
        e.stopPropagation()
    }

    useEffect(() => {
        setPreviewUrl(defaultValue);
    }, [defaultValue])


    return (
        <div className='w-full flex flex-col items-center'>
            <div className={`${w} ${h} rounded-lg border-2 border-gray-300 border-y border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100`}>
                <div className='h-full w-full' {...getRootProps()}>
                    <input {...getInputProps({ name: "image" })} />
                    {!previewUrl ? (
                        <IconAndText w={w} />
                    ) : (

                        <div className='h-full w-full overflow-hidden relative'>
                            <IconAndText w={w} className="absolute w-full h-full bg-white opacity-0 hover:opacity-80" />
                            <button onClick={handleRemove} className="absolute right-2 top-2 w-5 h-5 text-sm flex justify-center items-center text-white rounded-full bg-red-500">
                                X
                            </button>
                            <img src={previewUrl} alt="Preview" className='w-full h-full object-cover' />
                        </div>
                    )}
                </div>
            </div>
            {errors?.map((error, i) =>
                <p key={i} className="text-red-700">{error}</p>
            )}
        </div>
    );
}

const IconAndText = ({ w, className }) => {
    return (
        <div className={`${w} h-full flex flex-col items-center justify-center gap-2  transition-opacity duration-300 ${className}`}>
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                <b>Click to upload</b> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF <span>(MAX. 800x400px)</span>
            </p>

        </div>
    );
}

export default FileUpload;