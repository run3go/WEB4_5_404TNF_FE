import '@/assets/styles/global.css';
import AuthAccessControl from '@/components/common/AuthAccessControl';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { StyledToastContainer } from '@/components/common/Toast';
import NotificationProvider from '@/components/notification/NotificationProvider';
import TanstackProvider from '@/providers/TanstackProvider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-screen bg-[url('/images/bg.png')] bg-cover dark:bg-[url('/images/dark-bg.png')]">
      <TanstackProvider>
        <NotificationProvider />
        <div className="h-screen">
          <Sidebar />
        </div>

        <div className="h-full sm:mt-[5.2vh] sm:mr-[3vw] sm:mb-0 sm:h-[calc(89.4vh)] sm:grow-1 sm:pl-[2vw]">
          <Header />
          <div className="scrollbar-hidden h-[calc(100vh-72px)] w-full overflow-y-auto bg-[var(--color-background)] sm:h-[calc(86.8vh-36px)] sm:rounded-[50px] dark:bg-[var(--color-black)]">
            <AuthAccessControl>{children}</AuthAccessControl>
          </div>
        </div>
        <StyledToastContainer />
      </TanstackProvider>
    </div>
  );
}
