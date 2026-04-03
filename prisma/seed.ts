import {prisma} from '../src/lib/prisma'
import bcrypt from "bcrypt";


const main=async ()=>{
    const adminPassword=await bcrypt.hash('admin123',5)
    const analystPassword=await bcrypt.hash('analyst123',5)

    await prisma.user.upsert({
        where: { email: 'admin@finance.com' },
        update: {},
        create: {
          username: 'admin',
          email: 'admin@finance.com',
          password: adminPassword,
          role: 'ADMIN',
          isActive: true
        }
      })


      await prisma.user.upsert({
        where: { email: 'analyst@finance.com' },
        update: {},
        create: {
          username: 'analyst',
          email: 'analyst@finance.com',
          password: analystPassword,
          role: 'ANALYST',
          isActive: true
        }
      })

      console.log('seeded admin and analyst users')
}

main().catch(console.error).finally(()=>prisma.$disconnect)