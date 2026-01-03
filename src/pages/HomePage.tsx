import { Link } from 'react-router-dom'
import { Package, List, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>
      
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
         
          
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-purple-600 dark:text-purple-400">
            StockHub
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4 font-light">
            Professional catalog inventory portal
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Manage your retail inventory with ease, precision, and powerful analytics
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Link to="/inventory" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
              
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-2xl bg-purple-500 shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform duration-300">
                    <List className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Inventory Overview</CardTitle>
                </div>
                <CardDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  View and manage your complete product inventory with advanced filtering, sorting, and search capabilities for efficient operations.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      Features
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      High-density view • Real-time updates • Advanced filters
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-purple-600 dark:text-purple-400 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/catalogue" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-2 cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-violet-500 dark:hover:border-violet-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
              
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-2xl bg-violet-500 shadow-lg shadow-violet-500/50 group-hover:scale-110 transition-transform duration-300">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Catalogue Overview</CardTitle>
                </div>
                <CardDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Browse products organized by category with an intuitive visual catalog interface designed for seamless navigation.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                      Features
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Category browsing • Visual navigation • Quick access
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-violet-600 dark:text-violet-400 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  )
}
