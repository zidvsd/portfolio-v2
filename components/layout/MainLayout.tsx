import Sidebar from "./Sidebar"
import MobileMenuDrawer from "./MobileMenuDrawer"
import LogoAndAvatar from "../LogoAndAvatar"
import ThemeToggle from "../themes/theme-toggle"
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    /* Apply container ONLY at lg (1024px) and above */
    /* This centers the whole grid on large screens */
    <div className="relative min-h-screen w-full lg:container lg:mx-auto lg:grid lg:grid-cols-[280px_1fr]">
      {/* Sidebar - Desktop Only */}
      <aside className="sticky top-0 hidden h-screen p-6 lg:block">
        <Sidebar />
      </aside>

      {/* Header - Mobile/Tablet Only */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-background px-6 py-4 backdrop-blur-md lg:hidden">
        <LogoAndAvatar />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileMenuDrawer />
        </div>
      </header>

      {/* Content Area */}
      <main className="flex w-full min-w-0 flex-col">
        {/* We use w-full here so the internal container handles the content width */}
        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          <div className="">{children}</div>
        </div>
      </main>
    </div>
  )
}
