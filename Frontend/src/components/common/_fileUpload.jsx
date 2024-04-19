import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';


const FileUpload = ({register,errors,id}) => {

    const [files, setFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })));
        const [newPreviewUrl] = acceptedFiles.map(file => URL.createObjectURL(file));
        setPreviewUrl(newPreviewUrl);
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ accept: 'image/*', onDrop });
    
    useEffect(() => () => {
        // Cleanup function
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);
      
    const handleChange = (e) => {
        console.log(e.target);
    }
    return (
        <>
            <div className="flex items-center justify-center w-[15rem] h-[15rem] overflow-hidden rounded-lg ">
                <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                    
                    <div className='w-[15rem]' {...getRootProps()}>
                        <input {...getInputProps()} />
                        {files.length === 0 ? (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                        ) : (
                                <div>
                                    <img src={previewUrl} alt="Preview" />
                                    <input id={id} type="file" {...register('image')} name="image" onChange={handleChange} />
                                </div>
                        )}
                        <div className="text-red-700">{errors['image']?.message }</div>
                    </div>
                </label>
            </div>
        </>
        
    );
}
 
export default FileUpload;