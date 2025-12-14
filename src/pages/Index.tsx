import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const MOCK_POSTS: Post[] = [];

const MOCK_TRENDS = [
  { tag: '#космос', posts: '12.3к постов' },
  { tag: '#путешествия', posts: '8.7к постов' },
  { tag: '#технологии', posts: '6.5к постов' },
  { tag: '#искусство', posts: '5.2к постов' },
  { tag: '#наука', posts: '4.8к постов' }
];

const MOCK_USERS: { name: string; username: string; avatar: string; followers: string }[] = [];

const MOCK_MESSAGES = [
  { id: 1, name: 'Анна Космос', avatar: '👩‍🚀', lastMessage: 'Привет! Как дела?', time: '10 мин', unread: 2 },
  { id: 2, name: 'Дмитрий Звезда', avatar: '👨‍🚀', lastMessage: 'Смотрел твой пост, круто!', time: '1 час', unread: 0 },
  { id: 3, name: 'Елена Луна', avatar: '👩‍💼', lastMessage: 'Давай созвонимся завтра', time: '2 часа', unread: 1 }
];

type Post = {
  id: number;
  author: { name: string; avatar: string; username: string };
  content: string;
  image?: string;
  video?: boolean;
  likes: number;
  comments: number;
  time: string;
  type: string;
  commentsList?: { author: string; avatar: string; text: string; time: string }[];
};

export default function Index() {
  const [activeTab, setActiveTab] = useState('feed');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [expandedComments, setExpandedComments] = useState<number | null>(null);
  const [commentTexts, setCommentTexts] = useState<Record<number, string>>({});

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const toggleFollow = (username: string) => {
    setFollowedUsers(prev => 
      prev.includes(username) ? prev.filter(u => u !== username) : [...prev, username]
    );
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: posts.length + 1,
        author: { name: 'Вы', avatar: '🚀', username: '@your_username' },
        content: newPost,
        likes: 0,
        comments: 0,
        time: 'только что',
        type: 'text',
        commentsList: []
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowNewPostDialog(false);
      toast({ title: 'Пост опубликован!', description: 'Ваш пост появился в ленте' });
    }
  };

  const handleAddComment = (postId: number) => {
    const commentText = commentTexts[postId]?.trim();
    if (commentText) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newComment = {
            author: 'Вы',
            avatar: '🚀',
            text: commentText,
            time: 'только что'
          };
          return {
            ...post,
            comments: post.comments + 1,
            commentsList: [...(post.commentsList || []), newComment]
          };
        }
        return post;
      }));
      setCommentTexts({ ...commentTexts, [postId]: '' });
      toast({ title: 'Комментарий добавлен!' });
    }
  };

  const toggleComments = (postId: number) => {
    setExpandedComments(expandedComments === postId ? null : postId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-purple-100">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                МИР
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0">
                Beta
              </Badge>
            </div>
            
            <nav className="hidden md:flex items-center gap-2">
              {[
                { id: 'feed', icon: 'Home', label: 'Лента' },
                { id: 'search', icon: 'Search', label: 'Поиск' },
                { id: 'trends', icon: 'TrendingUp', label: 'Тренды' },
                { id: 'messages', icon: 'MessageCircle', label: 'Сообщения' },
                { id: 'profile', icon: 'User', label: 'Профиль' }
              ].map(item => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  className={activeTab === item.id ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="ml-2 hidden lg:inline">{item.label}</span>
                </Button>
              ))}
            </nav>

            <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Icon name="Plus" size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Создать пост</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Что нового?"
                    className="min-h-[150px] resize-none"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-purple-600">
                        <Icon name="Image" size={18} />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-pink-600">
                        <Icon name="Video" size={18} />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-orange-600">
                        <Icon name="Smile" size={18} />
                      </Button>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                    >
                      Опубликовать
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4">
          {activeTab === 'feed' && (
            <>
              <div className="lg:col-span-3 space-y-4">
                <Card className="p-6 border-0 shadow-lg bg-white/90 backdrop-blur">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Avatar className="w-20 h-20 border-4 border-purple-200">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl">
                        🚀
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">Вы</h3>
                      <p className="text-sm text-muted-foreground">@your_username</p>
                    </div>
                    <div className="flex gap-6 text-center">
                      <div>
                        <div className="font-bold text-lg">{posts.filter(p => p.author.username === '@your_username').length}</div>
                        <div className="text-xs text-muted-foreground">Постов</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">0</div>
                        <div className="text-xs text-muted-foreground">Подписчиков</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{followedUsers.length}</div>
                        <div className="text-xs text-muted-foreground">Подписок</div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-0 shadow-lg bg-white/90 backdrop-blur">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Icon name="TrendingUp" size={18} className="text-purple-600" />
                    Популярное
                  </h3>
                  <div className="space-y-2">
                    {MOCK_TRENDS.slice(0, 3).map((trend, i) => (
                      <div key={i} className="p-2 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                        <div className="font-semibold text-sm text-purple-600">{trend.tag}</div>
                        <div className="text-xs text-muted-foreground">{trend.posts}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <Card className="p-4 border-0 shadow-lg bg-white/90 backdrop-blur">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        🚀
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Что нового?"
                        className="min-h-[80px] border-0 focus-visible:ring-0 resize-none"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-purple-600">
                            <Icon name="Image" size={18} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-pink-600">
                            <Icon name="Video" size={18} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-orange-600">
                            <Icon name="Smile" size={18} />
                          </Button>
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          onClick={handleCreatePost}
                          disabled={!newPost.trim()}
                        >
                          Опубликовать
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {posts.map(post => (
                  <Card key={post.id} className="border-0 shadow-lg overflow-hidden bg-white/90 backdrop-blur hover:shadow-xl transition-shadow">
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-lg">
                            {post.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{post.author.name}</span>
                            <span className="text-sm text-muted-foreground">{post.author.username}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{post.time}</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Icon name="MoreHorizontal" size={18} />
                        </Button>
                      </div>

                      <p className="mb-3 text-foreground">{post.content}</p>

                      {post.type === 'image' && post.image && (
                        <div className="rounded-xl overflow-hidden mb-3">
                          <img src={post.image} alt="Post" className="w-full h-auto" />
                        </div>
                      )}

                      {post.type === 'video' && (
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-12 mb-3 flex items-center justify-center">
                          <div className="text-center">
                            <Icon name="Play" size={48} className="text-purple-600 mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Видео контент</p>
                          </div>
                        </div>
                      )}

                      <Separator className="my-3" />

                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={likedPosts.includes(post.id) ? 'text-pink-600' : ''}
                          onClick={() => toggleLike(post.id)}
                        >
                          <Icon name={likedPosts.includes(post.id) ? 'Heart' : 'Heart'} size={18} />
                          <span className="ml-2">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleComments(post.id)}
                        >
                          <Icon name="MessageCircle" size={18} />
                          <span className="ml-2">{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Repeat2" size={18} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Share2" size={18} />
                        </Button>
                      </div>

                      {expandedComments === post.id && (
                        <div className="mt-4 space-y-3">
                          <Separator />
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {post.commentsList && post.commentsList.length > 0 ? (
                              post.commentsList.map((comment, idx) => (
                                <div key={idx} className="flex gap-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarFallback className="bg-gradient-to-br from-purple-300 to-pink-300 text-white text-sm">
                                      {comment.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="bg-purple-50 rounded-lg px-3 py-2">
                                      <div className="font-semibold text-sm">{comment.author}</div>
                                      <p className="text-sm">{comment.text}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground ml-2">{comment.time}</span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground text-center py-2">Пока нет комментариев</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Написать комментарий..."
                              value={commentTexts[post.id] || ''}
                              onChange={(e) => setCommentTexts({ ...commentTexts, [post.id]: e.target.value })}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleAddComment(post.id);
                                }
                              }}
                            />
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                              onClick={() => handleAddComment(post.id)}
                              disabled={!commentTexts[post.id]?.trim()}
                            >
                              <Icon name="Send" size={16} />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-3 space-y-4">
                <Card className="p-4 border-0 shadow-lg bg-white/90 backdrop-blur">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Icon name="Users" size={18} className="text-purple-600" />
                    Рекомендации
                  </h3>
                  <div className="space-y-3">
                    {MOCK_USERS.length > 0 ? (
                      MOCK_USERS.map(user => (
                        <div key={user.username} className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.followers}</div>
                          </div>
                          <Button
                            size="sm"
                            variant={followedUsers.includes(user.username) ? 'outline' : 'default'}
                            className={!followedUsers.includes(user.username) ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
                            onClick={() => toggleFollow(user.username)}
                          >
                            {followedUsers.includes(user.username) ? 'Подписан' : 'Подписаться'}
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Рекомендации появятся позже
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            </>
          )}

          {activeTab === 'search' && (
            <div className="lg:col-span-12">
              <Card className="p-6 border-0 shadow-lg bg-white/90 backdrop-blur">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="relative">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск людей, постов, тегов..."
                      className="pl-10 h-12 text-lg border-2 border-purple-100 focus-visible:border-purple-300"
                    />
                  </div>

                  <Tabs defaultValue="users" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="users">Пользователи</TabsTrigger>
                      <TabsTrigger value="posts">Посты</TabsTrigger>
                      <TabsTrigger value="tags">Теги</TabsTrigger>
                    </TabsList>
                    <TabsContent value="users" className="space-y-3 mt-6">
                      {MOCK_USERS.length > 0 ? (
                        MOCK_USERS.map(user => (
                          <div key={user.username} className="flex items-center gap-4 p-4 rounded-lg hover:bg-purple-50 transition-colors">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-lg">
                                {user.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-semibold">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.username}</div>
                            </div>
                            <Button
                              variant={followedUsers.includes(user.username) ? 'outline' : 'default'}
                              className={!followedUsers.includes(user.username) ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
                              onClick={() => toggleFollow(user.username)}
                            >
                              {followedUsers.includes(user.username) ? 'Подписан' : 'Подписаться'}
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground py-8">Введите запрос для поиска пользователей</p>
                      )}
                    </TabsContent>
                    <TabsContent value="posts">
                      <p className="text-center text-muted-foreground py-8">Введите запрос для поиска постов</p>
                    </TabsContent>
                    <TabsContent value="tags" className="space-y-2 mt-6">
                      {MOCK_TRENDS.map((trend, i) => (
                        <div key={i} className="p-4 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                          <div className="font-semibold text-purple-600">{trend.tag}</div>
                          <div className="text-sm text-muted-foreground">{trend.posts}</div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="lg:col-span-12">
              <Card className="p-6 border-0 shadow-lg bg-white/90 backdrop-blur">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Icon name="TrendingUp" size={28} className="text-purple-600" />
                    Актуальные тренды
                  </h2>
                  <div className="space-y-3">
                    {MOCK_TRENDS.map((trend, i) => (
                      <div key={i} className="p-5 rounded-xl hover:bg-purple-50 cursor-pointer transition-all hover:shadow-md border border-purple-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-lg text-purple-600 mb-1">{trend.tag}</div>
                            <div className="text-sm text-muted-foreground">{trend.posts}</div>
                          </div>
                          <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0">
                            #{i + 1}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="lg:col-span-12">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
                  <div className="border-r border-purple-100">
                    <div className="p-4 border-b border-purple-100">
                      <h3 className="font-bold text-lg">Сообщения</h3>
                    </div>
                    <ScrollArea className="h-[540px]">
                      {MOCK_MESSAGES.map(msg => (
                        <div
                          key={msg.id}
                          className={`p-4 border-b border-purple-50 cursor-pointer hover:bg-purple-50 transition-colors ${
                            selectedChat === msg.id ? 'bg-purple-50' : ''
                          }`}
                          onClick={() => setSelectedChat(msg.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-lg">
                                {msg.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-sm truncate">{msg.name}</span>
                                <span className="text-xs text-muted-foreground">{msg.time}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground truncate">{msg.lastMessage}</p>
                                {msg.unread > 0 && (
                                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-xs">
                                    {msg.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>

                  <div className="md:col-span-2 flex flex-col">
                    {selectedChat ? (
                      <>
                        <div className="p-4 border-b border-purple-100 flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                              {MOCK_MESSAGES.find(m => m.id === selectedChat)?.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{MOCK_MESSAGES.find(m => m.id === selectedChat)?.name}</div>
                            <div className="text-xs text-muted-foreground">В сети</div>
                          </div>
                        </div>

                        <ScrollArea className="flex-1 p-4">
                          <div className="space-y-4">
                            <div className="flex gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-sm">
                                  {MOCK_MESSAGES.find(m => m.id === selectedChat)?.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="bg-purple-50 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[70%]">
                                <p className="text-sm">{MOCK_MESSAGES.find(m => m.id === selectedChat)?.lastMessage}</p>
                              </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[70%]">
                                <p className="text-sm">Привет! Спасибо, рад что понравилось! 😊</p>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>

                        <div className="p-4 border-t border-purple-100">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Написать сообщение..."
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              className="flex-1"
                            />
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                              <Icon name="Send" size={18} />
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <Icon name="MessageCircle" size={48} className="mx-auto mb-3 text-purple-300" />
                          <p>Выберите чат для начала общения</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="lg:col-span-12">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"></div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 mb-6">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-5xl">
                        🚀
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-1">Ваше Имя</h2>
                      <p className="text-muted-foreground mb-3">@your_username</p>
                      <p className="text-sm mb-4">Исследователь космоса и энтузиаст технологий 🌌✨</p>
                      <div className="flex gap-6">
                        <div>
                          <span className="font-bold text-lg">{posts.filter(p => p.author.username === '@your_username').length}</span>
                          <span className="text-muted-foreground text-sm ml-1">Постов</span>
                        </div>
                        <div>
                          <span className="font-bold text-lg">0</span>
                          <span className="text-muted-foreground text-sm ml-1">Подписчиков</span>
                        </div>
                        <div>
                          <span className="font-bold text-lg">{followedUsers.length}</span>
                          <span className="text-muted-foreground text-sm ml-1">Подписок</span>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Редактировать профиль
                    </Button>
                  </div>

                  <Tabs defaultValue="posts" className="w-full">
                    <TabsList>
                      <TabsTrigger value="posts">Посты</TabsTrigger>
                      <TabsTrigger value="media">Медиа</TabsTrigger>
                      <TabsTrigger value="likes">Понравилось</TabsTrigger>
                    </TabsList>
                    <TabsContent value="posts" className="mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {posts.filter(p => p.author.username === '@your_username').length > 0 ? (
                          posts.filter(p => p.author.username === '@your_username').slice(0, 6).map(post => (
                            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                              {post.image && (
                                <img src={post.image} alt="Post" className="w-full h-48 object-cover" />
                              )}
                              {!post.image && (
                                <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-48 flex items-center justify-center">
                                  <Icon name={post.type === 'video' ? 'Video' : 'FileText'} size={48} className="text-purple-400" />
                                </div>
                              )}
                              <div className="p-3">
                                <p className="text-sm line-clamp-2">{post.content}</p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Icon name="Heart" size={14} />
                                    {post.likes}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Icon name="MessageCircle" size={14} />
                                    {post.comments}
                                  </span>
                                </div>
                              </div>
                            </Card>
                          ))
                        ) : (
                          <div className="col-span-full text-center py-8 text-muted-foreground">
                            Вы еще не создали ни одного поста
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="media">
                      <p className="text-center text-muted-foreground py-8">Медиафайлы появятся здесь</p>
                    </TabsContent>
                    <TabsContent value="likes">
                      <p className="text-center text-muted-foreground py-8">Понравившиеся посты появятся здесь</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </div>
          )}
        </div>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-purple-100 px-4 py-3">
          <div className="flex items-center justify-around">
            {[
              { id: 'feed', icon: 'Home' },
              { id: 'search', icon: 'Search' },
              { id: 'trends', icon: 'TrendingUp' },
              { id: 'messages', icon: 'MessageCircle' },
              { id: 'profile', icon: 'User' }
            ].map(item => (
              <Button
                key={item.id}
                variant="ghost"
                size="icon"
                className={activeTab === item.id ? 'text-purple-600' : 'text-gray-500'}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon name={item.icon} size={24} />
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}