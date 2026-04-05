import  prisma  from "../lib/prisma";
import {assignRoleSchema} from '../validation/assignrole.type'
import { Pagination } from "./record.service";


export const assignRoleService = async (
	id: string,
	body: unknown,
	requestingUserId: string | undefined,
) => {
	if (id === requestingUserId) {
		throw new Error("Cannot change your own role");
	}

	const parsed = assignRoleSchema.safeParse(body);
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


export const getUserPagesService=async(pages:Pagination)=>{
    const {page,limit,skip}=pages;
    const users=await prisma.user.findMany({
        where:{
            isActive: true,
        },
        skip,
        take:limit,
        select:{
          id: true,
          username: true,
          email: true,
          createdAt: true
        }
      })
      return{
        data:users,
        page,
        limit,
      }
     
    
}