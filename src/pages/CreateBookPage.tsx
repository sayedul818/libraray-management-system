import { useNavigate } from 'react-router-dom';
import { BookForm } from '@/components/books/BookForm';
import { useCreateBookMutation, CreateBookRequest } from '@/store/api/booksApi';
import { useToast } from '@/hooks/use-toast';

export const CreateBookPage = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();
  const { toast } = useToast();

  const handleSubmit = async (data: CreateBookRequest) => {
    try {
      const result = await createBook(data).unwrap();
      toast({
        title: "Success",
        description: `"${result.title}" has been added to the library.`,
      });
      navigate('/books');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create book. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-serif font-bold text-foreground">Add New Book</h1>
        <p className="text-muted-foreground mt-2">
          Expand your library collection with a new book
        </p>
      </div>

      <BookForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        mode="create"
      />
    </div>
  );
};