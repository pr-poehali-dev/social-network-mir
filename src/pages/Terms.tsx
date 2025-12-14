import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <Icon name="ArrowLeft" size={20} />
            <span className="ml-2">Назад</span>
          </Button>
        </div>

        <Card className="p-8 border-0 shadow-lg bg-white/90 backdrop-blur">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="FileText" size={32} className="text-purple-600" />
            <h1 className="text-3xl font-bold">Правила пользования</h1>
          </div>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Принятие условий</h2>
              <p className="text-muted-foreground leading-relaxed">
                Используя социальную сеть "МИР", вы соглашаетесь с настоящими Правилами пользования. 
                Если вы не согласны с какими-либо положениями, пожалуйста, не используйте наш сервис.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Регистрация и учетная запись</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Вы должны предоставить достоверную информацию при регистрации</li>
                <li>Запрещено создавать более одной учетной записи на человека</li>
                <li>Вы несете ответственность за безопасность своего пароля</li>
                <li>Минимальный возраст для регистрации — 13 лет</li>
                <li>Запрещено выдавать себя за других людей или организации</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Правила публикации контента</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Запрещается публиковать контент, который:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Нарушает законодательство РФ или международное право</li>
                <li>Содержит угрозы, насилие, дискриминацию или разжигание вражды</li>
                <li>Является спамом, мошенничеством или введением в заблуждение</li>
                <li>Нарушает авторские права или другую интеллектуальную собственность</li>
                <li>Содержит личную информацию других людей без их согласия</li>
                <li>Пропагандирует незаконную деятельность</li>
                <li>Содержит порнографию или контент сексуального характера с участием несовершеннолетних</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Поведение пользователей</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                При взаимодействии с другими пользователями вы обязуетесь:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Относиться с уважением к другим участникам сообщества</li>
                <li>Не преследовать, не запугивать и не оскорблять других пользователей</li>
                <li>Не рассылать спам и нежелательные сообщения</li>
                <li>Не использовать автоматизированные средства для накрутки активности</li>
                <li>Не пытаться получить несанкционированный доступ к чужим аккаунтам</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Права на контент</h2>
              <p className="text-muted-foreground leading-relaxed">
                Публикуя контент на платформе, вы сохраняете все права на него, но предоставляете нам 
                неисключительную лицензию на его использование, воспроизведение и распространение в рамках 
                функционирования сервиса. Мы не претендуем на авторство вашего контента.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Модерация и санкции</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                В случае нарушения правил мы имеем право:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Удалить нарушающий контент без предварительного уведомления</li>
                <li>Временно ограничить доступ к функциям платформы</li>
                <li>Заблокировать учетную запись пользователя</li>
                <li>Передать информацию правоохранительным органам при необходимости</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Ограничение ответственности</h2>
              <p className="text-muted-foreground leading-relaxed">
                Сервис предоставляется "как есть". Мы не несем ответственности за действия пользователей, 
                содержание публикуемого контента, перебои в работе сервиса или потерю данных. Мы прилагаем 
                все усилия для обеспечения стабильной работы платформы, но не гарантируем бесперебойную работу.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Жалобы и обращения</h2>
              <p className="text-muted-foreground leading-relaxed">
                Если вы обнаружили контент, нарушающий правила, или столкнулись с недопустимым поведением, 
                пожалуйста, сообщите нам через функцию "Пожаловаться" или форму обратной связи. Мы 
                рассматриваем все обращения в кратчайшие сроки.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Изменение условий</h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы оставляем за собой право изменять настоящие Правила в любое время. О существенных 
                изменениях мы будем уведомлять пользователей заранее. Продолжая использовать сервис после 
                вступления изменений в силу, вы соглашаетесь с обновленными условиями.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Прекращение использования</h2>
              <p className="text-muted-foreground leading-relaxed">
                Вы можете в любой момент удалить свою учетную запись через настройки профиля. После удаления 
                ваши данные будут удалены в соответствии с нашей Политикой конфиденциальности. Некоторые 
                данные могут быть сохранены для соблюдения законодательных требований.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Контактная информация</h2>
              <p className="text-muted-foreground leading-relaxed">
                По всем вопросам, связанным с настоящими Правилами, вы можете связаться с нами через 
                форму обратной связи на платформе или раздел поддержки.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-purple-100">
              <p className="text-sm text-muted-foreground">
                Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
