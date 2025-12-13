import useAuthStore from '../store/authStore';

export default function StudentDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <p className="text-gray-600 mb-4">Welcome back, {user?.name}!</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Enrolled Courses</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-orange-600">0</p>
        </div>
      </div>
    </div>
  );
}
