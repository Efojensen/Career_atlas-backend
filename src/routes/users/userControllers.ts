import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
    try {
        const { email, password } = req.usrCredentials;

        const [registeredUser] = await seekerModel.find({ email });

        if (!registeredUser) {
            res.status(401).json({ error: 'Authentication failed' });
            return;
        }

        const matched = await bcrypt.compare(password, registeredUser.password);

        if (!matched) {
            res.status(401).json({ error: 'Authentication failed' });
            return;
        }

        const token = jwt.sign(
            {email: registeredUser.email},
            process.env['JWT_SECRET']!,
            { expiresIn: '12h' },
        );

        req.headers.authorization = token;

        res.status(200).json({ token, registeredUser })
    } catch (error) {
        res.status(500).json({ error: `Something went wrong: ${error}` })
    }
};
