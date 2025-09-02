import { Link } from 'react-router-dom';
import { Edit2, Trash2, Eye, UserPlus, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Book } from '@/store/api/booksApi';
import { useToast } from '@/hooks/use-toast';

interface BookTableProps {
  books: Book[];
  onDeleteBook: (id: string) => void;
  isDeleting?: boolean;
}

export const BookTable = ({ books, onDeleteBook, isDeleting }: BookTableProps) => {
  const { toast } = useToast();

  const handleDeleteClick = (book: Book) => {
    onDeleteBook(book._id);
    toast({
      title: "Book deleted",
      description: `"${book.title}" has been removed from the library.`,
    });
  };

  if (books.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent className="pt-6">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No books found</h3>
          <p className="text-muted-foreground mb-6">
            Start building your library by adding your first book.
          </p>
          <Button asChild>
            <Link to="/create-book">Add Your First Book</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Author</TableHead>
                <TableHead className="font-semibold">Genre</TableHead>
                <TableHead className="font-semibold">ISBN</TableHead>
                <TableHead className="font-semibold text-center">Copies</TableHead>
                <TableHead className="font-semibold text-center">Status</TableHead>
                <TableHead className="font-semibold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">
                    <Link 
                      to={`/books/${book._id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {book.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{book.author}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {book.genre}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={book.copies > 0 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {book.copies}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={book.available && book.copies > 0 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {book.available && book.copies > 0 ? 'Available' : 'Unavailable'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                      >
                        <Link to={`/books/${book._id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8 w-8 p-0 hover:bg-accent/10 hover:text-accent"
                      >
                        <Link to={`/edit-book/${book._id}`}>
                          <Edit2 className="h-4 w-4" />
                        </Link>
                      </Button>

                      {book.available && book.copies > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8 p-0 hover:bg-success/10 hover:text-success"
                        >
                          <Link to={`/borrow/${book._id}`}>
                            <UserPlus className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Book</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{book.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteClick(book)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};