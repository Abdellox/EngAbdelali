export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Total Courses</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold text-orange-600">0</p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">$0</p>
        </div>
      </div>
    </div>
  );
}
