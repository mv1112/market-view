import { FC } from 'react';
import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StrategyTesterPage: FC = () => {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Top Divider */}
      <div className="h-px w-full bg-gray-300"></div>
      
      <div className="h-full flex items-center justify-center p-4 bg-background">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
          <div className="bg-muted p-6 rounded-full">
            <BarChart3 className="w-12 h-12 text-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Strategy Tester</h2>
          <p className="text-muted-foreground">
            To test a strategy, apply it to the chart. Make sure to select the right symbol and time interval you&apos;d like to test.
          </p>
          <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 shadow-sm">
            Load your strategy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StrategyTesterPage;
