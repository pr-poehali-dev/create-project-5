import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const LOGO_URL =
  'https://cdn.poehali.dev/projects/e8158772-df0e-4187-8017-4f46e56468be/bucket/0ff39b33-5241-47c3-bf8c-a3e5f987b1e3.png';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/e8158772-df0e-4187-8017-4f46e56468be/files/4e6db16f-ecc4-4ea8-9f15-24cb14cab9c5.jpg';

const NAV = [
  { label: 'Главная', href: '#home' },
  { label: 'Услуга', href: '#service' },
  { label: 'Для кого', href: '#audience' },
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
  const [menuOpen, setMenuOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка принята!',
      description: 'Мы свяжемся с вами в ближайшее время для расчёта.',
    });
    setForm({ name: '', phone: '', power: '', comment: '' });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-white/95 backdrop-blur-lg shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 md:px-8">

          {/* Logo */}
          <a href="#home" className="flex-shrink-0">
            <img src={LOGO_URL} alt="KWt24 — Свет всем" className="h-20 w-auto object-contain rounded-md bg-black px-2" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-primary transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+70000000000" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              +7 (000) 000-00-00
            </a>
            <Button asChild size="sm" className="font-medium">
              <a href="#form">Оставить заявку</a>
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-border text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 pb-5 pt-3 space-y-1 shadow-lg">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={closeMenu}
                className="block py-2.5 px-3 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
              >
                {n.label}
              </a>
            ))}
            <div className="pt-3 space-y-2">
              <a
                href="tel:+70000000000"
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium text-muted-foreground"
              >
                <Icon name="Phone" size={16} className="text-primary" />
                +7 (000) 000-00-00
              </a>
              <Button asChild className="w-full font-medium">
                <a href="#form" onClick={closeMenu}>Оставить заявку</a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section id="home" className="relative pt-24 pb-16 md:pt-40 md:pb-28">
        <div className="absolute inset-0 -z-10">
          <img src={HERO_IMG} alt="Электросети" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/70" />
          <div className="absolute inset-0 grid-texture opacity-40" />
        </div>
        <div className="container px-4 md:px-8">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-sm text-primary mb-5 font-medium">
              <Icon name="MapPin" size={14} />
              Красноярск и Красноярский край
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-700 leading-[1.0] tracking-tight text-foreground">
              Технологическое<br />
              присоединение{' '}
              <span className="text-gradient">к электросетям</span>{' '}
              под ключ
            </h1>
            <p className="mt-5 text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Собираем полный пакет документов и берём на себя все этапы подключения к электрическим
              сетям — от заявки до подачи напряжения. Быстро, законно, без очередей.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="font-medium text-base w-full sm:w-auto">
                <a href="#form">
                  <Icon name="Send" size={17} className="mr-2" />
                  Подать заявку
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-medium text-base w-full sm:w-auto">
                <a href="#service">Как мы работаем</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-sm md:max-w-md">
              {[
                { n: '10+', t: 'лет опыта' },
                { n: '500+', t: 'объектов' },
                { n: '15 кВт', t: 'льготная ставка' },
              ].map((s) => (
                <div key={s.t} className="text-center sm:text-left">
                  <div className="font-display text-2xl md:text-3xl font-700 text-primary">{s.n}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-0.5">{s.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE ────────────────────────────────────────── */}
      <section id="service" className="py-16 md:py-24 border-t border-border">
        <div className="container px-4 md:px-8">
          <div className="max-w-2xl">
            <span className="text-primary font-600 uppercase tracking-widest text-xs md:text-sm">Услуга</span>
            <h2 className="font-display text-3xl md:text-5xl font-700 mt-2 leading-tight">
              Четыре шага до электроснабжения
            </h2>
            <p className="text-muted-foreground mt-3 text-base md:text-lg">
              Полный цикл работ по технологическому присоединению для любых объектов.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 md:mt-14">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="relative rounded-xl border border-border bg-card p-5 md:p-6 transition-all hover:border-primary/60 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="font-display text-5xl font-700 text-primary/10 absolute top-3 right-4 select-none leading-none">
                  {i + 1}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <Icon name={s.icon} size={22} />
                </div>
                <h3 className="font-display text-lg font-600 leading-tight">{s.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIENCE ───────────────────────────────────────── */}
      <section id="audience" className="py-16 md:py-24 border-t border-border bg-muted/40">
        <div className="container px-4 md:px-8">
          <div className="max-w-2xl">
            <span className="text-primary font-600 uppercase tracking-widest text-xs md:text-sm">Для кого</span>
            <h2 className="font-display text-3xl md:text-5xl font-700 mt-2 leading-tight">
              Помогаем всем категориям заявителей
            </h2>
            <p className="text-muted-foreground mt-3 text-base md:text-lg">
              Подключаем объекты любого типа — от дачного участка до производственного комплекса.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 md:mt-14">
            {AUDIENCE.map((a) => (
              <div
                key={a.title}
                className="rounded-xl border border-border bg-white p-6 md:p-7 transition-all hover:border-primary/60 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon name={a.icon} size={26} />
                </div>
                <h3 className="font-display text-xl font-600">{a.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCS ───────────────────────────────────────────── */}
      <section id="docs" className="py-16 md:py-24 border-t border-border">
        <div className="container px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="text-primary font-600 uppercase tracking-widest text-xs md:text-sm">Документы</span>
              <h2 className="font-display text-3xl md:text-5xl font-700 mt-2 leading-tight">
                Полный пакет документов на присоединение
              </h2>
              <p className="text-muted-foreground mt-3 text-base md:text-lg">
                Мы готовим, подаём и сопровождаем каждый документ. Вам не нужно разбираться в
                регламентах — всё оформим правильно и вовремя.
              </p>
              <Button asChild size="lg" className="mt-7 font-medium w-full sm:w-auto">
                <a href="#form">
                  Заказать оформление
                  <Icon name="ArrowRight" size={17} className="ml-2" />
                </a>
              </Button>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DOCS.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm"
                >
                  <Icon name="CircleCheck" size={17} className="text-primary shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FORM ───────────────────────────────────────────── */}
      <section id="form" className="py-16 md:py-24 border-t border-border bg-muted/40">
        <div className="container px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="text-primary font-600 uppercase tracking-widest text-xs md:text-sm">Заявка</span>
              <h2 className="font-display text-3xl md:text-5xl font-700 mt-2 leading-tight">
                Подать заявку на подключение
              </h2>
              <p className="text-muted-foreground mt-3 text-base md:text-lg">
                Оставьте контакты — специалист KWt24 рассчитает стоимость и сроки присоединения
                именно для вашего объекта.
              </p>
              <div className="mt-7 space-y-3.5">
                {[
                  { icon: 'Clock', t: 'Ответим в течение рабочего дня' },
                  { icon: 'ShieldCheck', t: 'Работаем по договору и в рамках закона' },
                  { icon: 'Wallet', t: 'Прозрачная стоимость без скрытых платежей' },
                ].map((b) => (
                  <div key={b.t} className="flex items-center gap-3 text-muted-foreground text-sm md:text-base">
                    <Icon name={b.icon} size={19} className="text-primary shrink-0" />
                    {b.t}
                  </div>
                ))}
              </div>
              {/* Mobile phone CTA */}
              <a
                href="tel:+70000000000"
                className="mt-7 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-5 py-4 text-primary font-medium hover:bg-primary/10 transition-colors md:hidden"
              >
                <Icon name="Phone" size={20} />
                Позвонить: +7 (000) 000-00-00
              </a>
            </div>

            <form
              onSubmit={submit}
              className="rounded-2xl border border-border bg-white p-6 md:p-9 shadow-sm"
            >
              <h3 className="font-display text-2xl font-600 mb-6">Оставьте заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Ваше имя *</label>
                  <Input
                    required
                    placeholder="Иван Петров"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Телефон *</label>
                  <Input
                    required
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Требуемая мощность, кВт</label>
                  <Input
                    placeholder="Например, 15"
                    value={form.power}
                    onChange={(e) => setForm({ ...form, power: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Комментарий</label>
                  <Textarea
                    placeholder="Тип объекта, адрес, ваши пожелания"
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    className="min-h-24"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full font-medium text-base h-12">
                  <Icon name="Send" size={17} className="mr-2" />
                  Отправить заявку
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer id="contacts" className="border-t border-border bg-foreground text-background py-12 md:py-16">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            <div className="col-span-2 md:col-span-1">
              <img src={LOGO_URL} alt="KWt24" className="h-12 w-auto object-contain brightness-0 invert mb-4" />
              <p className="text-background/60 text-sm leading-relaxed">
                Технологическое присоединение к электрическим сетям под ключ в Красноярске.
              </p>
            </div>
            <div>
              <h4 className="font-display font-600 text-base mb-4">Контакты</h4>
              <ul className="space-y-3 text-background/60 text-sm">
                <li>
                  <a href="tel:+70000000000" className="flex items-center gap-2 hover:text-background transition-colors">
                    <Icon name="Phone" size={14} className="text-primary shrink-0" />
                    +7 (000) 000-00-00
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={14} className="text-primary shrink-0" />
                  г. Красноярск
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Clock" size={14} className="text-primary shrink-0" />
                  Пн–Пт: 9:00 — 18:00
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-600 text-base mb-4">Разделы</h4>
              <ul className="space-y-2.5 text-background/60 text-sm">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="hover:text-background transition-colors">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-600 text-base mb-4">Оставить заявку</h4>
              <p className="text-background/60 text-sm mb-4">Рассчитаем стоимость бесплатно</p>
              <Button asChild variant="secondary" className="w-full font-medium">
                <a href="#form">Подать заявку</a>
              </Button>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-background/10 text-sm text-background/40">
            © {new Date().getFullYear()} KWt24. Все права защищены. Свет всем.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;