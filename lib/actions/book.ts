"use server";

import { db } from "@/database/drizzle";
import { booksTable, borrowRecordsTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { bookId, userId } = params;

  try {
    const book = await db
      .select({ availableCopies: booksTable.availableCopies })
      .from(booksTable)
      .where(eq(booksTable.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return { success: false, error: "Book is not available for borrowing" };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();
    const record = await db
      .insert(borrowRecordsTable)
      .values({
        userId,
        bookId,
        dueDate,
        status: "BORROWED",
      })
      .returning();

    await db
      .update(booksTable)
      .set({
        availableCopies: book[0].availableCopies - 1,
      })
      .where(eq(booksTable.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occured while borrowing the book",
    };
  }
};
