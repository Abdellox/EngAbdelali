import useAuthStore from '../store/authStore';

export default function TeacherDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      <p className="text-gray-600 mb-4">Welcome back, {user?.name}!</p>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Total Courses</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Avg Rating</h3>
          <p className="text-3xl font-bold text-yellow-600">0.0</p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Earnings</h3>
          <p className="text-3xl font-bold text-purple-600">$0</p>
        </div>
      </div>
    </div>
  );
}
