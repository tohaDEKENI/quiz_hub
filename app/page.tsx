import { redirect } from "next/navigation";

export default function Home() {
  redirect("/quiz"); // redirige automatiquement vers /quiz
}
