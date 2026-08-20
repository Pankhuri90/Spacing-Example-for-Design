import { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import Portfolio from "./app/Portfolio.tsx";
import OpportunityMapping from "./app/OpportunityMapping.tsx";
import DataValidation from "./app/DataValidation.tsx";
import "./styles/index.css";

type TopPage = "portfolio" | "design-refactoring" | "opportunity-mapping" | "data-validation";

function Root() {
  const [topPage, setTopPage] = useState<TopPage>("portfolio");

  if (topPage === "design-refactoring") {
    return <App onBack={() => setTopPage("portfolio")} />;
  }
  if (topPage === "opportunity-mapping") {
    return <OpportunityMapping onBack={() => setTopPage("portfolio")} />;
  }
  if (topPage === "data-validation") {
    return <DataValidation onBack={() => setTopPage("portfolio")} />;
  }
  return (
    <Portfolio
      onOpenDesignRefactoring={() => setTopPage("design-refactoring")}
      onOpenOpportunityMapping={() => setTopPage("opportunity-mapping")}
      onOpenDataValidation={() => setTopPage("data-validation")}
    />
  );
}

createRoot(document.getElementById("root")!).render(<Root />);