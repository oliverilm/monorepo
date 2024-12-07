import { PrismaClient, Session,  UserProfile } from "@prisma/client"
import securify from "./securify"
import session from "./session"

const prisma = new PrismaClient()

export interface LoginCredentials {
    email: string,
    password: string
}

export interface AuthenticationPayload {
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
                password: securify.hashPassword(password),
            }
        })

        if (!user) {
            throw new Error("something went wrong")
        }

        const [profile, sess] = await Promise.all([
            prisma.userProfile.create({
                data: {
                    userId: user.id
                }
            }),
            session.createSession(user.id)
        ])


        return {
            profile, 
            token: sess.token
        }
    }

}

export default new UserService()