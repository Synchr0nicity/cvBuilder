import { auth } from "@/auth";
import Dashboard from "@/components/layout/dashboard/Dashboard";
import { prisma } from "@/lib/prisma";
import { AppResume } from "@/types/resume";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const resumes = await prisma.resume.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return <Dashboard resumes={resumes as AppResume[]} />;
};

export default DashboardPage;
