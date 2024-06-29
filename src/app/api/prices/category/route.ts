import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { unlinkSync } from "fs";
import { Type } from "@prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }

    try{
        const data = await req.json();

        if(data.name){
            const category = await db.categoryPrice.create({
                data: {
                    name: data.name
                }
            })
            return NextResponse.json({success: true, message: "Категория создана!"});
        }else{
            return NextResponse.json({success: true, message: "Пожалуйста, заполните все поля!"});
        }
    
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :("});
    }
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }

    let id = req.nextUrl.searchParams.get('id') as string

    console.log(id)

    if(id){
        const category = await db.categoryPrice.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({success: true, message: "Удалено!"});
    }else{
        return NextResponse.json({success: true, message: "Пожалуйста, укажите id"});
    }

}