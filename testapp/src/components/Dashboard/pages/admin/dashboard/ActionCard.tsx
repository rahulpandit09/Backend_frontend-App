import React from "react";

interface ActionCardProps {
  title: string;
  icon: React.ReactNode;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition cursor-pointer">
      <div className="mb-2 text-blue-600">{icon}</div>
      <p className="font-medium">{title}</p>
    </div>
  );
};

export default ActionCard;