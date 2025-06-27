import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookBorrowedList = ({ title, books, containerClassName }: Props) => {
  if (books.length < 1) return;

  return (
    <>
      <section className={containerClassName}>
        <div className="flex flex-row justify-between">
          <div>
            <h2 className="font-bebas-neue text-light-100 text-4xl">{title}</h2>
          </div>
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

export default BookBorrowedList;
