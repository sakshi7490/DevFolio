import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthLayout
      eyebrow="Start building"
      title="Create your DevFolio"
      panelEyebrow="Your work, in context"
      panelTitle="Make the proof of your work easy to trust."
      panelBody="One focused place for the projects, decisions, and experience that make you the developer you are."
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
