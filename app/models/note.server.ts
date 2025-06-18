import type { User, Note } from "@prisma/client";
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";

export type { Note } from "@prisma/client";

export function getNote({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId?: User["id"]; // Make userId optional
}) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true, user: true, thumbnail: true,author:true },
    where: {
      id,
      ...(userId && { userId }), // Conditionally include userId if provided
    },
  });
}

export function getNoteListItems({ userId }: { userId: User["id"] }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createNote({
  body,
  title,
  author,
  userId,
  thumbnail,
}: Pick<Note, "body" | "title" | "thumbnail"|"author"> & {
  userId: User["id"];
}) {
  return prisma.note.create({
    data: {
      title,
      body,
      author,
      thumbnail,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}

export function getAllNotes(searchQuery?: string) {
  return prisma.note.findMany({
    where: searchQuery
      ? {
          title: {
            contains: searchQuery, // Search for titles containing the query
            mode: "insensitive", // Case-insensitive search
          },
        }
      : undefined, // If no search query, return all notes
    select: {
      id: true,
      title: true,
      userId: true,
      thumbnail: true,
      author: true,
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
