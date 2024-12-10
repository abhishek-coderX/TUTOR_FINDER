import { Resend } from 'resend';
import { Email } from './email';
import { NextResponse } from 'next/server';

const resend = new Resend('re_123456789');

export async function  POST(req) => {
    try{
return NextResponse.jason({data:"email sent"})
    }
    catch()
        {
return NextResponse.jason({error})
        }
    
    
}