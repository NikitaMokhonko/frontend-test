import AvvikelseList from "./components/AvvikelseList";
import { useAvvikelse } from "./hooks/useAvvikelse";
import { useState } from "react";
import Pill from "./components/Pill";
import { Flip, ToastContainer } from "react-toastify";

function App() {
  const { data, isLoading, markResolved } = useAvvikelse();
  const [showResolved, setShowResolved] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-semibold py-25 xl:p-10 xl:pl-20 pl-0 text-center xl:text-start">
        Avvikelser
      </h1>
      <ToastContainer
      position="top-right"
      transition={Flip}
      autoClose={4000}
      closeOnClick={true}
      theme="colored"
      hideProgressBar
      newestOnTop
       />
      <Pill value={showResolved} onChange={setShowResolved} />
      <AvvikelseList
        avvikelser={data}
        isLoading={isLoading}
        showResolved={showResolved}
        onResolve={markResolved}
      />
    </main>
  );
}

export default App;
