import reducer, { getOrderbook } from '../features/orderbook'

test('should return the initial state', () => {
  expect(reducer(undefined, {} as any)).toEqual(
    {
      data: {},
      errors: [],
      loading: 'IDLE'
    }
  )
})