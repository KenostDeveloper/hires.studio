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
        const data = await req.formData()
        const file: File | null = data.get('file') as unknown as File
        const iframeLink = data.get('iframeLink') as string;
        const type = data.get('type') as Type;

        
        if(!file){
            return NextResponse.json({success: false, message: "Файл не загружен, попробуйте заного"});
        }

        if(!iframeLink){
            return NextResponse.json({success: false, message: "Не заполено поле 'ссылка iframe'"});
        }
    
    
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        //Получаем тип файла
        let typeFile = "." + file.type.replace('image/','');
    
        const name = uuidv4() + typeFile;
    
        //Путь файла
        const path = "/app/public/images/portfolio/" + name;
        //Сохраняем файл
        await writeFile(path, buffer);
    
        const newPortfolio = await db.video.create({
            data: {
                type: type,
                image: name,
                iframeLink: iframeLink
            }
        });
    
        return NextResponse.json({success: true, message: "Файл успешно загружен!", newPortfolio});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :("});
    }
}

export async function GET(req: NextRequest) {
    try{
        let type = req.nextUrl.searchParams.get('type') as Type

        if(type){
            const Portfolio = await db.video.findMany({
                where: {type: type}
            })
            let newPortfolio:any = Portfolio;
            for(let i = 0; i < newPortfolio.length; i++){
                newPortfolio[i].isModal = false;
            }
            return NextResponse.json({Portfolio: newPortfolio});
        }else{
            const Portfolio = await db.video.findMany({})
            let newPortfolio:any = Portfolio;
            for(let i = 0; i < newPortfolio.length; i++){
                newPortfolio[i].isModal = false;
            }
            return NextResponse.json({Portfolio: newPortfolio});
        }
    }catch (err){
        console.log(err)
        return NextResponse.json({message: "Вы ввели не корректные данные"});
    }
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }

    let id = req.nextUrl.searchParams.get('id') as string

    if(id == null){
        return NextResponse.json({success: false, message: "Вы не указали id"});
    }

    const deletePortfolio = await db.video.delete({
        where: {
            id: id,
        },
    })

    //Путь файла
    const path = "/app/public/images/portfolio/" + deletePortfolio.image;

    //Удаляем файл
    unlinkSync(path);

    return NextResponse.json({success: true, message: "Фото удалено!", deletePortfolio});
}