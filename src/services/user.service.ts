
import  prisma  from "../lib/prisma";
import {assignRoleSchema} from '../validation/assignrole.type'

export const assignRoleService=async (
    id:string,
    role:string,
    requestingUserId: string | undefined
)=>{
    if(id===requestingUserId){
       throw new Error("Cannot change your own role") // prevent admin from locking themselves out
    }
    console.log(requestingUserId)

    const parsed=assignRoleSchema.safeParse(role)  //validate role before checking
    console.log(parsed.data)
    if(!parsed.success){
        throw new Error ("Invalid role")
    }
    const existingUser=await prisma.user.findUnique({where:{id}})
    if(!existingUser){
        throw new Error("User doesnt exist")
    }

    return await prisma.user.update({ //assign role
        where:{id},
        data:{
            role:parsed.data.role
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            isActive: true
          }
    })

}


export const toggleStatusService = async (
    id:string,
    status:boolean,
    requestingUserId:string | undefined
) => {
   
    if(id===requestingUserId){ //admin cant deactivate own
        throw new Error("Cant deactivate yourself")
    }
    const existingUser=await prisma.user.findUnique({where:{id}})  //user not exists
    if(!existingUser){
        throw new Error("User doesnt exist")
    }

    return await prisma.user.update({ //flip status
        where:{id},
        data:{
            isActive:status
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            isActive: true
          }
    })



}