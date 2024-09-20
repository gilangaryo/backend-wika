const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed Users
    const user1 = await prisma.user.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            role: 'user',
            password: 'hashed_password',  // Ideally, passwords should be hashed.
        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '0987654321',
            role: 'user',
            password: 'hashed_password', // Ideally, passwords should be hashed.
        },
    });

    // Seed Admins
    const admin1 = await prisma.admin.create({
        data: {
            name: 'SuperAdmin',
            phone: '111222333',
            email: 'superadmin@example.com',
            password: 'hashed_password',  // Password should be hashed
            isSuperAdmin: true,
        },
    });

    // Seed Vendors
    const vendor1 = await prisma.vendor.create({
        data: {
            name: 'Vendor One',
            email: 'vendor1@example.com',
            phone: '1231231234',
            description: 'Vendor for electrical products',
            location: 'New York',
        },
    });

    // Seed Drivers
    const driver1 = await prisma.driver.create({
        data: {
            name: 'Driver One',
            email: 'driver1@example.com',
            phone: '5554443333',
            password: 'hashed_password',
            licensePlate: 'ABC-1234',
            vendor: { connect: { vendorId: vendor1.vendorId } },
        },
    });

    // Seed Orders
    const order1 = await prisma.order.create({
        data: {
            description: 'Order for 10 poles',
            vendor: { connect: { vendorId: vendor1.vendorId } },
            driver: { connect: { driverId: driver1.driverId } },
        },
    });

    // Seed Poles
    const pole1 = await prisma.pole.create({
        data: {
            type: 'Electrical',
            uniqueCode: 'POLE001',
            numberProduct: 10,
            order: { connect: { orderId: order1.orderId } },
        },
    });

    // Seed Tracking
    // Seed Tracking
    const tracking1 = await prisma.tracking.create({
        data: {
            status: 'In Transit',
            description: 'Shipment is on its way',
            latitude: 40.712776,
            longitude: -74.005974,
            licensePlate: driver1.licensePlate,
            picture: 'shipment.jpg',  // Add a value for picture here
            order: { connect: { orderId: order1.orderId } },
        },
    });


    console.log('Seed data created!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
