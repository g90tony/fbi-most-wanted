import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainRouter from "./routes";
import { Toaster } from "sonner";
import { SidebarProvider } from "./components/ui/sidebar";
import store from "./state/store";
import { Provider } from "react-redux";

function App() {
  const queryClient = new QueryClient();

  return (
    <section className="flex flex-col items-center justify-start w-screen h-screen p-0 m-0 !bg-black text-primary">
      <QueryClientProvider client={queryClient}>
        <SidebarProvider className="bg-black">
          <Provider store={store}>
            <MainRouter />
          </Provider>
          <Toaster richColors />
        </SidebarProvider>
      </QueryClientProvider>
    </section>
  );
}

export default App;
