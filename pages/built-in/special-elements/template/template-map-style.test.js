const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const OPTIONS_PAGE_PATH = '/pages/built-in/special-elements/template/template-map-style-options'
const COMPOSITION_PAGE_PATH = '/pages/built-in/special-elements/template/template-map-style-composition'

describe('/pages/built-in/special-elements/template-map-style', () => {
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    
    const initImage = await program.screenshot();
    expect(initImage).toSaveImageSnapshot();
    
    const btn = await page.$('#btn')
    await btn.tap()
    await page.waitFor(100)
    
    const changedImage = await program.screenshot();
    expect(changedImage).toSaveImageSnapshot();
  }
  if (!isDom2) {
    it('template map style options API', async () => {
      await test(OPTIONS_PAGE_PATH)
    })
  }
  
  it('template map style composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
});