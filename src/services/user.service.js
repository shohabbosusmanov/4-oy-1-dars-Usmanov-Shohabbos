import prisma from "../config/database.js";
import CustomError from "../utils/custom_error.js";
import bcrypt from "bcryptjs";

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
        try {
            const hashedPassword = await bcrypt.hash(data.password, 12);
            data = { ...data, password: hashedPassword };
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
        } catch (error) {
            if (error.code == "P2002") {
                throw new CustomError("username already exists", 400);
            }
            throw error;
        }
    }

    async update(id, data) {
        try {
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data,
            });

            return updatedUser;
        } catch (error) {
            if (error.code == "P2002") {
                throw new CustomError("username already exists", 400);
            }
            throw error;
        }
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
