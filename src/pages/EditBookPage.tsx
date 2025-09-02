import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookForm } from '@/components/books/BookForm';
import { 
  useGetBookByIdQuery, 
  useUpdateBookMutation, 
  UpdateBookRequest 
} from '@/store/api/booksApi';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export const EditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, error } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const { toast } = useToast();

  const handleSubmit = async (data: Omit<UpdateBookRequest, 'id'>) => {
    try {
      const result = await updateBook({ id: id!, ...data }).unwrap();
      toast({
        title: "Success",
        description: `"${result.title}" has been updated successfully.`,
      });
      navigate(`/books/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update book. Please try again.",
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

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button asChild variant="outline">
        <Link to={`/books/${id}`}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Details
        </Link>
      </Button>

      <div className="text-center">
        <h1 className="text-3xl font-serif font-bold text-foreground">Edit Book</h1>
        <p className="text-muted-foreground mt-2">
          Update the information for "{book.title}"
        </p>
      </div>

      <BookForm
        book={book}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        mode="edit"
      />
    </div>
  );
};