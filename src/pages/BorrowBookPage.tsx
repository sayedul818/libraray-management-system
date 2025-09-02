import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BorrowForm } from '@/components/books/BorrowForm';
import { 
  useGetBookByIdQuery, 
  useBorrowBookMutation, 
  BorrowRequest 
} from '@/store/api/booksApi';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export const BorrowBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, error } = useGetBookByIdQuery(bookId!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  const { toast } = useToast();

  const handleSubmit = async (data: Omit<BorrowRequest, 'bookId'>) => {
    try {
      await borrowBook({ bookId: bookId!, ...data }).unwrap();
      toast({
        title: "Success",
        description: `You have successfully borrowed "${book?.title}".`,
      });
      navigate('/borrow-summary');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to borrow book. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertDescription>
            Book not found or failed to load. Please try again.
          </AlertDescription>
        </Alert>
        <Button asChild variant="outline">
          <Link to="/books">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>
        </Button>
      </div>
    );
  }

  if (!book.available || book.copies === 0) {
    return (
      <div className="space-y-6">
        <Button asChild variant="outline">
          <Link to={`/books/${bookId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Book Details
          </Link>
        </Button>

        <Alert variant="destructive">
          <AlertDescription>
            This book is currently unavailable for borrowing.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button asChild variant="outline">
        <Link to={`/books/${bookId}`}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Book Details
        </Link>
      </Button>

      <div className="text-center">
        <h1 className="text-3xl font-serif font-bold text-foreground">Borrow Book</h1>
        <p className="text-muted-foreground mt-2">
          Complete the form below to borrow this book
        </p>
      </div>

      <BorrowForm
        book={book}
        onSubmit={handleSubmit}
        isLoading={isBorrowing}
      />
    </div>
  );
};