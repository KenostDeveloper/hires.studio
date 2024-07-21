import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { unlinkSync } from "fs";
import sharp from "sharp";
import { TypePhoto } from "@prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions)
    if(!session && session?.user?.role !== "ADMIN"){
        return NextResponse.json({success: false, message: "У вас нет доступа!"});
    }

    try{
        const data = await req.formData()
        const file: File | null = data.get('file') as unknown as File
        let alt = data.get('alt') as string;
        let typePhoto = data.get('type') as TypePhoto;
    
        if(!file){
            return NextResponse.json({success: false, message: "Файл не загружен, попробуйте заного"});
        }

    
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        //Получаем тип файла
        let type = "." + file.type.replace('image/','');
    
        const name = uuidv4();
    
        //Путь файла
        const path = `${process.cwd()}${process.env.PATH_IMAGE}photo/temp/` + name + type;
        //Сохраняем файл
        await writeFile(path, buffer);

        try {
            await sharp(path)
              .jpeg({ quality: 40 })
              .toFile(`${process.cwd()}${process.env.PATH_IMAGE}photo/${name}.jpeg`);
        } catch (error) {
            console.log(error);
        }

        unlinkSync(path);

        if(alt == ""){
            alt = "HiRes Studio — студия подкастов в Санкт-Петербурге"
        }
    
        const newPhoto = await db.photo.create({
            data: {
                alt: alt,
                name: name + ".jpeg",
                type: typePhoto
            }
        });
    
        return NextResponse.json({success: true, message: "Файл успешно загружен!", newPhoto});
    }catch(e){
        return NextResponse.json({success: false, message: "Произошла неизвестная ошибка, попробуйте снова :(" + e});
    }
}


export async function GET(req: NextRequest) {
    let page = req.nextUrl.searchParams.get('page') as string
    let limit = req.nextUrl.searchParams.get('limit') as string
    let id = req.nextUrl.searchParams.get('id') as string


    let getPage = Number(page) || 1;
    let getLimit = Number(limit) || 9;

    let offset = getPage * getLimit - getLimit;

    const PhotoCount = await db.photo.count()
    if(id){
        const Photo = await db.photo.findUnique({
            where: {id: id.toString()}
        })
        return NextResponse.json({PhotoCount, Photo});
    }else{
        
        const Photo = await db.photo.findMany({
            take: getLimit,
            skip: offset,
            orderBy: [
                {
                  id: 'desc'
                }
            ]
        })
        return NextResponse.json({PhotoCount, Photo});
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

    const deletePhoto = await db.photo.delete({
        where: {
            id: id,
        },
    })

    //Путь файла
    const path = `${process.cwd()}${process.env.PATH_IMAGE}photo/` + deletePhoto.name;
    
    //Удаляем файл
    unlinkSync(path);

    return NextResponse.json({success: true, message: "Фото удалено!", deletePhoto});
}