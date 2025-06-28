import { FC } from 'react';
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StrategyTesterPage: FC = () => {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Top Divider */}
      <div className="h-px w-full bg-gray-700"></div>
      
      <div className="h-full flex items-center justify-center p-4 bg-black">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
          <div className="bg-gray-800 p-6 rounded-full">
            <BarChart3 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Strategy Tester</h2>
          <p className="text-gray-400">
            To test a strategy, apply it to the chart. Make sure to select the right symbol and time interval you&apos;d like to test.
          </p>
          <Button className="bg-white hover:bg-gray-200 text-black border border-white shadow-sm">
            Load your strategy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StrategyTesterPage;
