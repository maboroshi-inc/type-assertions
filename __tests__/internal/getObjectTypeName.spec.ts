import { getObjectTypeName } from '../../src/internal/getObjectTypeName'

describe('getObjectTypeName()', () => {
  it('`Object.prototype.toString.call()` を呼び出す', () => {
    const spy = jest.spyOn(Object.prototype.toString as any, 'call')
    getObjectTypeName(123)
    expect(spy).toHaveBeenCalledWith(123)
    spy.mockRestore()
  })
})
