'use client';

export default function OrderStats() {
  const stats = [
    {
      title: 'Total Orders',
      value: '12,543',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'ri-shopping-cart-line',
      color: 'blue'
    },
    {
      title: 'Completed',
      value: '11,876',
      change: '+12.1%',
      changeType: 'increase',
      icon: 'ri-checkbox-circle-line',
      color: 'green'
    },
    {
      title: 'Pending',
      value: '234',
      change: '-3.2%',
      changeType: 'decrease',
      icon: 'ri-time-line',
      color: 'yellow'
    },
    {
      title: 'Refunded',
      value: '433',
      change: '+1.8%',
      changeType: 'increase',
      icon: 'ri-refund-line',
      color: 'red'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              stat.color === 'blue' ? 'bg-blue-100' :
              stat.color === 'green' ? 'bg-green-100' :
              stat.color === 'yellow' ? 'bg-yellow-100' :
              'bg-red-100'
            }`}>
              <i className={`${stat.icon} text-xl ${
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'green' ? 'text-green-600' :
                stat.color === 'yellow' ? 'text-yellow-600' :
                'text-red-600'
              }`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}