import UserService from "../services/user.service.js";

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async getAll(req, res, next) {
        try {
            const users = await this.userService.getAll();

            res.status(200).json({
                message: "success",
                data: users,
            });
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id;

            const user = await this.userService.getOne(+id);

            res.status(200).json({
                message: "success",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const data = req.body;

            const user = await this.userService.create(data);

            res.status(201).json({
                message: "created",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;

            const data = req.body;

            const user = await this.userService.update(+id, data);

            res.status(200).json({
                message: "updated",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;

            const user = await this.userService.delete(+id);

            res.status(200).json({
                message: "deleted",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }
}
