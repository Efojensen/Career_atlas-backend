import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import seekerModel from '../../db/seekerSchema';
import cloudinary from '../../utils/cloudinary';
import { OAuth2Client } from 'google-auth-library';

export async function getAllUsers(req: Request, res: Response) {
    const users = await seekerModel.find()

    res.json({
        users: users
    })
}

export async function signUp(req: Request, res: Response) {
    let data = req.usrCredentials
    try {
        data.password = await bcrypt.hash(data.password, 10);

        if (!data) {
            res.status(500).json({ msg: "Data is empty" })
            return;
        }

        if (!req.file) {
            res.status(400).json({ msg: 'No profile picture uploaded' });
            return;
        }

        const result = await cloudinary.uploader.upload(req.file.path)

        let skills;
        if (data.skills !== null && typeof data.skills === 'string') {
            skills = data.skills.split(',')
        }

        if (data.student === 'Yes'){
            data.student = true;
        } else {
            data.student = false;
        }

        const newUser = new seekerModel({
            skills: skills,
            email: data.email,
            student: data.student,
            password: data.password,
            username: data.username,
            profile_pic: result.url,
            preferredJobType: data.preferredJobType,
            yearsOfExperience: data.yearsOfExperience,
        });

        const user = await newUser.save()

        res.status(201).json({
            newUser: user
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: `Something went wrong: ${error}`
        })
    }
}

export async function signIn(req: Request, res: Response) {
    try {
        const { email, password } = req.usrCredentials;

        if (!email || !password) {
            res.status(400).json({ msg: 'Email and password are required' });
            return;
        }

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
            { email: registeredUser.email },
            process.env['JWT_SECRET']!,
            { expiresIn: '12h' },
        );

        res.status(200).json({ token, registeredUser })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', err: error })
    }
};

export async function signInWithGoogle(req: Request, res: Response) {
    try {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Referrer-Policy', 'no-referrer-when-downgrade');

        const redirectUrl = 'http://localhost:3000';
        const oAuth2Client = new OAuth2Client(
            process.env["GOOGLE_ID"]!,
            process.env["GOOGLE_CLIENT_SECRET"]!,
            redirectUrl
        );
    } catch (error) {

    }
}
