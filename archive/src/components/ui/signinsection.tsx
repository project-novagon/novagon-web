import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";
import { SignIn } from "../AuthSys";

function SignInSection(Element: any, className: any) {
    const [user] = useAuthState(auth);

    return (
      <>
        <section className={className}>
          {user ? Element : <SignIn />}
        </section>
      </>
    );
  }

export { SignInSection }