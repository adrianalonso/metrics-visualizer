import Head from "next/head";
import { Dashboard } from "../app/metrics/infrastructure/ui/dashboard/dashboard.page";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard Timeline Chart</title>
      </Head>
      <Dashboard />
    </>
  );
}
