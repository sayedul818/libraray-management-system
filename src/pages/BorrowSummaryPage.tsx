import { BookOpen, BarChart3, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetBorrowSummaryQuery } from '@/store/api/booksApi';

export const BorrowSummaryPage = () => {
  const { data: borrowSummary, isLoading, error, refetch } = useGetBorrowSummaryQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading borrow summary...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Borrow Summary</h1>
          <p className="text-muted-foreground mt-1">
            Track books that have been borrowed from the library
          </p>
        </div>

        <Alert variant="destructive">
          <AlertDescription>
            Failed to load borrow summary. Please check your connection and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const totalBorrowed = borrowSummary?.reduce(
    (total, item) => total + item.totalQuantityBorrowed, 
    0
  ) || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Borrow Summary</h1>
        <p className="text-muted-foreground mt-1">
          Track books that have been borrowed from the library
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Unique Books Borrowed</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {borrowSummary?.length || 0}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Total Copies Borrowed</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{totalBorrowed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Summary Table */}
      {borrowSummary && borrowSummary.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Borrowed Books Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Book Title</TableHead>
                    <TableHead className="font-semibold">ISBN</TableHead>
                    <TableHead className="font-semibold text-center">Total Quantity Borrowed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowSummary.map((item, index) => (
                    <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{item.bookTitle}</TableCell>
                      <TableCell className="font-mono text-sm">{item.isbn}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="default" className="text-sm">
                          {item.totalQuantityBorrowed}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="text-center py-12">
          <CardContent className="pt-6">
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Borrowed Books</h3>
            <p className="text-muted-foreground">
              No books have been borrowed yet. Start borrowing books to see the summary here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};