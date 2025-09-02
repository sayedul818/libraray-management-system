import { Link } from 'react-router-dom';
import { Plus, BookOpen, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookTable } from '@/components/books/BookTable';
import { useGetAllBooksQuery, useDeleteBookMutation } from '@/store/api/booksApi';
import { useToast } from '@/hooks/use-toast';

export const BooksPage = () => {
  const { data: books, isLoading, error, refetch } = useGetAllBooksQuery();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const { toast } = useToast();

  const handleDeleteBook = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast({
        title: "Success",
        description: "Book deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load books. Please check your connection and try again.
          </AlertDescription>
        </Alert>
        <div className="text-center">
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Library Books</h1>
          <p className="text-muted-foreground mt-1">
            Manage your book collection and track availability
          </p>
        </div>
        <Button asChild className="bg-gradient-primary shadow-md hover:shadow-lg transition-shadow">
          <Link to="/create-book" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Book</span>
          </Link>
        </Button>
      </div>

      {/* Stats */}
      {books && books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Books</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{books.length}</p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-muted-foreground">Available</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {books.filter(book => book.available && book.copies > 0).length}
            </p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Total Copies</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {books.reduce((total, book) => total + book.copies, 0)}
            </p>
          </div>
        </div>
      )}

      {/* Books Table */}
      <BookTable 
        books={books || []} 
        onDeleteBook={handleDeleteBook}
        isDeleting={isDeleting}
      />
    </div>
  );
};