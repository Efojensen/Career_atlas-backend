import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import seekerModel from '../../db/seekerSchema';

export async function getAllUsers(req: Request, res: Response) {
    const users = await seekerModel.find()

    res.json({
        users: users
    })
}

export async function signUp(req: Request, res: Response) {
    let data = req.usrCredentials
    try {
        data.password = await bcrypt.hash(data.password, 10)

        const newUser = new seekerModel({
            email: data.email,
            student: data.student,
            password: data.password,
            userName: data.userName,
        });

        const user = await newUser.save()

        res.status(201).json({
            newUser: user
        });
    } catch (error) {
        console.log(data)
        res.status(400).json({
            msg: `Something went wrong: ${error}`
        })
    }
}

export async function signIn(req: Request, res: Response) {

}