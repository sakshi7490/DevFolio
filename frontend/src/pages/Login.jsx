import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to DevFolio"
      subtitle="Continue building and publishing your developer story."
      panelEyebrow="Your work, in context"
      panelTitle="Make the proof of your work easy to trust."
      panelBody="One focused place for the projects, decisions, and experience that make you the developer you are."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
