import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const LOGO_URL =
  'https://cdn.poehali.dev/projects/e8158772-df0e-4187-8017-4f46e56468be/files/16277d33-877b-4e8f-9c14-d3866c27c040.jpg';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/e8158772-df0e-4187-8017-4f46e56468be/files/4e6db16f-ecc4-4ea8-9f15-24cb14cab9c5.jpg';

const NAV = [
  { label: 'Главная', href: '#home' },
  { label: 'Услуга', href: '#service' },
  { label: 'О нас', href: '#about' },
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

const SEND_ORDER_URL = 'https://functions.poehali.dev/926f827a-9fff-4d3a-b134-2c10c1d64664';
const TG_TOKEN = '8877746068:AAFTu23QOooU7YGovp1JXmr0AriwsYqQGDk';
const TG_CHAT_ID = '8090597648';

const Index = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', power: '', cadastral: '', rosseti: '', comment: '' });
  const [files, setFiles] = useState<File[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const text = [
        '⚡️ Новая заявка kWt24',
        '',
        `👤 Имя: ${form.name}`,
        `📞 Телефон: ${form.phone}`,
        `🔌 Мощность: ${form.power || '—'}`,
        `🏠 Кадастровый номер: ${form.cadastral || '—'}`,
        `🖥 Портал Россетей / заявка ранее: ${form.rosseti || '—'}`,
        `💬 Комментарий: ${form.comment || '—'}`,
      ].join('\n');

      const textRes = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text }),
      });
      if (!textRes.ok) throw new Error();

      for (const file of files) {
        const isVideo = file.type.startsWith('video/');
        const fd = new FormData();
        fd.append('chat_id', TG_CHAT_ID);
        fd.append(isVideo ? 'video' : 'photo', file);
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/${isVideo ? 'sendVideo' : 'sendPhoto'}`, { method: 'POST', body: fd });
      }

      toast({ title: 'Заявка принята!', description: 'Мы свяжемся с вами в ближайшее время для расчёта.' });
      setForm({ name: '', phone: '', power: '', cadastral: '', rosseti: '', comment: '' });
      setFiles([]);
    } catch {
      toast({ title: 'Ошибка', description: 'Не удалось отправить заявку. Позвоните нам напрямую.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-white/95 backdrop-blur-lg shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 md:px-8">

          {/* Logo */}
          <a href="#home" className="flex-shrink-0 flex items-center gap-2.5">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
              <Icon name="Zap" size={32} className="text-blue-700 absolute" style={{filter: 'drop-shadow(0 0 1px #fff)'}} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-800 text-2xl tracking-tight text-blue-700">kWt24</span>
              <span className="text-[11px] font-medium text-blue-500 tracking-wide">Свет всем</span>
            </span>
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
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText('@KWT24bot')}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-primary transition-colors"
            >
              <Icon name="Send" size={15} />
              @KWT24bot
              <Icon name="Copy" size={13} className="text-muted-foreground" />
            </button>
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
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText('@KWT24bot')}
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium text-blue-700"
              >
                <Icon name="Send" size={16} className="text-primary" />
                @KWT24bot
                <Icon name="Copy" size={13} className="text-muted-foreground ml-auto" />
              </button>
              <Button asChild className="w-full font-medium">
                <a href="#form" onClick={closeMenu}>Оставить заявку</a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section id="home" className="pt-16">
        {/* Hero image — full width */}
        <div className="w-full overflow-hidden" style={{ height: 'clamp(220px, 30vw, 420px)' }}>
          <img
            src="https://cdn.poehali.dev/projects/e8158772-df0e-4187-8017-4f46e56468be/files/8593ab8b-109b-4627-992a-e8547d5baad9.jpg"
            alt="Линии электропередач"
            className="w-full h-full object-cover animate-hero-kenburns"
          />
        </div>

        {/* Content below image */}
        <div className="container px-4 md:px-8 py-12 md:py-20">
          <div className="max-w-3xl animate-fade-up">
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
                { n: '15+', t: 'лет опыта' },
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
              {/* Telegram bot CTA */}
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText('@KWT24bot')}
                className="mt-7 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-5 py-4 text-primary font-medium hover:bg-primary/10 transition-colors w-full"
              >
                <Icon name="Send" size={20} />
                Написать в Telegram: @KWT24bot
                <Icon name="Copy" size={16} className="ml-auto text-muted-foreground" />
              </button>
              {/* Avito CTA */}
              <a
                href="https://www.avito.ru/profile/items/active/all?s=4"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-background px-5 py-4 text-foreground font-medium hover:bg-muted transition-colors w-full"
              >
                <Icon name="ShoppingBag" size={20} className="text-primary shrink-0" />
                Наш профиль на Авито — KWT24
                <Icon name="ExternalLink" size={16} className="ml-auto text-muted-foreground" />
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
                  <label className="text-sm text-muted-foreground mb-1.5 block">Требуемая мощность, кВт / В</label>
                  <Input
                    placeholder="Например, 15 кВт или 380 В"
                    value={form.power}
                    onChange={(e) => setForm({ ...form, power: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Кадастровый номер объекта</label>
                  <Input
                    placeholder="Например, 77:01:0001001:1234"
                    value={form.cadastral}
                    onChange={(e) => setForm({ ...form, cadastral: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Личный кабинет на портале Россетей / подавалась ли ранее заявка</label>
                  <Input
                    placeholder="Например: есть ЛК, заявка не подавалась"
                    value={form.rosseti}
                    onChange={(e) => setForm({ ...form, rosseti: e.target.value })}
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
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Фото / видео объекта</label>
                  <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl p-5 cursor-pointer hover:border-primary transition-colors bg-muted/30">
                    <Icon name="Upload" size={22} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground text-center">
                      {files.length > 0 ? `Выбрано файлов: ${files.length}` : 'Нажмите, чтобы выбрать файлы'}
                    </span>
                    <span className="text-xs text-muted-foreground">Фото и видео, до 50 МБ</span>
                    <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFiles} />
                  </label>
                  {files.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {files.map((f, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-center justify-between gap-1.5 bg-muted/40 rounded-lg px-2 py-1.5">
                          <span className="flex items-center gap-1.5 truncate">
                            <Icon name={f.type.startsWith('video/') ? 'Video' : 'Image'} size={13} />
                            <span className="truncate">{f.name}</span>
                          </span>
                          <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors">
                            <Icon name="X" size={13} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button type="submit" size="lg" className="w-full font-medium text-base h-12" disabled={loading}>
                  <Icon name={loading ? 'Loader' : 'Send'} size={17} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Отправляем...' : 'Отправить заявку'}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────── */}
      <section id="about" className="py-16 md:py-24 border-t border-border">
        <div className="container px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <span className="text-primary font-600 uppercase tracking-widest text-xs md:text-sm">О нас</span>
            <h2 className="font-display text-3xl md:text-4xl font-700 mt-2 leading-tight">
              Киловатт 24 — ваш надёжный партнёр в электроснабжении
            </h2>
            <p className="text-muted-foreground mt-4 text-base md:text-lg leading-relaxed">
              Мы команда профессионалов с опытом в данной сфере более 15 лет. Проинформируем вас по любым вопросам, всегда на связи! Обратившись к нам за помощью, вы получаете уверенность в завтрашнем дне.
            </p>

            <div className="mt-8 rounded-2xl bg-muted/60 border border-border p-6 md:p-8">
              <p className="font-medium text-base md:text-lg mb-5">
                Наша команда специализируется на технологическом присоединении к электрическим сетям. Мы предлагаем комплексные решения для физических и юридических лиц, включая подключение объектов мощностью до 15 кВт и выше.
              </p>
              <h3 className="font-display font-600 text-lg mb-4 text-foreground">Что мы делаем:</h3>
              <ul className="space-y-3">
                {[
                  'Оформляем документы на технологическое присоединение к электрическим сетям',
                  'Разрабатываем и согласовываем технические условия на присоединение к электросетям',
                  'Переоформляем и восстанавливаем документы на технологическое присоединение (например, при увеличении мощности или изменении схемы подключения)',
                  'Заключаем договоры на электроснабжение',
                  'Проектируем и согласовываем проектную и рабочую документацию',
                  'Выполняем электромонтажные работы любой сложности, включая пуско-наладочные работы',
                  'Подключаем частные дома к линии электропередачи, от линии электросети, подключение от столба',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                    <Icon name="CheckCircle2" size={18} className="text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer id="contacts" className="border-t border-border bg-foreground text-background py-12 md:py-16">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            <div className="col-span-2 md:col-span-1">
              <a href="#home" className="flex items-center gap-2.5 mb-4">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400">
                  <Icon name="Zap" size={28} className="text-blue-700 absolute" style={{filter: 'drop-shadow(0 0 1px #fff)'}} />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="font-display font-800 text-xl tracking-tight text-white">kWt24</span>
                  <span className="text-[10px] font-medium text-background/50 tracking-wide">Свет всем</span>
                </span>
              </a>
              <p className="text-background/60 text-sm leading-relaxed">
                Технологическое присоединение к электрическим сетям под ключ в Красноярске.
              </p>
            </div>
            <div>
              <h4 className="font-display font-600 text-base mb-4">Контакты</h4>
              <ul className="space-y-3 text-background/60 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText('@KWT24bot')}
                    className="flex items-center gap-2 hover:text-background transition-colors text-left"
                  >
                    <Icon name="Send" size={14} className="text-primary shrink-0" />
                    @KWT24bot
                  </button>
                </li>
                <li>
                  <a
                    href="https://www.avito.ru/profile/items/active/all?s=4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-background transition-colors"
                  >
                    <Icon name="ShoppingBag" size={14} className="text-primary shrink-0" />
                    Авито — KWT24
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