import Link from "next/link";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  seeAllBooksLink?: boolean;
}

const BookList = ({
  title,
  books,
  containerClassName,
  seeAllBooksLink = false,
}: Props) => {
  if (books.length < 1) return;

  return (
    <>
      <section className={containerClassName}>
        <div className="flex flex-row justify-between">
          <div>
            <h2 className="font-bebas-neue text-light-100 text-4xl">{title}</h2>
          </div>

          {seeAllBooksLink && (
            <div className="flex items-center">
              <Link className="text-light-100" href={`/books?page=1`}>
                <p className="font-bebas-neue text-light-100 text-2xl">
                  {"See all books >"}
                </p>
              </Link>
            </div>
          )}
        </div>

        <ul className="book-list">
          {books.map((book) => (
            <BookCard key={book.title} {...book} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default BookList;
