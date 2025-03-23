import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import employerModel from '../../db/employerSchema';

export async function signUp(req: Request, res: Response) {
    let data = req.empCredentials;
    try {
        data.password = await bcrypt.hash(data.password, 10)

        const newEmp = new employerModel({
            email: data.email,
            password: data.password,
            compName: data.compName,
            compDomain: data.compDomain,
            compLocations: data.compLocations,
        });

        const emp = await newEmp.save();

        res.status(201).json({
            employer: emp
        })
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong', err: error })
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.empCredentials

        if (!email || !password) {
            res.status(400).json({ msg: 'Email and password are required' });
            return;
        }

        const [employer] = await employerModel.find({ email })

        if (!employer) {
            res.status(404).json({ msg: 'Employer not found' });
            return;
        }

        const match = await bcrypt.compare(password, employer.password);

        if (!match) {
            res.status(401).json({ msg: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { empId: employer._id },
            process.env['JWT_SECRET']!,
            { expiresIn: '12h' }
        );

        res.status(200).json({ token: token, msg: "Logged In" })
    } catch (e) {
        res.status(500).json({ msg: 'Something went wrong', error: e })
    }
}