import { Pagination } from "@/components/Pagination";
import TextEditor from "@/components/TextEditor";
import React from "react";

export default function PostEditPage(){
    
        return(
        <div className="flex flex-col justify-center items-center h-[100vh] gap-4">
            <div>직접 수정하기</div>
            <div className="w-[70%] m-10">
                <TextEditor/>
            </div>
            <Pagination currentPage={4} totalPages={5}/>
            
        </div>
        )
    
}
