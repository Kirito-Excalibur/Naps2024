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
    select: { id: true, body: true, title: true, user: true, thumbnail: true },
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
  userId,
  thumbnail,
}: Pick<Note, "body" | "title" | "thumbnail"> & {
  userId: User["id"];
}) {
  return prisma.note.create({
    data: {
      title,
      body,
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

export function getAllNotes() {
  return prisma.note.findMany({
    select: {
      id: true,
      title: true,
      userId: true,
      thumbnail:true,
      user: {
        select: {
          email: true, // Fetch the email of the user
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}
