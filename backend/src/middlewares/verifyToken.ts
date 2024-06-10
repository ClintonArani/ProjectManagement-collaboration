import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { token_details } from "../interfaces/user.interface";


export interface extendedRequest extends Request{
    info?: token_details
}

export const verifyToken = async(req:extendedRequest, res:Response, next:NextFunction) =>{

    try {
        const token = req.headers['token'] as string;

        if(!token){
            return res.status(401).json({
                error: "You do not have access"
            })
        }else{
            let data = jwt.verify(token, process.env.SECRET_KEY as string) as token_details

            req.info = data
        }
    } catch (error) {
        return res.json({
            error
        })
    }

    next()
}

