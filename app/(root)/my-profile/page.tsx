import { auth, signOut } from "@/auth";
import BookBorrowedList from "@/components/BookBorrowedList";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { booksTable, borrowRecordsTable, usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";

const page = async () => {
  const session = await auth();
  let borrowedBook = await db
    .select({
      id: booksTable.id,
      title: booksTable.title,
      genre: booksTable.genre,
      coverColor: booksTable.coverColor,
      coverUrl: booksTable.coverUrl,
    })
    .from(borrowRecordsTable)
    .leftJoin(booksTable, eq(borrowRecordsTable.bookId, booksTable.id))
    .where(eq(borrowRecordsTable.userId, session?.user?.id));

  borrowedBook = borrowedBook.map((book) => ({
    ...book,
    isLoanedBook: true,
  }));

  return (
    <>
      <form
        className="mb-10"
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button>Logout</Button>
      </form>

      <BookBorrowedList title="Borrowed Books" books={borrowedBook} />
    </>
  );
};

export default page;
