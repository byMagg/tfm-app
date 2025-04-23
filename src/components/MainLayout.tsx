export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen dark:bg-transparent z-10 relative dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      {/* <NavigationBar client:load isProfilePage={isProfilePage} /> */}
      {/* <Toaster client:load /> */}
      {children}
    </div>
  )
}
