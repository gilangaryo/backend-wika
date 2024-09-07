const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create some Users
    const user1 = await prisma.user.create({
        data: {
            name: 'Alice',
            role: 'admin',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Bob',
            role: 'user',
        },
    });

    // Create some Vendors
    const vendor1 = await prisma.vendor.create({
        data: {
            name: 'Marko CV',
        },
    });

    const vendor2 = await prisma.vendor.create({
        data: {
            name: 'Vendor B',
        },
    });

    // Create some Drivers
    const driver1 = await prisma.driver.create({
        data: {
            name: 'John Doe',
            plate: 'AB 1902 XG',
            vendorId: vendor1.id,
        },
    });

    const driver2 = await prisma.driver.create({
        data: {
            name: 'Jane Doe',
            plate: 'XY 2456 HG',
            vendorId: vendor2.id,
        },
    });

    // Create some Poles
    const pole1 = await prisma.pole.create({
        data: {
            type: 'LK0282',
            productNumber: '00142822',
            manufacturingDate: new Date('2022-08-28'),
            barcode: 'barcode189279',
        },
    });

    const pole2 = await prisma.pole.create({
        data: {
            type: 'AAA002',
            productNumber: '00142823',
            manufacturingDate: new Date('2021-06-15'),
            barcode: 'barcode189280',
        },
    });

    // Create some Locations
    const location1 = await prisma.location.create({
        data: {
            name: 'UP3 Ponorogo',
            latitude: '0.0',
            longitude: '0.0',
        },
    });

    const location2 = await prisma.location.create({
        data: {
            name: 'UP3 Madiun',
            latitude: '1.1',
            longitude: '1.1',
        },
    });

    // Create some Statuses
    const status1 = await prisma.status.create({
        data: {
            status: 'pending',
        },
    });

    const status2 = await prisma.status.create({
        data: {
            status: 'completed',
        },
    });

    // Create some Tasks
    const task1 = await prisma.task.create({
        data: {
            name: 'Pole Inspection',
            photoUrl: 'http://example.com/photo1.jpg',
            date: new Date(),
            statusId: status1.id,
            poleId: pole1.id,
            locationId: location1.id,
            vendorId: vendor1.id,
            driverId: driver1.id,
        },
    });

    const task2 = await prisma.task.create({
        data: {
            name: 'Pole Maintenance',
            photoUrl: 'http://example.com/photo2.jpg',
            date: new Date(),
            statusId: status2.id,
            poleId: pole2.id,
            locationId: location2.id,
            vendorId: vendor2.id,
            driverId: driver2.id,
        },
    });

    console.log({ user1, user2, vendor1, vendor2, driver1, driver2, pole1, pole2, location1, location2, status1, status2, task1, task2 });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
