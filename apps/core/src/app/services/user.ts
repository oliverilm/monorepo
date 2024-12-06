import { PrismaClient, Session, User, UserProfile } from "@prisma/client"
import securify from "./securify"
import session from "./session"
import { exclude } from "../utils/object"
import { profile } from "console"

const prisma = new PrismaClient()

interface LoginCredentials {
    email: string,
    password: string
}

interface AuthenticationPayload {
    profile: UserProfile,
    token: Session["token"]
}


class UserService {
    async login({ email, password }: LoginCredentials): Promise<AuthenticationPayload> {
        const user = await prisma.user.findFirst({
            where: {
                email,
                password: securify.hashPassword(password)
            }
        })

        if (!user) {
            throw new Error('Invalid credentials')
        }

        const profile = await prisma.userProfile.findUnique({
            where: {
                userId: user.id
            }
        })

        const token = (await session.createSession(user.id)).token
        
        return {
            profile,
            token
        }
    }

    async getUserProfile(userId: string): Promise<UserProfile> {
        const profile = await  prisma.userProfile.findUnique({
            where: {
                id: userId
            },
        })

        return profile
    }

    async createUser({ email, password }: LoginCredentials): Promise<AuthenticationPayload> {
        const user = await prisma.user.create({
            data: {
                email,
                password: securify.hashPassword(password)
            }
        })

        const profile = await prisma.userProfile.create({
            data: {
                userId: user.id,
            }
        })

        const token = (await session.createSession(user.id)).token

        return {
            profile, 
            token
        }
    }

}

export default new UserService()