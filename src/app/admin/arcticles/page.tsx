'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { CustomArticle } from '@/lib/types';
import AddArticle from './_components/add-article/add-article';
import DeleteArticle from './_components/delete-article/delete-article-button';
import EditArticleDialog from './_components/edit-article/edit-article';

export default function ArticlesTable() {
  const [articles, setArticles] = useState<CustomArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [editingArticle, setEditingArticle] = useState<CustomArticle | null>(null);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('/api/articles');

      if (res.data.success) {
        setArticles(res.data.data.articles);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [refresh]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mx-auto flex flex-col space-y-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white rounded-xl shadow-sm p-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Нийтлэл / Мэдээ</h1>
            <p className="text-gray-500 mt-1">DJI мэдээ удирдах хэсэг</p>
          </div>

          <AddArticle setRefresh={setRefresh} />
        </motion.div>

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : articles.length === 0 ? (
          /* EMPTY STATE */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Одоогоор нийтлэл байхгүй байна
            </h3>

            <AddArticle setRefresh={setRefresh} />
          </motion.div>
        ) : (
          /* ARTICLES GRID */
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.05 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {articles.map((article) => (
                <motion.div
                  key={article.id}
                  variants={cardVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="flex flex-col h-full hover:shadow-md transition">
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="flex-grow space-y-3">
                      <p className="text-sm text-gray-600 line-clamp-3">{article.summary}</p>

                      <div className="flex gap-2">
                        {article.featured && <Badge>Featured</Badge>}

                        <Badge variant={article.published ? 'default' : 'secondary'}>
                          {article.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    </CardContent>

                    {/* ACTIONS */}
                    <div className="p-4 border-t flex justify-between">
                      <Button variant="ghost" size="sm" onClick={() => setEditingArticle(article)}>
                        Засварлах
                      </Button>

                      <DeleteArticle articleId={article.id} setRefresh={setRefresh} />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {editingArticle && (
        <EditArticleDialog
          article={editingArticle}
          setRefresh={setRefresh}
          onClose={() => setEditingArticle(null)}
        />
      )}
    </div>
  );
}
