import { type FC } from 'react'

const HftPanelPage: FC = () => {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Top Divider */}
      <div className="h-px w-full bg-gray-300"></div>
      
      <div className="h-full p-4">
        <h2 className="text-xl font-semibold text-white mb-4">HFT Panel</h2>
        {/* Page content will be added here in the future */}
      </div>
    </div>
  )
}

export default HftPanelPage 