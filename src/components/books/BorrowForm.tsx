import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, BorrowRequest } from '@/store/api/booksApi';

interface BorrowFormData {
  quantity: number;
  dueDate: string;
}

interface BorrowFormProps {
  book: Book;
  onSubmit: (data: Omit<BorrowRequest, 'bookId'>) => void;
  isLoading: boolean;
}

export const BorrowForm = ({ book, onSubmit, isLoading }: BorrowFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BorrowFormData>();

  // Get tomorrow's date as minimum due date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const onFormSubmit = (data: BorrowFormData) => {
    onSubmit({
      quantity: data.quantity,
      dueDate: data.dueDate,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Book Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif">Book Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{book.title}</h3>
              <p className="text-muted-foreground">by {book.author}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{book.genre}</Badge>
              <span className="text-sm text-muted-foreground font-mono">{book.isbn}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Available copies:</span>
              <Badge 
                variant={book.copies > 0 ? "default" : "destructive"}
                className="text-sm"
              >
                {book.copies}
              </Badge>
            </div>
            {book.description && (
              <div>
                <p className="text-sm text-muted-foreground mt-2">{book.description}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Borrow Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif">Borrow This Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantity */}
              <div>
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Quantity *
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={book.copies}
                  className="mt-1"
                  {...register('quantity', {
                    required: 'Quantity is required',
                    min: { value: 1, message: 'Quantity must be at least 1' },
                    max: { 
                      value: book.copies, 
                      message: `Cannot exceed available copies (${book.copies})` 
                    },
                  })}
                />
                {errors.quantity && (
                  <p className="text-sm text-destructive mt-1">{errors.quantity.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum: {book.copies} copies available
                </p>
              </div>

              {/* Due Date */}
              <div>
                <Label htmlFor="dueDate" className="text-sm font-medium">
                  Due Date *
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  min={minDate}
                  className="mt-1"
                  {...register('dueDate', {
                    required: 'Due date is required',
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      
                      if (selectedDate <= today) {
                        return 'Due date must be in the future';
                      }
                      return true;
                    },
                  })}
                />
                {errors.dueDate && (
                  <p className="text-sm text-destructive mt-1">{errors.dueDate.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Select a return date
                </p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !book.available || book.copies === 0}
                className="bg-gradient-primary"
              >
                {isLoading ? 'Processing...' : 'Borrow Book'}
              </Button>
            </div>

            {(!book.available || book.copies === 0) && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="text-sm text-destructive font-medium">
                  This book is currently unavailable for borrowing.
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};