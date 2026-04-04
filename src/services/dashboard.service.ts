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