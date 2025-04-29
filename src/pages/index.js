import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to MyApp</h1>
        <p>This is the landing page. You are logged in!</p>
      </main>
    </div>
  );
}