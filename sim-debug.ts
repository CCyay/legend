// 临时调试脚本：在 Node 里跑引擎，复现「人类结束阶段后 AI 不动」
import { createGame, dispatch } from './game/engine.uts'
import { pickAiTurn } from './game/ai/opponent.uts'
import { HUMAN_PLAYER_ID, AI_PLAYER_ID } from './game/types.uts'

let game: any = createGame(12345, { playerCount: 2, humanFirst: true })

function send(intent: any): boolean {
  const r = dispatch(game, intent)
  game = r.state
  if (!r.ok) console.log(`  ✗ ${intent.type} 被拒绝: ${r.error}`)
  return r.ok
}

function snap(label: string) {
  const h = game.players.find((p: any) => p.id === HUMAN_PLAYER_ID)
  const a = game.players.find((p: any) => p.id === AI_PLAYER_ID)
  console.log(
    `${label}\n` +
    `   phase=${game.phase} active=${game.activePlayerId} ap=${game.actionPoints} turn=${game.turn}\n` +
    `   pendingChoice=${JSON.stringify(game.pendingChoice)}\n` +
    `   human hand=${h.hand.length} field=${h.field.length} gold=${h.gold}\n` +
    `   ai    hand=${a.hand.length} field=${a.field.length} gold=${a.gold}`
  )
}

// 复刻 match.uvue 的 runAiIfNeeded
function runAi() {
  let guard = 0
  while (guard < 50) {
    guard++
    if (game == null || game.phase === 'gameover') return
    const before = game
    const intents = pickAiTurn(game)
    console.log(`  [AI 轮 ${guard}] 意图: ${JSON.stringify(intents.map((i: any) => i.type))}`)
    if (intents.length === 0) return
    for (const it of intents) send(it)
    if (game === before) {
      console.log('  [AI] 状态未推进，退出')
      return
    }
  }
}

console.log('=== 起手阶段 ===')
snap('初始')
// 人类抽 3 张
for (let i = 0; i < 3; i++) {
  send({ type: 'pickOpeningHand', playerId: HUMAN_PLAYER_ID, pile: i % 2 === 0 ? 'royal' : 'monster' })
}
snap('人类起手完毕')
runAi()
snap('AI 起手完毕')

console.log('\n=== 人类主要阶段：直接结束 ===')
send({ type: 'endPhase', playerId: HUMAN_PLAYER_ID })
snap('人类 endPhase 之后')

console.log('\n=== 调用 runAiIfNeeded ===')
runAi()
snap('runAi 之后')
