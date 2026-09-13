import { useParams } from "react-router-dom";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import AboutForm from "../components/AboutForm";
import SocialLinksForm from "../components/SocialLinksForm";

const PortfolioEditor = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Edit Portfolio
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Customize your portfolio content.
        </p>
      </div>

      <PersonalDetailsForm portfolioId={id} />
      <AboutForm portfolioId={id} />
      <SocialLinksForm portfolioId={id} />
    </div>
  );
};

export default PortfolioEditor;