import { redirect } from "next/navigation";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  redirect("https://webeka.io");
}
