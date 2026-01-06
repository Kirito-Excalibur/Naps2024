
import type { User, WinterPost } from "@prisma/client";
import { prisma } from "~/db.server";
export type { WinterPost } from "@prisma/client";


export function getWinterPost({
  id,
  userId,
}: Pick<WinterPost, "id"> & { userId?: User["id"] }) {
  return prisma.winterPost.findFirst({
    select: { id: true, title: true,year:true,
  week:true, link: true, imageUrl: true, user: true },
    where: {
      id,
      ...(userId && { userId }),
    },
  });
}


export function getWinterPostListItems({ userId }: { userId?: User["id"] }) {
  return prisma.winterPost.findMany({
    where: userId ? { userId } : undefined,
    select: { id: true, title: true,link:true,year:true,
  week:true, userId: true, imageUrl: true },
    orderBy: { updatedAt: "desc" },
  });
}


export function createWinterPost({
  title,
  link,
  imageUrl, 
  userId,
  year,
  week,
}: {
  title: string;
  link: string;
   year: number;
  week: number;
  imageUrl?: string; 
  userId: string;
}) {
  return prisma.winterPost.create({
    data: {
      title,
      link,
      year,
      week,
      user: { connect: { id: userId } },
      ...(imageUrl ? { imageUrl } : { imageUrl: "" }), 
    },
  });
}



export function updateWinterPost({
  id,
  title,
  link,
  year,
  week,
  imageUrl, 
  userId,
}: {
  id: string;
  title: string;
  link: string;
  year: number;
  week: number;
  imageUrl?: string; 
  userId: string;
}) {
  return prisma.winterPost.updateMany({
    where: { id, userId },
    data: {
      title,
      year,
      week,
      link,
      ...(imageUrl ? { imageUrl } : {}), 
    },
  });
}



export function deleteWinterPost({
  id,
  userId,
}: Pick<WinterPost, "id"> & { userId: User["id"] }) {
  return prisma.winterPost.deleteMany({
    where: { id, userId },
  });
}


export function getAllWinterPosts(searchQuery?: string) {
  return prisma.winterPost.findMany({
    where: searchQuery
      ? {
          title: {
            contains: searchQuery,
            mode: "insensitive",
          },
        }
      : undefined,
    select: {
      id: true,
      title: true,
      link: true,
      imageUrl: true,
      userId: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}
