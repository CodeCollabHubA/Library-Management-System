import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';


const FileUpload = ({ file, setFile, defaultValue }) => {
    const [errors, setErrors] = useState([]);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        const file = acceptedFiles[0]
        const rejected = acceptedFiles[0]
        setFile(file ? Object.assign(file, { previewUrl: URL.createObjectURL(file) }) : {})
        setErrors(rejected ? rejected.errors?.map(error => error.message) : "")
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        // accept: { 'image/png': [".png"] },
        // minSize: 1024,
        onDrop
    });
    useEffect(() => () => {
        if (defaultValue) setFile({ previewUrl: defaultValue })
    }, []);
    useEffect(() => () => {
        // Cleanup function
        if (file?.preview) {
            URL.revokeObjectURL(file.preview)
        }
    }, [file]);

    const handleChange = (e) => {
        console.log(e.target);
    }
    return (
        <div className='flex flex-col items-center'>
            <div className="flex flex-col items-center justify-center w-[15rem] h-[15rem] rounded-lg border-2 border-gray-300 border-y border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                <div className='w-[15rem]' {...getRootProps()}>
                    <input {...getInputProps({ name: "image" })} />
                    {Object.keys(file).length === 0 ? (
                        <Path />
                    ) : (

                        <div className='w-full overflow-hidden aspect-[1/1] relative'>
                            <Path className="absolute w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-300" />
                            <button onClick={e => { setFile(""); e.stopPropagation() }} className="absolute right-2 top-2 w-5 h-5 text-sm flex justify-center items-center text-white rounded-full bg-red-500">
                                X
                            </button>
                            <img src={file.previewUrl} alt="Preview" className='w-full h-full object-cover' />
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

const Path = ({ className }) => {
    return (
        <div className={`flex flex-col items-center justify-center pt-5 pb-6 ${className}`}>
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
    );
}

export default FileUpload;