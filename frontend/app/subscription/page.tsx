'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { api } from '@/lib/api/client';
import { Subscription } from '@/types';
import Link from 'next/link';

export default function SubscriptionPage() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubscriptions() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      const response = await api.get<Subscription[]>('/api/parents/subscription');
      if (response.success && response.data) {
        setSubscriptions(response.data);
      }
      setLoading(false);
    }

    loadSubscriptions();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-semibold">
                Ride Network Connection
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription</h2>

          {subscriptions.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-600 mb-4">No active subscriptions</p>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                Subscribe Now
              </button>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="border-b pb-4 mb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {subscription.plan_type} Plan
                      </h3>
                      <p className="text-gray-600">
                        Status: <span className="font-medium">{subscription.status}</span>
                      </p>
                      <p className="text-gray-600">
                        Current Period: {new Date(subscription.current_period_start).toLocaleDateString()} - {new Date(subscription.current_period_end).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="text-primary-600 hover:text-primary-900">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

