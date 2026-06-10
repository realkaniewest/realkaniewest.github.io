import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonials";

const reviews = [
  {
    project: "Внедрение и доработка автоматизированной системы",
    name: "Mikhail Orlov",
    username: "judo-judik",
    time: "5 дней назад",
    body: "Спасибо за отличную работу! Создал удобную систему автоматизации сверки отчетов, оперативно внес необходимые правки по ходу проверки и довел инструмент до финального рабочего состояния. Все работает отлично, рекомендую специалиста!",
  },
  {
    project: "Перенос YaFood UI на основной домен sushiap.ru",
    name: "Daniil Sokolov",
    username: "sushi-dev",
    time: "25 дней назад",
    body: "Всё как всегда отлично, все доработки учтены. Обращаюсь не первый раз, продавец всегда на связи. Благодарю!",
  },
  {
    project: "Доработка OCStore: СКИФ CRM, бонусы, SMS",
    name: "Artem Volkov",
    username: "storefixer",
    time: "1 месяц назад",
    body: "Всё супер, всегда на связи, все предложения быстро обрабатываются.",
  },
  {
    project: "Исправление интеграции Яндекс.Еда со СКИФ CRM",
    name: "Nikita Smirnov",
    username: "crm-pilot",
    time: "1 месяц назад",
    body: "Отличный продавец! Все супер!",
  },
  {
    project: "Настройка парсера Авито для доски объявлений",
    name: "Kirill Morozov",
    username: "avito-parser",
    time: "2 месяца назад",
    body: "Обращаюсь не первый раз, сделано как нужно, всё вовремя и так как нужно. Продавец молодец.",
  },
  {
    project: "Парсинг GFS + Яндекс Еда -> СКИФ + Т-банк",
    name: "Roman Belov",
    username: "foodops",
    time: "2 месяца назад",
    body: "Отличный продавец, всё сделал, постоянно на связи. Всегда готов доработать, приятно работать.",
  },
  {
    project: "Wildberries аналитика в Google Sheets",
    name: "Ivan Karpov",
    username: "sheet-runner",
    time: "3 месяца назад",
    body: "Таблицы обновляются сами, отчеты стали понятнее. Быстро разобрался в задаче и довел до результата.",
  },
  {
    project: "Telegram-бот для заявок и уведомлений",
    name: "Sergey Antonov",
    username: "bot-order",
    time: "3 месяца назад",
    body: "Бот работает стабильно, заявки не теряются, инструкция понятная. По срокам без вопросов.",
  },
  {
    project: "Интеграция маркетплейсов с Битрикс24",
    name: "Pavel Egorov",
    username: "b24-sync",
    time: "4 месяца назад",
    body: "Заказы начали попадать в CRM автоматически. Менеджеры перестали переносить всё руками, спасибо.",
  },
];

function ReviewCard({ project, name, username, time, body }: (typeof reviews)[number]) {
  return (
    <Card className="review-card">
      <CardContent className="review-card__content">
        <p className="review-card__project">{project}</p>
        <div className="review-card__author">
          <Avatar className="review-card__avatar">
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <figcaption className="review-card__name">{username} <span>{name}</span></figcaption>
            <p className="review-card__time">{time}</p>
          </div>
        </div>
        <blockquote className="review-card__body">{body}</blockquote>
      </CardContent>
    </Card>
  );
}

export function ReviewsWall() {
  const first = reviews.slice(0, 5);
  const second = reviews.slice(4);
  const third = [...reviews.slice(2), ...reviews.slice(0, 2)];

  return (
    <div className="reviews-stage" aria-label="Отзывы клиентов">
      <div className="reviews-stage__plane">
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:46s]">
          {first.map((review) => <ReviewCard key={review.username} {...review} />)}
        </Marquee>
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:38s]">
          {second.map((review) => <ReviewCard key={review.username} {...review} />)}
        </Marquee>
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:52s]">
          {third.map((review) => <ReviewCard key={review.username} {...review} />)}
        </Marquee>
      </div>
      <div className="reviews-fade reviews-fade--top" />
      <div className="reviews-fade reviews-fade--bottom" />
      <div className="reviews-fade reviews-fade--left" />
      <div className="reviews-fade reviews-fade--right" />
    </div>
  );
}
