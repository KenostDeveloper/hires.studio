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

        // console.log(data)

        if(data.item){
            const getCategory = await db.categoryPrice.findUnique({
                where: {
                    id: data.item.id
                }
            })

            if(getCategory){

                const update = await db.categoryPrice.update({
                    where: {
                        id: getCategory.id
                    },
                    data: {
                        name: data.item.name
                    }
                })

                for(let i = 0; i < data.item.prices.length; i++){
                    const isPrice = await db.prices.findUnique({
                        where: {
                            id: data.item.prices[i].id
                        }
                    })



                    if(isPrice){
                        const updatePrice = await db.prices.update({
                            where: {
                                id: isPrice.id
                            },
                            data: {
                                name: data.item.prices[i].name,
                                price: data.item.prices[i].price,
                            }
                        })
                    }else{
                        const createPrice = await db.prices.create({
                            data: {
                                name: data.item.prices[i].name,
                                price: data.item.prices[i].price,
                                idCategoryPrice: data.item.id
                            }
                        })
                    }
                }
            }
            
            return NextResponse.json({success: true, message: "Цены обновлены!"});
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

    if(id){
        const category = await db.prices.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({success: true, message: "Удалено!"});
    }else{
        return NextResponse.json({success: true, message: "Пожалуйста, укажите id"});
    }
}

export async function GET(req: NextRequest) {

    const prices: any = await db.categoryPrice.findMany({
        include: {
            prices: true
        }
    })

    for(let i = 0; i<prices.length; i++){
        if(prices[i].prices.length == 0){
            prices[i].prices.push({id: uuidv4(), name: "", price: ""})
        }

        prices[i].active = false;
    }

    return NextResponse.json({success: true, prices});
}