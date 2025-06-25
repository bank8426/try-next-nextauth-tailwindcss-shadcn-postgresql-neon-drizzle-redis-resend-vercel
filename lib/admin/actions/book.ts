"use server";
import { db } from "@/database/drizzle";
import { booksTable } from "@/database/schema";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(booksTable)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return { success: true, data: JSON.parse(JSON.stringify(newBook[0])) };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};
