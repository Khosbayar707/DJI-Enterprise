'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { format } from 'date-fns';
import { Check, Loader2, Trash2 } from 'lucide-react';
import { InstructionRequest } from '@/generated/prisma';
import { Skeleton } from '@/components/ui/skeleton';
import _ from 'lodash';

type SortKey = 'createdAt' | 'resolved';

const InstructionRequestCard = () => {
  const [requests, setRequests] = useState<InstructionRequest[]>([]);
  const [filtered, setFiltered] = useState<InstructionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowLoadingId, setRowLoadingId] = useState<string | null>(null);

  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    order: 'asc' | 'desc';
  }>({ key: 'createdAt', order: 'desc' });

  const fetchRequests = async () => {
    try {
      const res = await axios.get('/api/users/instruction-request');
      const data = res.data.data.requests as InstructionRequest[];
      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRowLoadingId(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    const initial = requests.filter((r) => !r.resolved);
    const sorted = _.orderBy(
      initial.length > 0 ? initial : requests,
      [
        (item) =>
          sortConfig.key === 'createdAt' ? new Date(item.createdAt).getTime() : item.resolved,
      ],
      [sortConfig.order]
    );
    setFiltered(sorted);
  }, [requests, sortConfig]);

  const toggleSort = (key: SortKey) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, order: prev.order === 'asc' ? 'desc' : 'asc' }
        : { key, order: 'asc' }
    );
  };

  const markResolved = async (id: string) => {
    try {
      setRowLoadingId(id);
      await axios.patch(`/api/users/instruction-request`, { id });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRequest = async (id: string) => {
    try {
      setRowLoadingId(id);
      await axios.delete(`/api/users/instruction-request?id=${id}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle>Сургалт авах хүсэлтүүд</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Нэр</TableHead>
                <TableHead>Емайл</TableHead>
                <TableHead>Утас</TableHead>
                <TableHead>Сургалтын төрөл</TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => toggleSort('createdAt')}
                >
                  Огноо {sortConfig.key === 'createdAt' && (sortConfig.order === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => toggleSort('resolved')}
                >
                  Статус {sortConfig.key === 'resolved' && (sortConfig.order === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-36" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-20 rounded-md" />
                        <Skeleton className="h-8 w-20 rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filtered.length > 0 ? (
                filtered.map((req) => {
                  const isRowLoading = rowLoadingId === req.id;
                  return (
                    <TableRow key={req.id} className="relative">
                      {isRowLoading ? (
                        <TableCell colSpan={6} className="relative py-6 text-center">
                          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
                          </div>
                        </TableCell>
                      ) : (
                        <>
                          <TableCell>{req.username}</TableCell>
                          <TableCell>{req.email}</TableCell>
                          <TableCell>{req.phone}</TableCell>
                          <TableCell>{req.instructionType}</TableCell>
                          <TableCell>
                            {format(new Date(req.createdAt), 'yyyy-MM-dd HH:mm')}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                req.resolved
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {req.resolved ? 'Шийдсэн' : 'Хүлээгдэж байна'}
                            </span>
                          </TableCell>
                          <TableCell className="flex gap-2">
                            {!req.resolved && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markResolved(req.id)}
                                disabled={isRowLoading}
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Шийдэх
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteRequest(req.id)}
                              disabled={isRowLoading}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Устгах
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    Хүсэлт алга байна.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructionRequestCard;
