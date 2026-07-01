import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/e8158772-df0e-4187-8017-4f46e56468be/files/4e6db16f-ecc4-4ea8-9f15-24cb14cab9c5.jpg';

const NAV = [
  { label: 'Главная', href: '#home' },
  { label: 'Услуга', href: '#service' },
  { label: 'Документы', href: '#docs' },
  { label: 'Контакты', href: '#contacts' },
];

const STEPS = [
  { icon: 'FileText', title: 'Подготовка документов', text: 'Готовим полный пакет документов для подачи заявки в сетевую организацию.' },
  { icon: 'Ruler', title: 'Проект электроснабжения', text: 'Разрабатываем проект электроснабжения по техническим условиям объекта.' },
  { icon: 'Handshake', title: 'Сопровождение в сетевой', text: 'Ведём и согласуем все этапы в сетевой компании до получения результата.' },
  { icon: 'PlugZap', title: 'Под ключ до подключения', text: 'От заявки до подачи напряжения — весь процесс присоединения берём на себя.' },
];

const AUDIENCE = [
  { icon: 'House', title: 'Частные дома и дачи', text: 'Подключение жилых домов, дачных и загородных участков к электросетям.' },
  { icon: 'Building2', title: 'Юридические лица и бизнес', text: 'Присоединение коммерческих, офисных и производственных объектов.' },
  { icon: 'Trees', title: 'Садовые товарищества (СНТ)', text: 'Электроснабжение СНТ и коллективных участков любой сложности.' },
];

const DOCS = [
  'Заявка на технологическое присоединение',
  'Договор об осуществлении ТП к электросетям',
  'Технические условия (ТУ)',
  'Проектная документация электроснабжения',
  'Акт о выполнении технических условий',
  'Акт допуска прибора учёта в эксплуатацию',
  'Акт разграничения балансовой принадлежности',
  'Акт об осуществлении технологического присоединения',
];

const Index = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', power: '', comment: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка принята!',
      description: 'Мы свяжемся с вами в ближайшее время для расчёта.',
    });
    setForm({ name: '', phone: '', power: '', comment: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="container flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2 font-display font-700 text-2xl tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Icon name="Zap" size={20} />
            </span>
            kWt<span className="text-primary">24</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <Button asChild className="font-500">
            <a href="#form">Оставить заявку</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative pt-32 pb-24 md:pt-44 md:pb-32">
        <div className="absolute inset-0 -z-10">
          <img src={HERO_IMG} alt="Электросети" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
          <div className="absolute inset-0 grid-texture opacity-30" />
        </div>
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
              <Icon name="MapPin" size={15} />
              Красноярск и Красноярский край
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-700 leading-[0.95] tracking-tight">
              Технологическое присоединение <span className="text-gradient">к электросетям</span> под ключ
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              Собираем полный пакет документов и берём на себя все этапы подключения к электрическим
              сетям — от заявки до подачи напряжения. Быстро, законно, без очередей.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="glow-primary font-500 text-base h-13 px-8">
                <a href="#form">
                  <Icon name="Send" size={18} className="mr-2" />
                  Подать заявку
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-500 text-base h-13 px-8">
                <a href="#service">Как мы работаем</a>
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { n: '10+', t: 'лет опыта' },
                { n: '500+', t: 'объектов' },
                { n: '15 кВт', t: 'от льготной ставки' },
              ].map((s) => (
                <div key={s.t}>
                  <div className="font-display text-3xl md:text-4xl font-700 text-primary">{s.n}</div>
                  <div className="text-sm text-muted-foreground">{s.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service */}
      <section id="service" className="py-24 border-t border-border/60">
        <div className="container">
          <div className="max-w-2xl">
            <span className="text-primary font-500 uppercase tracking-widest text-sm">Услуга</span>
            <h2 className="font-display text-4xl md:text-5xl font-700 mt-3 leading-tight">
              Четыре шага до электроснабжения
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Полный цикл работ по технологическому присоединению для частных домов, участков,
              бизнеса и промышленных объектов.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:-translate-y-1"
              >
                <div className="text-6xl font-display font-700 text-secondary absolute top-4 right-5 select-none">
                  {i + 1}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary mb-5">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="font-display text-xl font-600">{s.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section id="audience" className="py-24 border-t border-border/60 bg-card/40">
        <div className="container">
          <div className="max-w-2xl">
            <span className="text-primary font-500 uppercase tracking-widest text-sm">Для кого</span>
            <h2 className="font-display text-4xl md:text-5xl font-700 mt-3 leading-tight">
              Помогаем всем категориям заявителей
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Подключаем к электросетям объекты любого типа и мощности — от дачного участка до
              производственного комплекса.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mt-14">
            {AUDIENCE.map((a) => (
              <div
                key={a.title}
                className="rounded-xl border border-border bg-background p-7 transition-all hover:border-primary/50 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 text-primary mb-5">
                  <Icon name={a.icon} size={28} />
                </div>
                <h3 className="font-display text-xl font-600">{a.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Docs */}
      <section id="docs" className="py-24 border-t border-border/60">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-500 uppercase tracking-widest text-sm">Документы</span>
            <h2 className="font-display text-4xl md:text-5xl font-700 mt-3 leading-tight">
              Полный пакет документов на присоединение
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Мы готовим, подаём и сопровождаем каждый документ. Вам не нужно разбираться в
              регламентах — всё оформим правильно и вовремя.
            </p>
            <Button asChild size="lg" className="mt-8 font-500">
              <a href="#form">
                Заказать оформление
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </a>
            </Button>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {DOCS.map((d) => (
              <li
                key={d}
                className="flex items-start gap-3 rounded-lg border border-border bg-background p-4 text-sm"
              >
                <Icon name="CircleCheck" size={18} className="text-accent shrink-0 mt-0.5" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="py-24 border-t border-border/60">
        <div className="container grid lg:grid-cols-2 gap-14 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="text-primary font-500 uppercase tracking-widest text-sm">Заявка</span>
            <h2 className="font-display text-4xl md:text-5xl font-700 mt-3 leading-tight">
              Подать заявку на подключение
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Оставьте контакты — специалист kWt24 рассчитает стоимость и сроки присоединения именно
              для вашего объекта.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: 'Clock', t: 'Ответим в течение рабочего дня' },
                { icon: 'ShieldCheck', t: 'Работаем по договору и в рамках закона' },
                { icon: 'Wallet', t: 'Прозрачная стоимость без скрытых платежей' },
              ].map((b) => (
                <div key={b.t} className="flex items-center gap-3 text-muted-foreground">
                  <Icon name={b.icon} size={20} className="text-primary" />
                  {b.t}
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={submit}
            className="rounded-2xl border border-border bg-card p-7 md:p-9 glow-primary"
          >
            <div className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Ваше имя</label>
                <Input
                  required
                  placeholder="Иван Петров"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-12 bg-background"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Телефон</label>
                <Input
                  required
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="h-12 bg-background"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Требуемая мощность, кВт
                </label>
                <Input
                  placeholder="Например, 15"
                  value={form.power}
                  onChange={(e) => setForm({ ...form, power: e.target.value })}
                  className="h-12 bg-background"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Комментарий</label>
                <Textarea
                  placeholder="Тип объекта, адрес, ваши пожелания"
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="bg-background min-h-24"
                />
              </div>
              <Button type="submit" size="lg" className="w-full font-500 text-base h-13">
                <Icon name="Send" size={18} className="mr-2" />
                Отправить заявку
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Contacts / Footer */}
      <footer id="contacts" className="border-t border-border/60 bg-card/40 py-16">
        <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="#home" className="flex items-center gap-2 font-display font-700 text-2xl mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Icon name="Zap" size={20} />
              </span>
              kWt<span className="text-primary">24</span>
            </a>
            <p className="text-muted-foreground text-sm max-w-xs">
              Технологическое присоединение к электрическим сетям под ключ в Красноярске.
            </p>
          </div>
          <div>
            <h4 className="font-display font-600 text-lg mb-4">Контакты</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li>
                <a
                  href="tel:+70000000000"
                  className="flex items-center gap-3 hover:text-foreground transition-colors"
                >
                  <Icon name="Phone" size={16} className="text-primary" />
                  +7 (000) 000-00-00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="MapPin" size={16} className="text-primary" />
                г. Красноярск
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-600 text-lg mb-4">Разделы</h4>
            <ul className="space-y-3 text-muted-foreground text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-foreground transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-600 text-lg mb-4">Режим работы</h4>
            <p className="text-muted-foreground text-sm">Пн–Пт: 9:00 — 18:00</p>
            <Button asChild className="mt-5 font-500">
              <a href="#form">Оставить заявку</a>
            </Button>
          </div>
        </div>
        <div className="container mt-12 pt-6 border-t border-border/60 text-sm text-muted-foreground">
          © {new Date().getFullYear()} kWt24. Все права защищены.
        </div>
      </footer>
    </div>
  );
};

export default Index;