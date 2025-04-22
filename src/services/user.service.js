import prisma from "../config/database.js";
import CustomError from "../utils/custom_error.js";

export default class UserService {
    constructor() {
        this.prisma = prisma;
    }

    async getAll() {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true,
                password: false,
                created_at: true,
                updated_at: true,
            },
        });
        return users;
    }

    async getOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true,
                password: false,
                created_at: true,
                updated_at: true,
            },
        });

        if (!user) throw new CustomError("user not found", 404);

        return user;
    }

    async create(data) {
        const user = await this.prisma.user.create({
            data,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true,
                password: false,
                created_at: true,
                updated_at: true,
            },
        });

        return user;
    }

    async update(id, data) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data,
        });

        return updatedUser;
    }

    async delete(id) {
        try {
            const deletedUser = await this.prisma.user.delete({
                where: { id },
            });

            return deletedUser;
        } catch (error) {
            throw new CustomError("user not found", 404);
        }
    }
}
