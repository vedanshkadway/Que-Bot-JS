'use client'
import { Upload } from 'lucide-react';
import React from 'react'

const FileUpload:React.FC = () => {
    const handleFileUploadButtonClick = () =>{
        const el = document.createElement('input');
        el.setAttribute('type','file');
        el.setAttribute('accept','application/pdf');
        el.addEventListener('change',async(ev)=>{
            if(el.files && el.files.length>0){
                const file = el.files.item(0);
                if(file){
                    const formData = new FormData();

                    formData.append('pdf',file);
                    await fetch('http://localhost:8000/upload/pdf',{
                        method:'POST',
                        body:formData
                    });
                    console.log('file Uploaded')
                    
                }
            }
        })
        el.click();
    };




  return (
    <div className='bg-slate-900 shadow-2xl flex justify-center p-4 rounded-lg border-2'>
        <div onClick={handleFileUploadButtonClick} className='flex justify-center items-center flex-col '>
            <h3>Upload PDF File</h3>
        <Upload />

        </div>
    </div>
  );
};

export default FileUpload;

