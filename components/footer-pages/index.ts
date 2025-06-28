import BrokerPageComponent from './broker-page'
import AlgoScriptPageComponent from './algo-script-page'
import ScreenerPageComponent from './screener-page'
import StrategyTesterPageComponent from './strategy-tester-page'

export const BrokerPage = BrokerPageComponent
export const AlgoScriptPage = AlgoScriptPageComponent
export const ScreenerPage = ScreenerPageComponent
export const StrategyTesterPage = StrategyTesterPageComponent

export type FooterPageType = 'broker' | 'algo-script' | 'screener' | 'strategy-tester' | 'strategy-builder' 