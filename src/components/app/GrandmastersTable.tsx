import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader, TableRow
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

import { getGrandmasters } from '@/api';
import type { GrandmastersList } from '@/types/api';

function GrandmastersTable() {
  const ROWS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: grandmasters, isLoading, error } = useQuery<GrandmastersList>({
    queryKey: ['grandmasters'],
    queryFn: getGrandmasters,
  });

  const paginatedData: string[] = useMemo(() => {
    if (!grandmasters?.players) return [];

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    return grandmasters.players.slice(startIndex, endIndex);
  }, [grandmasters?.players, currentPage]);

  const totalPages: number = useMemo(() => {
    if (!grandmasters?.players) return 0;
    return Math.ceil(grandmasters.players.length / ROWS_PER_PAGE);
  }, [grandmasters?.players]);

  const handlePrevious = (): void => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = (): void => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
  };

  const renderPaginationItems = (): React.ReactNode[] => {
    const items: React.ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageClick(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageClick(1)}
            isActive={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageClick(i)}
              isActive={currentPage === i}
              className={currentPage === i ? "pointer-events-none opacity-50" : "cursor-pointer"}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => handlePageClick(totalPages)}
              isActive={currentPage === totalPages}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card className="w-full max-w-[600px] mx-auto px-4 sm:px-6 py-6">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Chess Grandmasters</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Current grandmasters: {grandmasters?.players?.length || 0}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[300px] sm:min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-sm sm:text-base">Player</TableHead>
                <TableHead className="font-bold text-center text-sm sm:text-base">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((player: string) => (
                <TableRow key={player}>
                  <TableCell className="text-left text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">
                    {player}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link to={`/player/${player}`}>
                      <Button 
                        variant="outline" 
                        className="hover:cursor-pointer text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
                      >
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && (
          <Pagination className="mt-4 flex justify-center">
            <PaginationContent className="flex flex-wrap gap-1 sm:gap-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrevious}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  )
}

export default GrandmastersTable
