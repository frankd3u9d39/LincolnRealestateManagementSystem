import { redirect } from "next/navigation";

// The landing page is the sign-in screen.
export default function Home() {
  redirect("/login");
}
