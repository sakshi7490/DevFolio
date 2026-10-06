import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import contactService from "../services/contactService";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import Button from "../components/common/Button";
import portfolioService from "../features/portfolio/portfolioService";

const MessageDetail = () => {
  const { messageId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMessage = async () => {
      try {
        setLoading(true);
        setError("");

        const portfoliosResponse = await portfolioService.getPortfolios();

        const portfolios = portfoliosResponse.data;

        for (const portfolio of portfolios) {
          const messages = await contactService.getMessages(portfolio._id);

          const foundMessage = messages.find((item) => item._id === messageId);

          if (foundMessage) {
            setMessage(foundMessage);

            if (!foundMessage.isRead) {
              const updatedMessage =
                await contactService.updateMessageReadStatus(messageId, true);

              setMessage(updatedMessage);
            }

            break;
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load message");
      } finally {
        setLoading(false);
      }
    };

    loadMessage();
  }, [messageId]);

  const handleDelete = async () => {
    try {
      await contactService.deleteMessage(messageId);

      navigate("/dashboard/messages");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete message");
    }
  };

  if (loading) {
    return <Spinner label="Loading message..." />;
  }

  if (error) {
    return <Alert type="error">{error}</Alert>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button
        variant="secondary"
        onClick={() => navigate("/dashboard/messages")}
      >
        ← Back to messages
      </Button>

      {message && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-ink">
            {message.subject || "No subject"}
          </h1>

          <div className="mt-4 space-y-1 text-sm text-muted">
            <p>
              <strong>Name:</strong> {message.name}
            </p>
            <p>
              <strong>Email:</strong> {message.email}
            </p>
          </div>

          <div className="my-6 border-t border-stone-200" />

          <p className="whitespace-pre-wrap text-ink">{message.message}</p>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleDelete}>Delete message</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageDetail;
