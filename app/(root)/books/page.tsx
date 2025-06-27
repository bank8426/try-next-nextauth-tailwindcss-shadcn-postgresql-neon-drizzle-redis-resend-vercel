import BookList from "@/components/BookList";
import React from "react";
import { sampleBooks } from "@/constants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { booksTable } from "@/database/schema";
import { db } from "@/database/drizzle";
import { count, desc } from "drizzle-orm";

const getPage = (page: number, lastPage: number) => {
  if (page > lastPage) return lastPage;
  if (page > 0) return page;

  return 1;
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const pageSize = 12;
  const pageSearchParams = parseInt((await searchParams).page!) || 1;
  const [{ total }] = await db.select({ total: count() }).from(booksTable);
  const lastPage = Math.ceil(total / pageSize);
  const page = getPage(pageSearchParams, lastPage);

  const latestBooks = await db
    .select()
    .from(booksTable)
    .orderBy(desc(booksTable.createdAt))
    .offset((page - 1) * pageSize)
    .limit(pageSize);

  const pageBefore = [];
  for (let i = 1; i < 3 && page - i > 1; i++) {
    pageBefore.unshift(
      <PaginationItem key={page - i}>
        <PaginationLink href={`/books?page=${page - i}`}>
          {page - i}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  const pageAfter = [];
  for (let i = 1; i < 3 && page + i < lastPage; i++) {
    pageAfter.push(
      <PaginationItem key={page + i}>
        <PaginationLink href={`/books?page=${page + i}`}>
          {page + i}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return (
    <>
      {latestBooks.length === 0 && (
        <div className="mb-10 flex flex-col items-center">
          <h1 className="font-bebas-neue text-light-100 text-5xl font-bold">
            No books found
          </h1>
          <p className="text-light-400 mt-3 max-w-xl text-center">
            Please check your page
          </p>
        </div>
      )}

      <BookList
        title={`Latest Books (${total})`}
        books={latestBooks}
        containerClassName="mt-28"
      />

      <Pagination id="pagination" className="text-light-100">
        <PaginationContent>
          {page > 1 && (
            <>
              <PaginationItem>
                <PaginationPrevious href={`/books?page=${page - 1}`} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`/books?page=${1}`}>{1}</PaginationLink>
              </PaginationItem>
            </>
          )}

          {page - 3 > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {pageBefore}

          <PaginationItem>
            <PaginationLink
              href={`/books?page=${page}`}
              isActive
              className="text-black"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          {pageAfter}
          {page + 3 < lastPage && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {page < lastPage && (
            <>
              <PaginationItem>
                <PaginationLink href={`/books?page=${lastPage}`}>
                  {lastPage}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href={`/books?page=${page + 1}`} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default page;
