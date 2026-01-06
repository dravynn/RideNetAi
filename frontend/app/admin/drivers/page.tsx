'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { api } from '@/lib/api/client';
import { DriverProfile } from '@/types';
import Link from 'next/link';

export default function DriversPage() {
  const router = useRouter();
  const [drivers, setDrivers] = useState<DriverProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDrivers() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/admin/login');
        return;
      }

      const response = await api.get<DriverProfile[]>('/api/drivers');
      if (response.success && response.data) {
        setDrivers(response.data);
      }
      setLoading(false);
    }

    loadDrivers();
  }, [router]);

  const handleApprove = async (driverId: string) => {
    const response = await api.post(`/api/drivers/${driverId}/approve`);
    if (response.success) {
      // Reload drivers
      const driversResponse = await api.get<DriverProfile[]>('/api/drivers');
      if (driversResponse.success && driversResponse.data) {
        setDrivers(driversResponse.data);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const pendingDrivers = drivers.filter((d) => d.status === 'PENDING');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-xl font-semibold">
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Drivers</h2>

          {pendingDrivers.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">
                Pending Approvals ({pendingDrivers.length})
              </h3>
              <div className="space-y-2">
                {pendingDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className="flex justify-between items-center bg-white p-3 rounded"
                  >
                    <div>
                      <span className="font-medium">
                        {driver.first_name} {driver.last_name}
                      </span>
                      <span className="text-gray-600 ml-2">{driver.phone}</span>
                    </div>
                    <button
                      onClick={() => handleApprove(driver.id)}
                      className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                    >
                      Approve
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {driver.first_name} {driver.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{driver.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          driver.status === 'APPROVED'
                            ? 'bg-green-100 text-green-800'
                            : driver.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

