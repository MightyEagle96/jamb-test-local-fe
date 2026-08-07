import { AppUserProvider } from "./contexts/AppUserContext";
import MainRoute from "./routes/MainRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <AppUserProvider>
      <MainRoute />
      <Toaster richColors position="top-right" expand closeButton />
    </AppUserProvider>
  );
}

export default App;
