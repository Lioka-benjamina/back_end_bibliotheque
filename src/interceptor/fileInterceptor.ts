import { Request } from "express";
import { extname } from "path";

export const EditFileName = (
    req : Request,
    file : any,
    callback : (error : Error | null , filename : string)=> void
) =>{
    try {
        let imageName = `${(Math.random() * 10000000).toFixed()}${(Math.random() * 10000000).toFixed()}`
        const extension = extname(file.originalname)
        imageName += extension
        callback(null, imageName)
    } catch (error) {
        callback(error, "")
    }
}