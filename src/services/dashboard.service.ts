import prisma from "../lib/prisma";

export const getTotalServcie=async ()=>{
    const total=await prisma.record.groupBy({
        by:['type'],
        _sum:{amount:true},
       
    })
    const totalIncome =total.find(t => t.type === "INCOME")?._sum.amount || 0;
    const totalExpense =total.find(t => t.type === "EXPENSE")?._sum.amount || 0;
    const netBalance= Number(totalIncome)-Number(totalExpense)
    return {
        incomeTotal: Number(totalIncome),
        expenseTotal: Number(totalExpense),
        netBalance:netBalance
      };
}

export const getCategoryTotalsService=async()=>{
   const categories=await prisma.record.groupBy({
        by:['category'],
        where: { isDeleted: false },
        _sum:{amount:true},
       
    })

    const result = categories
    .map(item => ({
        category: item.category,
        total: item._sum.amount ?? 0  
    }))
    return result;
}


export const getRecentService=async()=>{
   return await prisma.record.findMany({
        orderBy:{
            createdAt:'desc'
        },
        take:5
    })
}

export const getTrendsService=async()=>{
    const trends = await prisma.$queryRaw`
        SELECT 
            strftime('%Y-%m', date) as month,
            type,
            SUM(CAST(amount AS REAL)) as total
        FROM "Record"
        WHERE "isDeleted" = 0
        GROUP BY month, type
        ORDER BY month ASC
    `
    return trends;
}