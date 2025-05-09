import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium flex items-center
                  ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              {description && (
                <span className="text-xs text-gray-500 ml-2">{description}</span>
              )}
            </div>
          )}
          
          {!trend && description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        
        <div className="p-3 rounded-lg bg-blue-50 text-blue-700">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;