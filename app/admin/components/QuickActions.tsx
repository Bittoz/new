'use client';

export default function QuickActions() {
  const actions = [
    {
      title: 'Review Pending Products',
      description: '12 products awaiting approval',
      icon: 'ri-eye-line',
      color: 'blue',
      href: '/admin/products?status=pending'
    },
    {
      title: 'Process Withdrawals',
      description: '8 withdrawal requests',
      icon: 'ri-money-dollar-circle-line',
      color: 'green',
      href: '/admin/withdrawals?status=pending'
    },
    {
      title: 'Handle Support Tickets',
      description: '5 open tickets',
      icon: 'ri-customer-service-line',
      color: 'purple',
      href: '/admin/support'
    },
    {
      title: 'Check Reports',
      description: '3 content reports',
      icon: 'ri-alert-line',
      color: 'red',
      href: '/admin/reports'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-sm text-gray-600">Tasks that need your attention</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {actions.map((action, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  action.color === 'blue' ? 'bg-blue-100' :
                  action.color === 'green' ? 'bg-green-100' :
                  action.color === 'purple' ? 'bg-purple-100' :
                  'bg-red-100'
                }`}>
                  <i className={`${action.icon} text-lg ${
                    action.color === 'blue' ? 'text-blue-600' :
                    action.color === 'green' ? 'text-green-600' :
                    action.color === 'purple' ? 'text-purple-600' :
                    'text-red-600'
                  }`}></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{action.title}</p>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </div>
              <i className="ri-arrow-right-line text-gray-400"></i>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
}