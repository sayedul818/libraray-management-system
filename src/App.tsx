import { Provider } from 'react-redux';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store/store";
import { Layout } from "./components/layout/Layout";
import { BooksPage } from "./pages/BooksPage";
import { CreateBookPage } from "./pages/CreateBookPage";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { EditBookPage } from "./pages/EditBookPage";
import { BorrowBookPage } from "./pages/BorrowBookPage";
import { BorrowSummaryPage } from "./pages/BorrowSummaryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/books" replace />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/create-book" element={<CreateBookPage />} />
              <Route path="/books/:id" element={<BookDetailsPage />} />
              <Route path="/edit-book/:id" element={<EditBookPage />} />
              <Route path="/borrow/:bookId" element={<BorrowBookPage />} />
              <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
