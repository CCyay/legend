const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/examples/set-custom-child-component-root-node-class/set-custom-child-component-root-node-class-options'
const PAGE_PATH_COMPOSITION = '/pages/examples/set-custom-child-component-root-node-class/set-custom-child-component-root-node-class-composition'

describe('自定义组件中使用 class 定制另一个自定义组件根节点样式', () => {
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    const image = await program.screenshot()
    expect(image).toSaveImageSnapshot()
  }

  if(!isDom2) {
    it('set-custom-child-component-root-node-class-options Screenshot', async () => {
      await test(PAGE_PATH)
    })
  }

  it('set-custom-child-component-root-node-class-options Screenshot', async () => {
    await test(PAGE_PATH_COMPOSITION)
  })
})
