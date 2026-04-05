export default async function TestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">FinCalc India Test Page</h1>
        <p className="text-xl mb-4">Current locale: <strong>{locale}</strong></p>
        <p className="text-gray-600">If you can see this page, the routing is working!</p>
        
        <div className="mt-8 space-x-4">
          <a href="/en/test-page" className="bg-blue-600 text-white px-4 py-2 rounded">English</a>
          <a href="/hi/test-page" className="bg-green-600 text-white px-4 py-2 rounded">हिंदी</a>
          <a href="/ta/test-page" className="bg-red-600 text-white px-4 py-2 rounded">தமிழ்</a>
        </div>
      </div>
    </div>
  );
}