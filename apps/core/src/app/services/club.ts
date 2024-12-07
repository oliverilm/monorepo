import { Club, PrismaClient } from "@prisma/client";
import { slugifyString } from "../utils/string";

const prisma = new PrismaClient()

export interface ClubCreate {
    name: string;
    country: string;
}
export interface SkipTake {
    skip?: number;
    take?: number
}

export type SlugOrId = {
    id: string
} | { slug: string }

class ClubService {
    async create({ name, country }: ClubCreate): Promise<Club | null> {
        // PS: this action should require a subscription later on
        // if user is subscribed then allow them to create a club

        // the price should be dependant on the avg hosting bill in zone or something like that 
        const club = await prisma.club.create({
            data: {
                name,
                country,
                slug: slugifyString(name),
                description: ""
            }
        })

        if (!club) return null;

        await prisma.clubMetadata.create({
            data: {
                clubId: club.id
            }
        })

        return club
    }

    getClubByIdOrSlug(slugOrId: SlugOrId ): Promise<Club | null> {
        if ("id" in slugOrId) {
            return prisma.club.findUnique({
                where: {
                    id: slugOrId.id
                }
            })
        }
        if ("slug" in slugOrId) {
            return prisma.club.findFirst({
                where: {
                    slug: slugOrId.slug
                }
            })
        }
        return null
    }

    getClubList({ take = 25, skip = 0 }: SkipTake): Promise<Club[]> {
        return prisma.club.findMany({
            take,
            skip,
            orderBy: {
                id: "desc"
            }
        })
    }
}

export default new ClubService()