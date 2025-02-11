import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainRouter from "./routes";
import { Toaster } from "sonner";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <section className="flex flex-col items-center justify-start w-screen h-screen p-0 m-0 bg-black text-primary">
          <MainRouter />
        </section>
        <Toaster richColors />
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;
