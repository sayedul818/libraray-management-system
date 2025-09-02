import { useParams, Link } from 'react-router-dom';
import { Edit2, UserPlus, ArrowLeft, Calendar, User, BookOpen, Hash, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGetBookByIdQuery } from '@/store/api/booksApi';

export const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useGetBookByIdQuery(id!);

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
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button asChild variant="outline">
        <Link to="/books">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Books
        </Link>
      </Button>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Book Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0">
              <div>
                <CardTitle className="text-2xl font-serif">{book.title}</CardTitle>
                <p className="text-lg text-muted-foreground mt-1">by {book.author}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={book.available && book.copies > 0 ? "default" : "destructive"}
                  className="text-sm"
                >
                  {book.available && book.copies > 0 ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Genre</p>
                  <p className="text-foreground">{book.genre}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Hash className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ISBN</p>
                  <p className="text-foreground font-mono">{book.isbn}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Copies Available</p>
                  <p className="text-foreground font-semibold">{book.copies}</p>
                </div>
              </div>
              {book.createdAt && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Added</p>
                    <p className="text-foreground">
                      {new Date(book.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {book.description && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{book.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full" variant="outline">
              <Link to={`/edit-book/${book._id}`}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Book
              </Link>
            </Button>

            {book.available && book.copies > 0 ? (
              <Button asChild className="w-full bg-gradient-primary">
                <Link to={`/borrow/${book._id}`}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Borrow Book
                </Link>
              </Button>
            ) : (
              <Button disabled className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Unavailable
              </Button>
            )}

            <div className="pt-4 border-t">
              <div className="text-center">
                <Badge 
                  variant={book.copies > 0 ? "default" : "destructive"}
                  className="text-sm"
                >
                  {book.copies} {book.copies === 1 ? 'Copy' : 'Copies'} Available
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};