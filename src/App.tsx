import { useState, useRef } from "react";

/* ─────────────────────────────── DATA ─────────────────────────────── */

const categories = [
  { id: "all", label: "همه سوالات", icon: "🔍" },
  { id: "order", label: "ثبت سفارش", icon: "🛒" },
  { id: "payment", label: "پرداخت", icon: "💳" },
  { id: "shipping", label: "ارسال و تحویل", icon: "🚚" },
  { id: "return", label: "مرجوعی", icon: "🔄" },
  { id: "account", label: "حساب کاربری", icon: "👤" },
  { id: "product", label: "محصولات", icon: "📦" },
  { id: "discount", label: "تخفیف و کد", icon: "🎁" },
];

const faqs = [
  /* ─── ثبت سفارش ─── */
  {
    id: 1,
    category: "order",
    question: "چطور می‌توانم سفارش ثبت کنم؟",
    answer:
      "ثبت سفارش در مارلو شاپ بسیار ساده است. کافیست محصول مورد نظر را انتخاب کنید، به سبد خرید اضافه کنید، آدرس تحویل و روش پرداخت را وارد نمایید و روی «تأیید و پرداخت» کلیک کنید. پس از پرداخت موفق، پیامک تأییدیه دریافت خواهید کرد.",
    popular: true,
  },
  {
    id: 2,
    category: "order",
    question: "آیا می‌توانم سفارشم را بعد از ثبت تغییر دهم؟",
    answer:
      "تا زمانی که سفارش وارد مرحله آماده‌سازی نشده باشد، می‌توانید از طریق پنل کاربری یا تماس با پشتیبانی درخواست تغییر دهید. پس از ارسال سفارش، تغییر آن امکان‌پذیر نیست.",
    popular: false,
  },
  {
    id: 3,
    category: "order",
    question: "چطور بفهمم سفارشم تأیید شده است؟",
    answer:
      "پس از ثبت موفق سفارش، یک پیامک تأییدیه حاوی شماره سفارش به موبایل شما ارسال می‌شود. همچنین می‌توانید وضعیت سفارش را در بخش «سفارش‌های من» در پنل کاربری مشاهده کنید.",
    popular: true,
  },
  {
    id: 4,
    category: "order",
    question: "آیا امکان ثبت سفارش بدون حساب کاربری وجود دارد؟",
    answer:
      "خیر، برای ثبت سفارش در مارلو شاپ داشتن حساب کاربری الزامی است. ثبت‌نام سریع و رایگان است و تنها چند دقیقه زمان می‌برد.",
    popular: false,
  },
  {
    id: 5,
    category: "order",
    question: "آیا می‌توانم برای شخص دیگری سفارش ثبت کنم؟",
    answer:
      "بله، می‌توانید آدرس تحویل را به نام و آدرس شخص دیگری ثبت کنید. کافی است در هنگام تکمیل سفارش، اطلاعات گیرنده را وارد نمایید.",
    popular: false,
  },
  {
    id: 6,
    category: "order",
    question: "حداقل مبلغ خرید در مارلو شاپ چقدر است؟",
    answer:
      "مارلو شاپ هیچ حداقل مبلغ خریدی تعیین نکرده است. شما می‌توانید هر مبلغی را خریداری کنید. البته ممکن است برای برخی روش‌های ارسال، حداقل مبلغ برای ارسال رایگان در نظر گرفته شود.",
    popular: false,
  },

  /* ─── پرداخت ─── */
  {
    id: 7,
    category: "payment",
    question: "چه روش‌های پرداختی در مارلو شاپ قبول می‌شود؟",
    answer:
      "مارلو شاپ روش‌های پرداخت زیر را پشتیبانی می‌کند:\n• پرداخت آنلاین با تمام کارت‌های شتاب\n• کارت به کارت (با هماهنگی پشتیبانی)\n• کیف پول مارلو شاپ\n• پرداخت در محل (در مناطق مشمول)",
    popular: true,
  },
  {
    id: 8,
    category: "payment",
    question: "پرداختم ناموفق بود ولی از حسابم کسر شد. چه کنم؟",
    answer:
      "نگران نباشید! مبلغ کسرشده در مواقع پرداخت ناموفق، ظرف ۷۲ ساعت کاری به‌طور خودکار به حسابتان بازمی‌گردد. اگر بیش از این زمان گذشت، با پشتیبانی مارلو شاپ تماس بگیرید.",
    popular: true,
  },
  {
    id: 9,
    category: "payment",
    question: "آیا پرداخت در مارلو شاپ امن است؟",
    answer:
      "بله، کلیه پرداخت‌ها از طریق درگاه‌های بانکی معتبر و با پروتکل رمزگذاری SSL انجام می‌شود. اطلاعات کارت بانکی شما در هیچ مرحله‌ای توسط مارلو شاپ ذخیره نمی‌شود.",
    popular: false,
  },
  {
    id: 10,
    category: "payment",
    question: "آیا می‌توانم فاکتور رسمی دریافت کنم؟",
    answer:
      "بله، پس از نهایی شدن سفارش، فاکتور الکترونیکی از طریق ایمیل برای شما ارسال می‌شود. همچنین در پنل کاربری می‌توانید فاکتورهای خود را مشاهده و دانلود کنید.",
    popular: false,
  },
  {
    id: 11,
    category: "payment",
    question: "کیف پول مارلو شاپ چیست و چطور شارژ می‌شود؟",
    answer:
      "کیف پول مارلو شاپ یک موجودی اعتباری است که می‌توانید برای خریدهای بعدی استفاده کنید. موجودی کیف پول از طریق واریز مستقیم، بازگشت وجه سفارش‌های لغوشده یا کدهای هدیه شارژ می‌شود.",
    popular: false,
  },

  /* ─── ارسال و تحویل ─── */
  {
    id: 12,
    category: "shipping",
    question: "زمان تحویل سفارش چقدر است؟",
    answer:
      "سفارش‌ها معمولاً ظرف ۱ تا ۳ روز کاری پس از تأیید پرداخت آماده و ارسال می‌شوند. زمان رسیدن بسته بسته به شهر مقصد بین ۱ تا ۷ روز کاری متغیر است. در تهران امکان ارسال اکسپرس یک‌روزه نیز وجود دارد.",
    popular: true,
  },
  {
    id: 13,
    category: "shipping",
    question: "هزینه ارسال چقدر است؟",
    answer:
      "هزینه ارسال بر اساس وزن، حجم کالا و شهر مقصد محاسبه می‌شود و در مرحله تکمیل سفارش نمایش داده می‌شود. برای سفارش‌های بالای سقف مشخص، ارسال رایگان ارائه می‌شود.",
    popular: true,
  },
  {
    id: 14,
    category: "shipping",
    question: "آیا ارسال به تمام شهرهای ایران دارید؟",
    answer:
      "بله، مارلو شاپ به سراسر ایران ارسال می‌کند. ارسال از طریق پست پیشتاز، اکسپرس و شرکت‌های پیک معتبر مانند تیپاکس صورت می‌گیرد.",
    popular: false,
  },
  {
    id: 15,
    category: "shipping",
    question: "چطور سفارشم را رهگیری کنم؟",
    answer:
      "پس از ارسال، کد رهگیری از طریق پیامک و ایمیل به شما اطلاع‌رسانی می‌شود. همچنین می‌توانید در پنل کاربری خود، در بخش «جزئیات سفارش»، لینک رهگیری را مشاهده کنید.",
    popular: true,
  },
  {
    id: 16,
    category: "shipping",
    question: "اگر در زمان تحویل حضور نداشتم چه اتفاقی می‌افتد؟",
    answer:
      "در صورت عدم حضور در زمان تحویل، پیک مجدداً تماس می‌گیرد. برای مرسولات پستی نیز یادداشت کتبی در صندوق پستی قرار داده می‌شود تا برای دریافت بسته به دفتر پست مراجعه کنید.",
    popular: false,
  },
  {
    id: 17,
    category: "shipping",
    question: "آیا بسته‌بندی محصولات مناسب است؟",
    answer:
      "بله، تمام محصولات با بسته‌بندی استاندارد و مقاوم ارسال می‌شوند تا در حین حمل و نقل آسیب نبینند. محصولات حساس با بسته‌بندی ویژه و محافظ فرستاده می‌شوند.",
    popular: false,
  },

  /* ─── مرجوعی ─── */
  {
    id: 18,
    category: "return",
    question: "آیا می‌توانم کالا را مرجوع کنم؟",
    answer:
      "بله، مارلو شاپ تا ۷ روز پس از دریافت کالا امکان مرجوعی فراهم می‌کند، مشروط بر اینکه کالا استفاده نشده، در بسته‌بندی اصلی و بدون آسیب باشد.",
    popular: true,
  },
  {
    id: 19,
    category: "return",
    question: "مبلغ بازگشتی چطور و چه زمانی پرداخت می‌شود؟",
    answer:
      "پس از تأیید مرجوعی توسط تیم ما، مبلغ ظرف ۵ روز کاری به حسابی که از آن پرداخت کرده‌اید یا کیف پول مارلو شاپ (به انتخاب شما) عودت داده می‌شود.",
    popular: true,
  },
  {
    id: 20,
    category: "return",
    question: "چه محصولاتی قابل مرجوع نیستند؟",
    answer:
      "محصولات زیر قابل مرجوع نیستند:\n• کالاهای بهداشتی و آرایشی پس از باز شدن بسته\n• محصولات دیجیتال و لایسنس‌های نرم‌افزاری\n• کالاهایی که به سفارش مشتری سفارشی‌سازی شده‌اند\n• محصولات فسادپذیر",
    popular: false,
  },
  {
    id: 21,
    category: "return",
    question: "اگر کالا معیوب یا اشتباه ارسال شد چه کنم؟",
    answer:
      "در صورت دریافت کالای معیوب یا اشتباه، بلافاصله با پشتیبانی تماس بگیرید. هزینه ارسال مرجوعی در این موارد توسط مارلو شاپ پرداخت می‌شود و کالای سالم در اسرع وقت برای شما ارسال خواهد شد.",
    popular: true,
  },
  {
    id: 22,
    category: "return",
    question: "فرآیند مرجوع کردن کالا چگونه است؟",
    answer:
      "۱. از پنل کاربری درخواست مرجوعی ثبت کنید\n۲. دلیل مرجوعی و تصویر کالا را ارسال نمایید\n۳. پس از تأیید، آدرس ارسال برای شما پیامک می‌شود\n۴. کالا را در بسته‌بندی اصلی ارسال کنید\n۵. پس از دریافت و بررسی، مبلغ عودت داده می‌شود",
    popular: false,
  },

  /* ─── حساب کاربری ─── */
  {
    id: 23,
    category: "account",
    question: "چطور ثبت‌نام کنم؟",
    answer:
      "برای ثبت‌نام روی «ورود / ثبت‌نام» در بالای سایت کلیک کنید. شماره موبایل خود را وارد کنید، کد تأیید ارسال‌شده را ثبت کنید و پروفایل خود را تکمیل نمایید.",
    popular: true,
  },
  {
    id: 24,
    category: "account",
    question: "رمز عبورم را فراموش کرده‌ام. چه کنم؟",
    answer:
      "روی «فراموشی رمز عبور» در صفحه ورود کلیک کنید. شماره موبایل ثبت‌شده را وارد کنید و کد بازیابی را دریافت و وارد نمایید. سپس رمز عبور جدید تعیین کنید.",
    popular: false,
  },
  {
    id: 25,
    category: "account",
    question: "آیا می‌توانم اطلاعات پروفایلم را ویرایش کنم؟",
    answer:
      "بله، در پنل کاربری بخش «اطلاعات شخصی» می‌توانید نام، آدرس ایمیل، آدرس تحویل و سایر اطلاعات خود را ویرایش کنید. شماره موبایل تنها با تأیید پشتیبانی قابل تغییر است.",
    popular: false,
  },
  {
    id: 26,
    category: "account",
    question: "آیا اطلاعات من محرمانه می‌ماند؟",
    answer:
      "بله، مارلو شاپ به حریم خصوصی شما احترام می‌گذارد. اطلاعات شخصی شما بدون رضایتتان به هیچ شخص ثالثی داده نمی‌شود و تنها برای پردازش سفارش‌ها استفاده می‌شود.",
    popular: false,
  },
  {
    id: 27,
    category: "account",
    question: "چطور حساب کاربری‌ام را حذف کنم؟",
    answer:
      "برای حذف حساب کاربری با پشتیبانی مارلو شاپ از طریق ایمیل یا تیکت تماس بگیرید. توجه داشته باشید که پس از حذف، تاریخچه سفارش‌ها و اطلاعات شما پاک خواهد شد.",
    popular: false,
  },

  /* ─── محصولات ─── */
  {
    id: 28,
    category: "product",
    question: "آیا همه محصولات اصل و باکیفیت هستند؟",
    answer:
      "بله، مارلو شاپ تنها محصولات اصل و باکیفیت از تأمین‌کنندگان معتبر عرضه می‌کند. تمام کالاها قبل از ارسال بازرسی کیفیت می‌شوند.",
    popular: true,
  },
  {
    id: 29,
    category: "product",
    question: "اگر محصول مورد نظرم ناموجود باشد چه کنم؟",
    answer:
      "می‌توانید روی گزینه «اطلاع‌رسانی موجودی» کلیک کنید تا به‌محض موجود شدن محصول، پیامک اطلاع‌رسانی دریافت کنید. همچنین می‌توانید محصول را به لیست علاقه‌مندی‌ها اضافه کنید.",
    popular: false,
  },
  {
    id: 30,
    category: "product",
    question: "آیا امکان سفارش عمده وجود دارد؟",
    answer:
      "بله، برای سفارش‌های عمده و سازمانی با تیم فروش مارلو شاپ از طریق ایمیل sales@marloo.shop تماس بگیرید. برای سفارش‌های بالای حد مشخص، تخفیف ویژه عمده ارائه می‌شود.",
    popular: false,
  },
  {
    id: 31,
    category: "product",
    question: "آیا گارانتی محصولات تضمین می‌شود؟",
    answer:
      "محصولات دارای گارانتی معتبر سازنده، تحت شرایط گارانتی همان برند پشتیبانی می‌شوند. اطلاعات گارانتی روی هر محصول به‌طور شفاف درج شده است.",
    popular: false,
  },

  /* ─── تخفیف و کد ─── */
  {
    id: 32,
    category: "discount",
    question: "چطور از کد تخفیف استفاده کنم؟",
    answer:
      "در مرحله نهایی‌سازی سفارش، کادر «کد تخفیف» نمایش داده می‌شود. کد خود را وارد کنید و روی «اعمال» کلیک کنید. مبلغ تخفیف از مجموع سفارش کسر خواهد شد.",
    popular: true,
  },
  {
    id: 33,
    category: "discount",
    question: "کد تخفیف کار نمی‌کند، مشکل از کجاست؟",
    answer:
      "دلایل احتمالی:\n• کد منقضی شده است\n• کد قبلاً استفاده شده\n• شرایط استفاده از کد رعایت نشده (حداقل خرید، دسته خاص)\n• کد برای حساب دیگری صادر شده\nدر صورت ادامه مشکل، با پشتیبانی تماس بگیرید.",
    popular: false,
  },
  {
    id: 34,
    category: "discount",
    question: "آیا امکان ترکیب چند کد تخفیف وجود دارد؟",
    answer:
      "خیر، در هر سفارش تنها یک کد تخفیف قابل استفاده است. البته کد تخفیف را می‌توان با تخفیف‌های محصول (مثل تخفیف ویژه یا جشنواره) ترکیب کرد.",
    popular: false,
  },
  {
    id: 35,
    category: "discount",
    question: "چطور از تخفیف‌های ویژه مارلو شاپ باخبر شوم؟",
    answer:
      "برای مطلع شدن از جدیدترین تخفیف‌ها:\n• خبرنامه ایمیلی مارلو شاپ را فعال کنید\n• در اینستاگرام مارلو شاپ را دنبال کنید\n• اعلان‌های پوش سایت را فعال کنید\n• در باشگاه مشتریان عضو شوید",
    popular: false,
  },
];

/* ─────────────────────────────── COMPONENTS ─────────────────────────────── */

function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  const formatAnswer = (text: string) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));

  return (
    <div
      style={{
        background: isOpen
          ? "linear-gradient(135deg,#faf8ff 0%,#f3efff 100%)"
          : "white",
        borderRadius: "14px",
        border: isOpen ? "1.5px solid #c4b5fd" : "1.5px solid #f0ebff",
        marginBottom: "10px",
        overflow: "hidden",
        boxShadow: isOpen
          ? "0 6px 24px rgba(124,58,237,0.10)"
          : "0 2px 8px rgba(30,27,75,0.05)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.15rem 1.4rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "right",
          fontFamily: "'Vazirmatn', sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
          {/* Question mark badge */}
          <span
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: isOpen
                ? "linear-gradient(135deg,#7c3aed,#6d28d9)"
                : "linear-gradient(135deg,#ede9fe,#ddd6fe)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "0.8rem",
              fontWeight: "700",
              color: isOpen ? "white" : "#7c3aed",
              transition: "all 0.3s",
            }}
          >
            ؟
          </span>
          <span
            style={{
              fontSize: "0.975rem",
              fontWeight: isOpen ? "700" : "600",
              color: isOpen ? "#4c1d95" : "#1e1b4b",
              lineHeight: "1.5",
              transition: "color 0.2s",
            }}
          >
            {faq.question}
          </span>
          {faq.popular && (
            <span
              style={{
                background: "linear-gradient(135deg,#fef3c7,#fde68a)",
                color: "#92400e",
                fontSize: "0.68rem",
                fontWeight: "700",
                padding: "2px 8px",
                borderRadius: "20px",
                flexShrink: 0,
                border: "1px solid #fcd34d",
              }}
            >
              ⭐ پرتکرار
            </span>
          )}
        </div>

        {/* Chevron */}
        <span
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: isOpen ? "#7c3aed" : "#f3f0ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <path
              d="M2 4l4 4 4-4"
              stroke={isOpen ? "white" : "#7c3aed"}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Answer body */}
      <div
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            padding: "0 1.4rem 1.35rem 1.4rem",
            paddingRight: "calc(1.4rem + 30px + 0.75rem)",
          }}
        >
          <div
            style={{
              color: "#4b5563",
              fontSize: "0.9rem",
              lineHeight: "2",
              background: "rgba(255,255,255,0.7)",
              borderRadius: "10px",
              padding: "0.9rem 1.1rem",
              borderRight: "3px solid #a78bfa",
            }}
          >
            {formatAnswer(faq.answer)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── MAIN APP ─────────────────────────────── */

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState<number | null>(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", question: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleToggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "all" || f.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const popularFaqs = faqs.filter((f) => f.popular);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={{
        fontFamily: "'Vazirmatn', sans-serif",
        direction: "rtl",
        background: "#f8f7ff",
        minHeight: "100vh",
      }}
    >
      {/* ══════════ HEADER ══════════ */}
      <header
        style={{
          background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 55%,#4c1d95 100%)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 4px 20px rgba(30,27,75,0.35)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0.9rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                borderRadius: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                boxShadow: "0 4px 12px rgba(124,58,237,0.45)",
              }}
            >
              🛍️
            </div>
            <div>
              <div style={{ color: "white", fontSize: "1.1rem", fontWeight: "700" }}>
                مارلو شاپ
              </div>
              <div style={{ color: "#c4b5fd", fontSize: "0.72rem" }}>فروشگاه اینترنتی</div>
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <a
              href="https://marloo.shop"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#c4b5fd",
                fontSize: "0.82rem",
                textDecoration: "none",
                padding: "0.45rem 1rem",
                borderRadius: "7px",
                border: "1px solid rgba(196,181,253,0.25)",
                transition: "all 0.2s",
              }}
            >
              صفحه اصلی
            </a>
            <a
              href="https://marloo.shop/products"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                color: "white",
                fontSize: "0.82rem",
                fontWeight: "600",
                textDecoration: "none",
                padding: "0.45rem 1.1rem",
                borderRadius: "7px",
                boxShadow: "0 2px 8px rgba(124,58,237,0.4)",
              }}
            >
              🛒 خرید کنید
            </a>
          </nav>
        </div>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section
        style={{
          background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 55%,#5b21b6 100%)",
          padding: "4rem 2rem 5.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative blobs */}
        {[
          { top: "-100px", right: "-80px", size: "320px", opacity: 0.12 },
          { top: "40px", left: "-60px", size: "200px", opacity: 0.08 },
          { bottom: "-80px", left: "40%", size: "260px", opacity: 0.09 },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background: `rgba(167,139,250,${b.opacity})`,
              top: b.top,
              bottom: b.bottom,
              right: b.right,
              left: b.left,
              pointerEvents: "none",
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 1, maxWidth: "640px", margin: "0 auto" }}>
          {/* Pill badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(167,139,250,0.18)",
              border: "1px solid rgba(167,139,250,0.4)",
              borderRadius: "100px",
              padding: "0.35rem 1.25rem",
              marginBottom: "1.4rem",
            }}
          >
            <span style={{ fontSize: "1rem" }}>💬</span>
            <span style={{ color: "#c4b5fd", fontSize: "0.82rem", fontWeight: "500" }}>
              پاسخ به سوالات رایج مشتریان
            </span>
          </div>

          <h1
            style={{
              color: "white",
              fontSize: "clamp(1.9rem,4.5vw,3rem)",
              fontWeight: "800",
              margin: "0 0 1rem",
              lineHeight: "1.3",
            }}
          >
            سوالات متداول
          </h1>
          <p
            style={{
              color: "#c4b5fd",
              fontSize: "1rem",
              lineHeight: "1.9",
              margin: "0 auto 2.2rem",
              maxWidth: "480px",
            }}
          >
            پاسخ سوالات پرتکرار درباره خرید، ارسال، پرداخت و خدمات مارلو شاپ را اینجا بیابید.
          </p>

          {/* Search box */}
          <div
            style={{
              position: "relative",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            <span
              style={{
                position: "absolute",
                right: "1.1rem",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "1.1rem",
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="جستجو در سوالات..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveCategory("all");
                setOpenId(null);
              }}
              style={{
                width: "100%",
                padding: "0.9rem 3rem 0.9rem 1.2rem",
                borderRadius: "12px",
                border: "2px solid rgba(167,139,250,0.3)",
                background: "rgba(255,255,255,0.12)",
                color: "white",
                fontSize: "0.95rem",
                fontFamily: "'Vazirmatn', sans-serif",
                outline: "none",
                backdropFilter: "blur(8px)",
                boxSizing: "border-box",
                transition: "border 0.2s",
              }}
              onFocus={(e) =>
                ((e.target as HTMLInputElement).style.border =
                  "2px solid rgba(167,139,250,0.7)")
              }
              onBlur={(e) =>
                ((e.target as HTMLInputElement).style.border =
                  "2px solid rgba(167,139,250,0.3)")
              }
            />
          </div>
        </div>
      </section>

      {/* ══════════ STATS STRIP ══════════ */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #ede9fe",
          boxShadow: "0 2px 12px rgba(30,27,75,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: "❓", num: `${faqs.length}+`, label: "سوال پاسخ داده‌شده" },
            { icon: "⚡", num: "۲۴ ساعته", label: "پشتیبانی آنلاین" },
            { icon: "😊", num: "۹۸٪", label: "رضایت مشتریان" },
          ].map((s) => (
            <div
              key={s.label}
              style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
            >
              <span style={{ fontSize: "1.3rem" }}>{s.icon}</span>
              <div>
                <div
                  style={{
                    color: "#4c1d95",
                    fontWeight: "800",
                    fontSize: "1rem",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div style={{ color: "#9ca3af", fontSize: "0.75rem", marginTop: "2px" }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ POPULAR FAQS ══════════ */}
      {!searchQuery && (
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.2rem",
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>⭐</span>
            <h2 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#1e1b4b", margin: 0 }}>
              پرتکرارترین سوالات
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: "0.9rem",
            }}
          >
            {popularFaqs.map((faq) => (
              <button
                key={faq.id}
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                  setOpenId(faq.id);
                  setTimeout(() => {
                    document.getElementById(`faq-${faq.id}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }, 100);
                }}
                style={{
                  background: "white",
                  border: "1.5px solid #ede9fe",
                  borderRadius: "12px",
                  padding: "1rem 1.1rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.65rem",
                  cursor: "pointer",
                  textAlign: "right",
                  fontFamily: "'Vazirmatn', sans-serif",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(30,27,75,0.04)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "#a78bfa";
                  el.style.boxShadow = "0 6px 20px rgba(124,58,237,0.13)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "#ede9fe";
                  el.style.boxShadow = "0 2px 8px rgba(30,27,75,0.04)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    background: "linear-gradient(135deg,#ede9fe,#ddd6fe)",
                    borderRadius: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    color: "#7c3aed",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  ؟
                </span>
                <span style={{ fontSize: "0.845rem", color: "#374151", lineHeight: "1.55", fontWeight: "500" }}>
                  {faq.question}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ MAIN CONTENT ══════════ */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
        className="faq-layout"
      >
        {/* ── Category sidebar ── */}
        <aside
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "1.25rem",
            boxShadow: "0 4px 20px rgba(30,27,75,0.07)",
            border: "1px solid #ede9fe",
            position: "sticky",
            top: "76px",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: "700",
              color: "#7c3aed",
              margin: "0 0 1rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              paddingBottom: "0.75rem",
              borderBottom: "2px solid #f3f0ff",
            }}
          >
            🗂 دسته‌بندی‌ها
          </p>
          {categories.map((cat) => {
            const count =
              cat.id === "all"
                ? faqs.length
                : faqs.filter((f) => f.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery("");
                  setOpenId(null);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.55rem 0.75rem",
                  marginBottom: "4px",
                  background: isActive
                    ? "linear-gradient(135deg,#ede9fe,#ddd6fe)"
                    : "transparent",
                  color: isActive ? "#6d28d9" : "#4b5563",
                  border: "none",
                  borderRadius: "9px",
                  cursor: "pointer",
                  fontSize: "0.845rem",
                  fontWeight: isActive ? "700" : "400",
                  textAlign: "right",
                  fontFamily: "'Vazirmatn', sans-serif",
                  transition: "all 0.18s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background = "#f5f3ff";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>{cat.icon}</span>
                  {cat.label}
                </span>
                <span
                  style={{
                    background: isActive ? "#7c3aed" : "#f0ebff",
                    color: isActive ? "white" : "#7c3aed",
                    fontSize: "0.72rem",
                    fontWeight: "700",
                    padding: "1px 7px",
                    borderRadius: "20px",
                    minWidth: "22px",
                    textAlign: "center",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {/* contact box */}
          <div
            style={{
              marginTop: "1.5rem",
              background: "linear-gradient(135deg,#1e1b4b,#312e81)",
              borderRadius: "12px",
              padding: "1.1rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>🎧</div>
            <p
              style={{
                color: "white",
                fontSize: "0.82rem",
                fontWeight: "600",
                margin: "0 0 0.3rem",
              }}
            >
              پاسخت رو نیافتی؟
            </p>
            <p style={{ color: "#c4b5fd", fontSize: "0.74rem", margin: "0 0 0.75rem", lineHeight: "1.6" }}>
              تیم پشتیبانی ما آماده‌ست!
            </p>
            <a
              href="#contact-form"
              style={{
                display: "block",
                background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                color: "white",
                padding: "0.5rem",
                borderRadius: "8px",
                fontSize: "0.78rem",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              ارسال پیام
            </a>
          </div>
        </aside>

        {/* ── FAQ list ── */}
        <div>
          {/* Result header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <h2
                style={{
                  fontSize: "1.05rem",
                  fontWeight: "700",
                  color: "#1e1b4b",
                  margin: 0,
                }}
              >
                {searchQuery
                  ? `نتایج جستجو برای "${searchQuery}"`
                  : categories.find((c) => c.id === activeCategory)?.label}
              </h2>
              <span
                style={{
                  background: "linear-gradient(135deg,#ede9fe,#ddd6fe)",
                  color: "#6d28d9",
                  fontSize: "0.78rem",
                  fontWeight: "700",
                  padding: "2px 10px",
                  borderRadius: "20px",
                  border: "1px solid #c4b5fd",
                }}
              >
                {filtered.length} سوال
              </span>
            </div>

            {(searchQuery || activeCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setOpenId(null);
                }}
                style={{
                  background: "#f3f4f6",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.4rem 0.9rem",
                  fontSize: "0.8rem",
                  color: "#6b7280",
                  cursor: "pointer",
                  fontFamily: "'Vazirmatn', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                ✕ پاک کردن فیلتر
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                background: "white",
                borderRadius: "16px",
                border: "1.5px dashed #ddd6fe",
              }}
            >
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🔍</div>
              <h3
                style={{ color: "#4c1d95", fontSize: "1.1rem", fontWeight: "700", margin: "0 0 0.5rem" }}
              >
                نتیجه‌ای یافت نشد
              </h3>
              <p style={{ color: "#9ca3af", fontSize: "0.9rem", margin: 0, lineHeight: "1.7" }}>
                سوال شما در پایگاه داده ما نیست؟ از فرم پشتیبانی استفاده کنید.
              </p>
            </div>
          ) : (
            filtered.map((faq) => (
              <div key={faq.id} id={`faq-${faq.id}`}>
                <AccordionItem
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => handleToggle(faq.id)}
                />
              </div>
            ))
          )}
        </div>
      </main>

      {/* ══════════ CONTACT FORM ══════════ */}
      <section
        id="contact-form"
        style={{
          background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 60%,#4c1d95 100%)",
          padding: "4rem 1.5rem",
          scrollMarginTop: "76px",
        }}
      >
        <div style={{ maxWidth: "620px", margin: "0 auto" }}>
          {/* heading */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>💬</div>
            <h2
              style={{
                color: "white",
                fontSize: "1.6rem",
                fontWeight: "800",
                margin: "0 0 0.75rem",
              }}
            >
              سوالت رو نیافتی؟
            </h2>
            <p style={{ color: "#c4b5fd", fontSize: "0.95rem", lineHeight: "1.8", margin: 0 }}>
              سوالت رو برای ما بفرست. تیم پشتیبانی مارلو شاپ در اسرع وقت پاسخ خواهد داد.
            </p>
          </div>

          {submitted ? (
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "3rem 2rem",
                textAlign: "center",
                border: "1.5px solid rgba(167,139,250,0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
              <h3
                style={{
                  color: "white",
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  margin: "0 0 0.75rem",
                }}
              >
                پیامت دریافت شد!
              </h3>
              <p style={{ color: "#c4b5fd", lineHeight: "1.8", margin: "0 0 1.5rem" }}>
                تیم پشتیبانی مارلو شاپ در اسرع وقت، معمولاً ظرف ۲۴ ساعت، پاسخ خواهد داد.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setContactForm({ name: "", email: "", question: "" });
                }}
                style={{
                  background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 2rem",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "'Vazirmatn', sans-serif",
                }}
              >
                ارسال سوال دیگر
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "2.5rem",
                border: "1.5px solid rgba(167,139,250,0.25)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Name + Email row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
                className="form-row"
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#c4b5fd",
                      fontSize: "0.82rem",
                      fontWeight: "600",
                      marginBottom: "0.4rem",
                    }}
                  >
                    نام شما *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً: علی رضایی"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "10px",
                      border: "1.5px solid rgba(167,139,250,0.3)",
                      background: "rgba(255,255,255,0.1)",
                      color: "white",
                      fontSize: "0.9rem",
                      fontFamily: "'Vazirmatn', sans-serif",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#c4b5fd",
                      fontSize: "0.82rem",
                      fontWeight: "600",
                      marginBottom: "0.4rem",
                    }}
                  >
                    ایمیل *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@email.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "10px",
                      border: "1.5px solid rgba(167,139,250,0.3)",
                      background: "rgba(255,255,255,0.1)",
                      color: "white",
                      fontSize: "0.9rem",
                      fontFamily: "'Vazirmatn', sans-serif",
                      outline: "none",
                      boxSizing: "border-box",
                      direction: "ltr",
                      textAlign: "right",
                    }}
                  />
                </div>
              </div>

              {/* Question textarea */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "#c4b5fd",
                    fontSize: "0.82rem",
                    fontWeight: "600",
                    marginBottom: "0.4rem",
                  }}
                >
                  سوال شما *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="سوالت رو اینجا بنویس..."
                  value={contactForm.question}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, question: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    borderRadius: "10px",
                    border: "1.5px solid rgba(167,139,250,0.3)",
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                    fontSize: "0.9rem",
                    fontFamily: "'Vazirmatn', sans-serif",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    lineHeight: "1.7",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                  color: "white",
                  border: "none",
                  padding: "0.95rem",
                  borderRadius: "11px",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontFamily: "'Vazirmatn', sans-serif",
                  boxShadow: "0 6px 20px rgba(124,58,237,0.4)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 10px 28px rgba(124,58,237,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 6px 20px rgba(124,58,237,0.4)";
                }}
              >
                📨 ارسال سوال
              </button>

              <p
                style={{
                  color: "#a78bfa",
                  fontSize: "0.78rem",
                  textAlign: "center",
                  margin: "1rem 0 0",
                  lineHeight: "1.6",
                }}
              >
                معمولاً ظرف ۲۴ ساعت پاسخ دریافت خواهید کرد.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer
        style={{
          background: "#13112b",
          padding: "2.5rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.7rem",
              marginBottom: "0.85rem",
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>🛍️</span>
            <span style={{ color: "white", fontSize: "1rem", fontWeight: "700" }}>مارلو شاپ</span>
          </div>
          <p style={{ color: "#6d6a9e", fontSize: "0.82rem", margin: "0 0 1.25rem" }}>
            خرید آسان، سریع و مطمئن
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.75rem",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            {[
              { label: "صفحه اصلی", href: "https://marloo.shop" },
              { label: "محصولات", href: "https://marloo.shop/products" },
              { label: "قوانین و مقررات", href: "#" },
              { label: "تماس با ما", href: "#contact-form" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  color: "#a78bfa",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.25rem" }}>
            <p style={{ color: "#413e6e", fontSize: "0.78rem", margin: 0 }}>
              © ۱۴۰۴ مارلو شاپ — تمامی حقوق محفوظ است
            </p>
          </div>
        </div>
      </footer>

      {/* ══════════ GLOBAL STYLES ══════════ */}
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.45); }
        textarea::placeholder { color: rgba(255,255,255,0.45); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 3px; }

        @media (max-width: 860px) {
          .faq-layout {
            grid-template-columns: 1fr !important;
          }
          aside {
            position: static !important;
          }
        }
        @media (max-width: 560px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
