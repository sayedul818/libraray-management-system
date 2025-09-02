import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, CreateBookRequest, UpdateBookRequest } from '@/store/api/booksApi';

interface BookFormProps {
  book?: Book;
  onSubmit: (data: CreateBookRequest | Omit<UpdateBookRequest, 'id'>) => void;
  isLoading: boolean;
  mode: 'create' | 'edit';
}

export const BookForm = ({ book, onSubmit, isLoading, mode }: BookFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateBookRequest>({
    defaultValues: {
      title: book?.title || '',
      author: book?.author || '',
      genre: book?.genre || '',
      isbn: book?.isbn || '',
      description: book?.description || '',
      copies: book?.copies || 1,
      available: book?.available ?? true,
    },
  });

  const [available, setAvailable] = useState(book?.available ?? true);
  const copies = watch('copies');

  const handleAvailableChange = (checked: boolean) => {
    setAvailable(checked);
    setValue('available', checked);
  };

  const onFormSubmit = (data: CreateBookRequest) => {
    onSubmit({
      ...data,
      available: available && data.copies > 0,
    });
  };

  return (
    <Card className="max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">
          {mode === 'create' ? 'Add New Book' : 'Edit Book'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title *
              </Label>
              <Input
                id="title"
                type="text"
                className="mt-1"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Author */}
            <div>
              <Label htmlFor="author" className="text-sm font-medium">
                Author *
              </Label>
              <Input
                id="author"
                type="text"
                className="mt-1"
                {...register('author', { required: 'Author is required' })}
              />
              {errors.author && (
                <p className="text-sm text-destructive mt-1">{errors.author.message}</p>
              )}
            </div>

            {/* Genre */}
            <div>
              <Label htmlFor="genre" className="text-sm font-medium">
                Genre *
              </Label>
              <Input
                id="genre"
                type="text"
                className="mt-1"
                {...register('genre', { required: 'Genre is required' })}
              />
              {errors.genre && (
                <p className="text-sm text-destructive mt-1">{errors.genre.message}</p>
              )}
            </div>

            {/* ISBN */}
            <div>
              <Label htmlFor="isbn" className="text-sm font-medium">
                ISBN *
              </Label>
              <Input
                id="isbn"
                type="text"
                className="mt-1 font-mono"
                {...register('isbn', { required: 'ISBN is required' })}
              />
              {errors.isbn && (
                <p className="text-sm text-destructive mt-1">{errors.isbn.message}</p>
              )}
            </div>

            {/* Copies */}
            <div>
              <Label htmlFor="copies" className="text-sm font-medium">
                Number of Copies *
              </Label>
              <Input
                id="copies"
                type="number"
                min="0"
                className="mt-1"
                {...register('copies', { 
                  required: 'Number of copies is required',
                  min: { value: 0, message: 'Copies cannot be negative' }
                })}
              />
              {errors.copies && (
                <p className="text-sm text-destructive mt-1">{errors.copies.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                className="mt-1"
                rows={4}
                placeholder="Brief description of the book..."
                {...register('description')}
              />
            </div>

            {/* Available Switch */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3">
                <Switch
                  id="available"
                  checked={available && copies > 0}
                  onCheckedChange={handleAvailableChange}
                  disabled={copies === 0}
                />
                <Label htmlFor="available" className="text-sm font-medium">
                  Available for borrowing
                  {copies === 0 && (
                    <span className="text-muted-foreground ml-2">
                      (automatically disabled when copies = 0)
                    </span>
                  )}
                </Label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
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
              disabled={isLoading}
              className="bg-gradient-primary"
            >
              {isLoading 
                ? 'Saving...' 
                : mode === 'create' 
                  ? 'Add Book' 
                  : 'Update Book'
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};