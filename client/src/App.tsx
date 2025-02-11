import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainRouter from "./routes";
import { Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="flex flex-col items-center justify-start w-screen h-screen p-0 m-0 bg-black text-primary">
      <QueryClientProvider client={queryClient}>
        <MainRouter />
        <Toaster richColors />
      </QueryClientProvider>
    </div>
  );
}

export default App;
