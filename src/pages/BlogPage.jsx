import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: "2025'te En Çok Aranan Yazılımcı Yetenekleri",
      excerpt: "Yapay zeka, siber güvenlik ve bulut bilişim dünyasında sizi öne çıkaracak yetenekleri keşfedin.",
      author: 'Dilara Alkınoğlu',
      date: '15 Mart 2025',
      category: 'Kariyer'
    },
    {
      id: 2,
      title: 'Mülakatlarda Teknik Sorularla Nasıl Başa Çıkılır?',
      excerpt: 'Algoritma sorularından sistem tasarımı mülakatlarına kadar hazırlık süreciniz için ipuçları.',
      author: 'Emirhan Kalkan',
      date: '10 Mart 2025',
      category: 'Rehber'
    },
    {
      id: 3,
      title: 'Remote Çalışma Kültürüne Uyum Sağlamak',
      excerpt: 'Evden daha verimli çalışmanın ve ekip içi iletişimi güçlü tutmanın yolları.',
      author: 'Furkan Gemici',
      date: '5 Mart 2025',
      category: 'Yaşam'
    },
    {
      id: 4,
      title: 'Junior Geliştiriciler İçin Portfolyo Hazırlama',
      excerpt: 'Projelerinizi nasıl sergilemeli ve GitHub profilinizi nasıl düzenlemelisiniz?',
      author: 'Dilara Alkınoğlu',
      date: '1 Mart 2025',
      category: 'Kariyer'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">EngiCareer Blog</h1>
          <p className="text-lg text-slate-600">
            Kariyerinizi bir üst seviyeye taşıyacak ipuçları, teknoloji trendleri ve sektörden haberler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Card className="p-0 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                <div className="h-48 bg-indigo-100 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                   <div className="text-4xl font-bold opacity-20 group-hover:opacity-10">{post.category}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <Button variant="ghost" size="sm" className="w-fit text-indigo-600 p-0 hover:bg-transparent hover:underline group-hover:translate-x-1 transition-transform">
                    Devamını Oku <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
