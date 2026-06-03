import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://primetools.example.com"),
  title: {
    default: "PrimeTools — FIFA World Cup 2026 Sports Predictors",
    template: "%s | PrimeTools",
  },
  description:
    "Free, fast, mobile-first sports prediction tools for the FIFA World Cup 2026. Make your picks, share with friends.",
  keywords: [
    "FIFA World Cup 2026",
    "Sports Predictor",
    "Football Predictions",
    "Golden Boot",
    "PrimeTools",
  ],
  openGraph: {
    title: "PrimeTools — FIFA World Cup 2026 Sports Predictors",
    description: "Free, fast, mobile-first sports prediction tools.",
    type: "website",
    siteName: "PrimeTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimeTools — FIFA World Cup 2026",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7c3aed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('pt-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        {children}
      </body>
    </html>
  );
}
