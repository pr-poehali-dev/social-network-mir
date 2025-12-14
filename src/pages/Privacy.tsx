import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
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
            <Icon name="Shield" size={32} className="text-purple-600" />
            <h1 className="text-3xl font-bold">Политика конфиденциальности</h1>
          </div>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
              <p className="text-muted-foreground leading-relaxed">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
                пользователей социальной сети "МИР". Мы уважаем вашу конфиденциальность и обязуемся защищать 
                предоставленную вами информацию.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Сбор информации</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Мы собираем следующую информацию:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Данные учетной записи (имя, адрес электронной почты, username)</li>
                <li>Контент, который вы публикуете (посты, комментарии, фото, видео)</li>
                <li>Информация о взаимодействиях (лайки, подписки, сообщения)</li>
                <li>Технические данные (IP-адрес, тип устройства, браузер)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Использование информации</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Собранная информация используется для:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Предоставления и улучшения наших услуг</li>
                <li>Персонализации вашего опыта использования платформы</li>
                <li>Обеспечения безопасности и предотвращения мошенничества</li>
                <li>Связи с вами по вопросам сервиса</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Защита данных</h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы применяем современные технические и организационные меры для защиты ваших персональных данных 
                от несанкционированного доступа, изменения, раскрытия или уничтожения. Все данные передаются 
                по защищенным каналам связи.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Передача данных третьим лицам</h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев, 
                предусмотренных законодательством или с вашего согласия. Мы можем привлекать сторонних 
                поставщиков услуг для обработки данных, которые обязаны соблюдать конфиденциальность.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Ваши права</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Вы имеете право:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Получать доступ к своим персональным данным</li>
                <li>Требовать исправления неточных данных</li>
                <li>Удалить свою учетную запись и данные</li>
                <li>Ограничить или возразить против обработки данных</li>
                <li>Экспортировать свои данные</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Cookies и технологии отслеживания</h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы используем cookies и аналогичные технологии для улучшения работы сервиса, анализа 
                использования и персонализации контента. Вы можете управлять настройками cookies в своем браузере.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Изменения в политике</h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы можем периодически обновлять настоящую Политику конфиденциальности. О существенных 
                изменениях мы будем уведомлять пользователей через платформу или по электронной почте.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Контакты</h2>
              <p className="text-muted-foreground leading-relaxed">
                Если у вас есть вопросы о настоящей Политике конфиденциальности или обработке ваших данных, 
                пожалуйста, свяжитесь с нами через форму обратной связи на платформе.
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
