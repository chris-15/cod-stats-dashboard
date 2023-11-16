import SignInButtons from "@/components/SignInButtons"
import { getServerSession } from "next-auth/next";
import { authOptions} from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function SignIn() {
  const session = await getServerSession(authOptions);

  if(session) {
    redirect('/dashboard');
  }
  return (
    <SignInButtons />
  )
}
export default SignIn