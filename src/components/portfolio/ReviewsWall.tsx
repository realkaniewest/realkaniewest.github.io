import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonials";
import type { Lang } from "@/i18n";

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

const enReviews = [
  {
    project: "Automated reporting system implementation",
    name: "Mikhail Orlov",
    username: "judo-judik",
    time: "5 days ago",
    body: "Thanks for the excellent work. The reporting automation is convenient, all required changes were added during review, and the tool was brought to a final working state.",
  },
  {
    project: "YaFood UI migration to sushiap.ru",
    name: "Daniil Sokolov",
    username: "sushi-dev",
    time: "25 days ago",
    body: "Everything is great as usual, all edits were included. Not my first order here, always in touch. Thank you.",
  },
  {
    project: "OCStore fixes: SKIF CRM, bonuses, SMS",
    name: "Artem Volkov",
    username: "storefixer",
    time: "1 month ago",
    body: "All good, always available, all suggestions are processed quickly.",
  },
  {
    project: "Yandex Food and SKIF CRM integration fix",
    name: "Nikita Smirnov",
    username: "crm-pilot",
    time: "1 month ago",
    body: "Excellent seller. Everything is super.",
  },
  {
    project: "Avito parser setup for a listings board",
    name: "Kirill Morozov",
    username: "avito-parser",
    time: "2 months ago",
    body: "Not the first order. Done exactly as needed, on time and in the right way. Great work.",
  },
  {
    project: "GFS + Yandex Food -> SKIF + T-Bank parsing",
    name: "Roman Belov",
    username: "foodops",
    time: "2 months ago",
    body: "Everything was done, always in touch, ready to adjust details. Nice to work together.",
  },
  {
    project: "Wildberries analytics in Google Sheets",
    name: "Ivan Karpov",
    username: "sheet-runner",
    time: "3 months ago",
    body: "Sheets update by themselves now, reports are easier to read. The task was understood quickly and shipped properly.",
  },
  {
    project: "Telegram bot for requests and alerts",
    name: "Sergey Antonov",
    username: "bot-order",
    time: "3 months ago",
    body: "The bot runs steadily, requests are not lost, and the instructions are clear. No issues with timing.",
  },
  {
    project: "Marketplace integration with Bitrix24",
    name: "Pavel Egorov",
    username: "b24-sync",
    time: "4 months ago",
    body: "Orders started going into CRM automatically. Managers stopped moving everything by hand. Thanks.",
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

export function ReviewsWall({ lang = "ru" }: { lang?: Lang }) {
  const activeReviews = lang === "en" ? enReviews : reviews;
  const first = activeReviews.slice(0, 5);
  const second = activeReviews.slice(4);
  const third = [...activeReviews.slice(2), ...activeReviews.slice(0, 2)];

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
