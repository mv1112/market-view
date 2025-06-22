import BrokerPageComponent from './broker-page'
import AlgoScriptPageComponent from './algo-script-page'
import ScreenerPageComponent from './screener-page'
import StrategyTesterPageComponent from './strategy-tester-page'
import HftPanelPageComponent from './hft-panel-page'

export const BrokerPage = BrokerPageComponent
export const AlgoScriptPage = AlgoScriptPageComponent
export const ScreenerPage = ScreenerPageComponent
export const StrategyTesterPage = StrategyTesterPageComponent
export const HftPanelPage = HftPanelPageComponent

export type FooterPageType = 'broker' | 'algo-script' | 'screener' | 'strategy-tester' | 'hft-panel' 