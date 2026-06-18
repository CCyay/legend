const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const OPTIONS_PAGE_PATH = '/pages/component-instance/el/el-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/el/el-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('$el', () => {
  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    const el = await page.$('.tag-name')
    expect(await el.text()).toBe('VIEW')
  }
  if (!isDom2) {
    it('$el 选项式 API', async () => {
      await test(OPTIONS_PAGE_PATH)
    });
  }

  it('$el 组合式 API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
