'use client';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'user_registered',
      message: 'New user registered',
      user: 'Sarah Johnson',
      time: '2 minutes ago',
      icon: 'ri-user-add-line',
      color: 'green'
    },
    {
      id: 2,
      type: 'product_uploaded',
      message: 'New product uploaded',
      user: 'Mike Chen',
      details: 'Premium Logo Templates',
      time: '15 minutes ago',
      icon: 'ri-upload-line',
      color: 'blue'
    },
    {
      id: 3,
      type: 'order_completed',
      message: 'Order completed',
      user: 'Emma Davis',
      details: '$89.99 - Photo Editor Software',
      time: '32 minutes ago',
      icon: 'ri-shopping-cart-line',
      color: 'purple'
    },
    {
      id: 4,
      type: 'withdrawal_request',
      message: 'Withdrawal requested',
      user: 'David Wilson',
      details: '$450.00',
      time: '1 hour ago',
      icon: 'ri-money-dollar-circle-line',
      color: 'amber'
    },
    {
      id: 5,
      type: 'product_reported',
      message: 'Product reported',
      user: 'Lisa Brown',
      details: 'Copyright issue',
      time: '2 hours ago',
      icon: 'ri-alert-line',
      color: 'red'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <p className="text-sm text-gray-600">Latest actions on your marketplace</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                activity.color === 'green' ? 'bg-green-100' :
                activity.color === 'blue' ? 'bg-blue-100' :
                activity.color === 'purple' ? 'bg-purple-100' :
                activity.color === 'amber' ? 'bg-amber-100' :
                'bg-red-100'
              }`}>
                <i className={`${activity.icon} text-sm ${
                  activity.color === 'green' ? 'text-green-600' :
                  activity.color === 'blue' ? 'text-blue-600' :
                  activity.color === 'purple' ? 'text-purple-600' :
                  activity.color === 'amber' ? 'text-amber-600' :
                  'text-red-600'
                }`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.message}</span>
                    {activity.user && <span className="text-gray-600"> by {activity.user}</span>}
                  </p>
                  <p className="text-xs text-gray-500 flex-shrink-0">{activity.time}</p>
                </div>
                {activity.details && (
                  <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full text-center text-sm text-amber-600 hover:text-amber-700 font-medium cursor-pointer">
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
}