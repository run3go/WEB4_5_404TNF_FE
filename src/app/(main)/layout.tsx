import '@/assets/styles/global.css';
import ChatbotIcon from '@/components/chatbot/ChatbotIcon';
import AuthAccessControl from '@/components/common/AuthAccessControl';
import Header from '@/components/common/Header';
import { StyledToastContainer } from '@/components/common/Toast';
import NotificationProvider from '@/components/notification/NotificationProvider';
import Sidebar from '@/components/sidebar/Sidebar';
import TanstackProvider from '@/providers/TanstackProvider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="scrollbar-hidden flex min-h-screen w-full bg-[url('/images/bg.png')] bg-cover dark:bg-[url('/images/dark-bg.png')]">
      <TanstackProvider>
        <NotificationProvider />
        <div className="h-screen">
          <Sidebar />
        </div>

        <div className="h-full w-full md:mt-[5.2vh] md:mr-[3vw] md:mb-0 md:h-[calc(89.4vh)] md:grow-1 md:pl-[2vw]">
          <Header />
          <div className="scrollbar-hidden h-[calc(100vh-72px)] w-full overflow-y-auto bg-[var(--color-background)] sm:h-[100vh] md:h-[calc(86.8vh-36px)] md:rounded-[50px] dark:bg-[var(--color-black)]">
            <AuthAccessControl>{children}</AuthAccessControl>
          </div>
        </div>
        <StyledToastContainer />
        <ChatbotIcon />
      </TanstackProvider>
    </div>
  );
}
