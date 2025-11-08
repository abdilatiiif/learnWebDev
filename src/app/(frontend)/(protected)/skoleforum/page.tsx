'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Heart, MessageCircle, Plus, X, Calendar, User, Upload, Send } from 'lucide-react'

interface Article {
  id: number
  title: string
  subheading: string
  content: string
  image: string
  date: string
  author: string
  likes: number
  comments: number
  isLiked: boolean
}

const dummyartikkler: Article[] = [
  {
    id: 1,
    title: 'Ny Kursutvikling: React 18 Features',
    subheading: 'Lær de nyeste funksjonene i React 18',
    content:
      'React 18 introduserer mange spennende nye funksjoner som Concurrent Features, Automatic Batching, og Suspense for Server-Side Rendering. I dette kurset går vi gjennom alle de viktigste oppdateringene og hvordan du kan bruke dem i dine prosjekter. Vi dekker også best practices og vanlige fallgruver å unngå når du oppgraderer eksisterende applikasjoner til React 18.',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&crop=center',
    date: '2025-11-08',
    author: 'Erik Hansen',
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: 2,
    title: 'Student Spotlight: Maria sitt fullstack prosjekt',
    subheading: 'En inspirerende suksesshistorie fra vårt bootcamp',
    content:
      'Maria Larsen fullførte nylig vårt 12-ukers fullstack bootcamp og har allerede landet sin første utviklerjobb! I dette intervjuet deler hun sine erfaringer, utfordringer og tips for andre som vurderer å bytte karriere til tech. Hun har bygget en imponerende portefølje med React, Node.js og MongoDB prosjekter som virkelig skiller seg ut.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop&crop=center',
    date: '2025-11-07',
    author: 'Anna Nordberg',
    likes: 42,
    comments: 15,
    isLiked: true,
  },
  {
    id: 3,
    title: 'Åpen Kode Workshop',
    subheading: 'Gratis workshop om moderne JavaScript',
    content:
      'Bli med på vår månedlige åpne workshop hvor vi dekker moderne JavaScript-konsepter som ES6+, async/await, og moduler. Workshopen er åpen for alle, uavhengig av ferdighetsnivå.',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop&crop=center',
    date: '2025-11-06',
    author: 'Thomas Viktige',
    likes: 18,
    comments: 5,
    isLiked: false,
  },
  {
    id: 4,
    title: 'AI og Machine Learning kurs lansering',
    subheading: 'Utforsk fremtidens teknologi',
    content:
      'Vi er stolte av å lansere vårt nye AI og Machine Learning kurs! Dette omfattende programmet dekker alt fra grunnleggende konsepter til praktisk implementering med Python, TensorFlow og PyTorch. Kurset er designet for utviklere som ønsker å utvide sine ferdigheter innen kunstig intelligens og maskinlæring.',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop&crop=center',
    date: '2025-11-05',
    author: 'Dr. Lisa Teknologi',
    likes: 67,
    comments: 22,
    isLiked: false,
  },
  {
    id: 5,
    title: 'Hackathon 2025 Resultater',
    subheading: 'Fantastiske prosjekter fra våre studenter',
    content:
      'Vårt årlige hackathon var en enorm suksess med over 100 deltakere som konkurrerte i 48 timer. Vinnerne utviklet innovative løsninger innen bærekraft, helse og utdanning.',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop&crop=center',
    date: '2025-11-04',
    author: 'Hackathon Team',
    likes: 89,
    comments: 31,
    isLiked: true,
  },
]

export default function SkoleforumPage() {
  const [articles, setArticles] = useState<Article[]>(dummyartikkler)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newArticle, setNewArticle] = useState({
    title: '',
    subheading: '',
    content: '',
    image: '',
  })

  const handleLike = (id: number) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? {
              ...article,
              isLiked: !article.isLiked,
              likes: article.isLiked ? article.likes - 1 : article.likes + 1,
            }
          : article,
      ),
    )
  }

  const handleAddArticle = () => {
    if (!newArticle.title || !newArticle.subheading || !newArticle.content) return

    const article: Article = {
      id: articles.length + 1,
      ...newArticle,
      image:
        newArticle.image ||
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=center',
      date: new Date().toISOString().split('T')[0],
      author: 'Du',
      likes: 0,
      comments: 0,
      isLiked: false,
    }

    setArticles((prev) => [article, ...prev])
    setNewArticle({ title: '', subheading: '', content: '', image: '' })
    setShowAddDialog(false)
  }

  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-sm">
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                LearnWebDev - Tavla
              </h1>
              <p className="text-sm md:text-lg text-slate-700 max-w-2xl leading-relaxed">
                Siste nyheter, kursoppdateringer og inspirerende historier fra vårt utviklermiljø
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                    <Plus className="w-5 h-5 mr-2" /> Legg til artikkel
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Legg til ny artikkel</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    <div>
                      <Label htmlFor="image">Bilde URL</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="image"
                          placeholder="https://example.com/bilde.jpg"
                          value={newArticle.image}
                          onChange={(e) =>
                            setNewArticle((prev) => ({ ...prev, image: e.target.value }))
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="title">Overskrift</Label>
                      <Input
                        id="title"
                        placeholder="Skriv en fengende overskrift..."
                        value={newArticle.title}
                        onChange={(e) =>
                          setNewArticle((prev) => ({ ...prev, title: e.target.value }))
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subheading">Underoverskrift</Label>
                      <Input
                        id="subheading"
                        placeholder="En kort beskrivelse eller sammendrag..."
                        value={newArticle.subheading}
                        onChange={(e) =>
                          setNewArticle((prev) => ({ ...prev, subheading: e.target.value }))
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Artikkel innhold</Label>
                      <Textarea
                        id="content"
                        placeholder="Skriv den fulle artikkelen her..."
                        value={newArticle.content}
                        onChange={(e) =>
                          setNewArticle((prev) => ({ ...prev, content: e.target.value }))
                        }
                        className="mt-1 min-h-[150px]"
                      />
                    </div>

                    <Button
                      onClick={handleAddArticle}
                      className="w-full"
                      disabled={!newArticle.title || !newArticle.subheading || !newArticle.content}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Publiser artikkel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="group cursor-pointer overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 w-full"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="relative h-[300px] w-full overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src =
                        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=center'
                    }}
                  />

                  <div className="absolute inset-0 bg-black/30" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="font-bold text-2xl mb-1 line-clamp-1">{article.title}</h3>
                    <p className="text-sm text-gray-100 mb-3 line-clamp-2">{article.subheading}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-gray-100">{article.author}</div>
                        <div className="text-xs text-gray-200">•</div>
                        <div className="text-xs text-gray-200">{article.date}</div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleLike(article.id)
                          }}
                          className="flex items-center gap-2 text-sm text-white/90"
                          aria-label="Like article"
                        >
                          <Heart
                            className={`w-5 h-5 ${article.isLiked ? 'fill-red-500 text-red-500' : ''}`}
                          />
                          <span>{article.likes}</span>
                        </button>

                        <div className="flex items-center gap-2 text-sm text-white/90">
                          <MessageCircle className="w-5 h-5" />
                          <span>{article.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedArticle && (
        <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold mb-2 text-left">
                    {selectedArticle.title}
                  </DialogTitle>
                  <p className="text-lg text-slate-600 mb-4">{selectedArticle.subheading}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{selectedArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedArticle.date).toLocaleDateString('no-NO')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-64 md:h-80 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src =
                      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&crop=center'
                  }}
                />
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-slate-700">{selectedArticle.content}</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(selectedArticle.id)}
                    className={`flex items-center gap-2 ${selectedArticle.isLiked ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`w-5 h-5 ${selectedArticle.isLiked ? 'fill-current' : ''}`} />
                    <span>{selectedArticle.likes}</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>{selectedArticle.comments}</span>
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex gap-2">
                  <Input placeholder="Skriv en kommentar..." className="flex-1" />
                  <Button size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
