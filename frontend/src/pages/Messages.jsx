import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import contactService from "../services/contactService";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import portfolioService from "../features/portfolio/portfolioService";

const Messages = () => {
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await portfolioService.getPortfolios();
        
        const userPortfolios = response.data;

        setPortfolios(userPortfolios);

        const allMessages = [];

        for (const portfolio of userPortfolios) {
          const portfolioMessages = await contactService.getMessages(
            portfolio._id,
          );

          allMessages.push(
            ...portfolioMessages.map((message) => ({
              ...message,
              portfolioTitle: portfolio.title,
            })),
          );
        }

        setMessages(allMessages);
      } catch (err) { console.log("MESSAGES ERROR:", err.response?.data || err);

        setError(err.response?.data?.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Messages</h1>
        <p className="mt-1 text-sm text-muted">
          Messages received through your portfolios.
        </p>
      </div>

      {loading ? (
        <Spinner label="Loading messages..." />
      ) : error ? (
        <Alert type="error">{error}</Alert>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-muted">No messages received yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <button
              key={message._id}
              onClick={() => navigate(`/dashboard/messages/${message._id}`)}
              className={`w-full rounded-2xl border p-5 text-left shadow-sm transition hover:border-accent/40 ${
                message.isRead
                  ? "border-stone-200 bg-white"
                  : "border-accent/30 bg-accent/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-ink">{message.name}</h3>

                  <p className="mt-1 text-sm text-muted">{message.email}</p>
                </div>

                {!message.isRead && (
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-white">
                    New
                  </span>
                )}
              </div>

              <p className="mt-3 font-medium text-ink">
                {message.subject || "No subject"}
              </p>

              <p className="mt-1 line-clamp-2 text-sm text-muted">
                {message.message}
              </p>

              <p className="mt-3 text-xs text-muted">
                Portfolio: {message.portfolioTitle}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
