import MainRoute from "./routes/MainRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <MainRoute />
      <Toaster richColors position="top-right" expand closeButton />
    </div>
  );
}

export default App;
