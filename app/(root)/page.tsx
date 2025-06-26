import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { booksTable } from "@/database/schema";
import { desc } from "drizzle-orm";

const Home = async () => {
  const session = await auth();

  // TODO handle pagination
  const latestBooks = (await db
    .select()
    .from(booksTable)
    .orderBy(desc(booksTable.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id} />
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
